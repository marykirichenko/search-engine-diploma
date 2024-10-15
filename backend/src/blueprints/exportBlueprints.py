from flask import Blueprint, request, make_response
export_blueprint = Blueprint('export', __name__)

# TODO: check if export works

@export_blueprint.route('/api/export_csv', methods=['POST'])
def export_csv():
    data = request.json
    csv_content = "Title, Authors, Publication Date, Abstract, Open Access, PDF Link\n"

    for item in data:
        csv_content += f"{item['title']}, {item['authors']}, {item['publication_date']}, "
        csv_content += f"{item['abstract']}, {item['open_access']}, {item['pdf_link']}\n"

    response = make_response(csv_content)
    response.headers["Content-Disposition"] = "attachment; filename=search_results.csv"
    response.headers["Content-type"] = "text/csv"
    return response
