import requests
import os
import csv
import io
from dotenv import load_dotenv

load_dotenv('../../.env')


def search_springer(openAccess, query, start=1, datefrom=None, dateto=None, literatureType=None):
    base_url = os.getenv('META_BASE_URL') if not openAccess else os.getenv('OPEN_ACCESS_BASE_URL')
    params = {
        "q": query,
        "s": start,
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto

    if literatureType:
        params["q"] += f"type:{literatureType}"

    url = requests.Request('GET', base_url, params=params).prepare().url

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def format_search_results(data):
    results = []
    for item in data.get('records', []):
        result = {
            "content_type": item.get('contentType'),
            "identifier": item.get('identifier'),
            "language": item.get('language'),
            "title": item.get('title'),
            "publication_name": item.get('publicationName'),
            "authors": item.get('creators'),
            "publication_date": item.get('publicationDate'),
            "publication_type": item.get('publicationType'),
            "issue_type": item.get('issueType'),
            "abstract": item.get('abstract'),
            "open_access": item.get('openAccess') or item.get('openaccess'),
            "publisher": item.get('publisherName'),
            "pdf_link": item.get('url')[0]['value'] if 'url' in item else None,
            "doi": item.get('doi'),
            "issn": item.get('issn'),
            "ending_page": item.get('endingPage'),
            "keyword": item.get("keyword"),
            "subjects": item.get("subjects"),
            "disciplines": item.get("disciplines")
        }
        results.append(result)
    return results


literatureTypeEnum = ("Book", "Journal")


def is_in_types(value):
    return value in literatureTypeEnum


def search_springer_by_keyword(openAccess, keyword, start=1, datefrom=None, dateto=None, literatureType=None,):
    base_url = os.getenv('META_BASE_URL') if not openAccess else os.getenv('OPEN_ACCESS_BASE_URL')
    params = {
        "q": "keyword:" + keyword.replace(" ", "%20"),
        "s": start,  # start index
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto

    if literatureType:
        params["q"] += f"type:{literatureType}"

    url = requests.Request('GET', base_url, params=params).prepare().url

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def search_springer_by_doi(openAccess, dois, start=1, datefrom=None, dateto=None, literatureType=None):
    base_url = os.getenv('META_BASE_URL') if not openAccess else os.getenv('OPEN_ACCESS_BASE_URL')
    params = {
        "q": " OR ".join(f"doi:{doi}" for doi in dois),
        "s": start,  # start index
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto


    if literatureType:
        params["q"] += f"type:{literatureType}"

    url = requests.Request('GET', base_url, params=params).prepare().url

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def search_springer_by_isbn_issn(openAccess, identifier_type, identifier, start, datefrom=None, dateto=None,
                                 literatureType=None):
    base_url = os.getenv('META_BASE_URL') if not openAccess else os.getenv('OPEN_ACCESS_BASE_URL')
    params = {
        "q": identifier_type + ':' + identifier,
        "s": start,  # start index
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto

    if literatureType:
        params["q"] += f"type:{literatureType}"

    url = requests.Request('GET', base_url, params=params).prepare().url

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def convert_results_to_csv(all_results):
    output = io.StringIO()
    writer = csv.writer(output)
    if all_results:
        header = all_results[0].keys()
        writer.writerow(header)
        for result in all_results:
            if 'authors' in result and isinstance(result['authors'], list):
                result['authors'] = ', '.join([author['creator'] for author in result['authors']])
            if 'disciplines' in result and isinstance(result['disciplines'], list):
                result['disciplines'] = ', '.join([discipline['term'] for discipline in result['disciplines']])
            writer.writerow(result.values())

    csv_data = output.getvalue()
    output.close()
    return csv_data