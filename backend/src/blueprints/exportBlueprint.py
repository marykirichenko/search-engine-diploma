from flask import Blueprint, jsonify, request, Response
from utils import utils
from .searchBlueprints import search, search_by_keyword, search_by_doi, search_by_isbn, search_by_issn

export_blueprint = Blueprint('export', __name__)
# http://127.0.0.1:5000/api/export?amountOfArticles=100&isbn=978-0-387-79148-7&type=isbn
@export_blueprint.route('/export', methods=['GET'])
def export_articles():
    export_type = request.args.get('type')
    amount_of_articles = request.args.get('amountOfArticles', type=int)

    if amount_of_articles is None or amount_of_articles <= 0:
        return jsonify({"error": "A valid amountOfArticles should be provided"}), 400

    total_pages = (amount_of_articles + 9) // 10  # Ceiling division

    datefrom = request.args.get('datefrom')
    dateto = request.args.get('dateto')
    literatureType = request.args.get('literatureType')
    openAccess = request.args.get('openAccess', 'false') == 'true'

    all_results = []

    for page in range(1, total_pages + 1):
        temp_args = {
            'start': page,
            'datefrom': datefrom,
            'dateto': dateto,
            'literatureType': literatureType,
            'openAccess': str(openAccess).lower()
        }

        if export_type == 'query':
            query = request.args.get('query')
            if not query:
                return jsonify({"error": "Query should be provided for query search"}), 400
            temp_args['query'] = query
            results = search()

        elif export_type == 'keyword':
            keyword = request.args.get('keyword')
            if not keyword:
                return jsonify({"error": "Keyword should be provided for keyword search"}), 400
            temp_args['keyword'] = keyword
            results = search_by_keyword(keyword)

        elif export_type == 'doi':
            dois = request.args.get('dois')
            if not dois:
                return jsonify({"error": "DOIs should be provided for DOI search"}), 400
            temp_args['dois'] = dois
            results = search_by_doi()

        elif export_type == 'isbn':
            isbn = request.args.get('isbn')
            if not isbn:
                return jsonify({"error": "ISBN should be provided for ISBN search"}), 400
            temp_args['isbn'] = isbn
            results = search_by_isbn()

        elif export_type == 'issn':
            issn = request.args.get('issn')
            if not issn:
                return jsonify({"error": "ISSN should be provided for ISSN search"}), 400
            temp_args['issn'] = issn
            results = search_by_issn()

        else:
            return jsonify({"error": "Invalid export type"}), 400

        request.args = temp_args

        if isinstance(results, tuple):

            return results.get_json()
        all_results.extend(results.get_json())

    csv_data = utils.convert_results_to_csv(all_results)

    return Response(csv_data, mimetype="text/csv",
                    headers={"Content-Disposition": "attachment;filename=search_results.csv"})