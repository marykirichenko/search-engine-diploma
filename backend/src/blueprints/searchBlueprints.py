from flask import Blueprint, jsonify, request
from src.utils import utils
import json
search_blueprint = Blueprint('search', __name__)

# boolean constraints queries will be build in frontend, general
# search method can take a single param query and a multiple params query
# http://127.0.0.1:5000/api/search?query=machine learning&start=2&type=Journal&exclude={"type":"Book"}

@search_blueprint.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    start = request.args.get('start', 1)
    datefrom = request.args.get('datefrom')
    dateto = request.args.get('dateto')
    type = request.args.get('literatureType')
    exclude = request.args.get('exclude')

    if exclude:
        try:
            exclude = json.loads(exclude)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid exclude parameter"}), 400

    if type and not utils.is_in_types(type):
        return jsonify({"error": "Invalid literature type"}), 400

    if not query :
        return jsonify({"error": "Query should be provided"}), 400

    raw_results = utils.search_springer(query, start,  datefrom, dateto, type, exclude)
    formatted_results = utils.format_search_results(raw_results)

    return jsonify(formatted_results)


# search by keyword
# http://127.0.0.1:5000/api/search/biology?type=Journal
@search_blueprint.route('/search/<keyword>', methods=['GET'])
def search_by_keyword(keyword):
    start = request.args.get('start', 1)
    datefrom = request.args.get('datefrom')
    dateto = request.args.get('dateto')
    literatureType = request.args.get('literatureType')
    start = start or 1
    exclude = request.args.get('exclude')

    if exclude:
        try:
            exclude = json.loads(exclude)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid exclude parameter"}), 400


    if literatureType and not utils.is_in_types(literatureType):
        return jsonify({"error": "Invalid literature type"}), 400
    raw_results = utils.search_springer_by_keyword(keyword, start,  datefrom, dateto, literatureType, exclude)
    formatted_results = utils.format_search_results(raw_results)

    return jsonify(formatted_results)

# search by digital object identifier/s, pass as a string separated with ,
# http://127.0.0.1:5000/api/search/doi?dois=10.1007/978-3-319-07410-8_4,10.1038/s41598-017-17625-2

@search_blueprint.route('/search/doi', methods=['GET'])
def search_by_doi():
    dois = request.args.get('dois')
    if dois:
        dois = dois.split(',')
    else:
        return jsonify({"error": "DOIs should be provided"}), 400

    start = request.args.get('start', 1)
    datefrom = request.args.get('datefrom')
    dateto = request.args.get('dateto')
    type = request.args.get('literatureType')
    exclude = request.args.get('exclude')

    if exclude:
        try:
            exclude = json.loads(exclude)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid exclude parameter"}), 400

    if type and not utils.is_in_types(type):
        return jsonify({"error": "Invalid literature type"}), 400

    raw_results = utils.search_springer_by_doi(dois, start,  datefrom, dateto, type, exclude)
    formatted_results = utils.format_search_results(raw_results)

    return jsonify(formatted_results)

# limit to a single International Standard Book Number
# http://127.0.0.1:5000/api/search/isbn?isbn=978-0-387-79148-7
@search_blueprint.route('/search/isbn', methods=['GET'])
def search_by_isbn():
    isbn = request.args.get('isbn')
    if not isbn:
        return jsonify({"error": "ISBN should be provided"}), 400

    start = request.args.get('start', 1)
    datefrom = request.args.get('datefrom')
    dateto = request.args.get('dateto')
    type = request.args.get('literatureType')
    exclude = request.args.get('exclude')

    if exclude:
        try:
            exclude = json.loads(exclude)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid exclude parameter"}), 400

    if type and not utils.is_in_types(type):
        return jsonify({"error": "Invalid literature type"}), 400

    raw_results = utils.search_springer_by_isbn_issn("isbn",isbn, start,  datefrom, dateto, type, exclude)
    formatted_results = utils.format_search_results(raw_results)

    return jsonify(formatted_results)


# limit to a single International Standard Serial Number
#http://127.0.0.1:5000/api/search/issn?issn=1861-0692
@search_blueprint.route('/search/issn', methods=['GET'])
def search_by_issn():
    issn = request.args.get('issn')
    if not issn:
        return jsonify({"error": "ISSN should be provided"}), 400

    start = request.args.get('start', 1)
    datefrom = request.args.get('datefrom')
    dateto = request.args.get('dateto')
    type = request.args.get('literatureType')
    exclude = request.args.get('exclude')

    if exclude:
        try:
            exclude = json.loads(exclude)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid exclude parameter"}), 400

    if type and not utils.is_in_types(type):
        return jsonify({"error": "Invalid literature type"}), 400

    raw_results = utils.search_springer_by_isbn_issn("issn", issn, start, datefrom, dateto, type, exclude)
    formatted_results = utils.format_search_results(raw_results)

    return jsonify(formatted_results)