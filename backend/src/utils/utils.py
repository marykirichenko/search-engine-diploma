import requests
import os
from dotenv import load_dotenv

load_dotenv('../../.env')

def search_springer(query, start=1, datefrom=None, dateto=None, literatureType=None, exclude=None):
    base_url = os.getenv('BASE_URL')
    params = {
        "q": query,
        "s": start,  # start index
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto

    if exclude:
        for key, value in exclude.items():
            params["q"] += f" -({key}:{value})"

    url = requests.Request('GET', base_url, params=params).prepare().url

    if literatureType:
        url += f"&type:{literatureType}"

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
            "title": item.get('title'),
            "authors": item.get('creators'),
            "publication_date": item.get('publicationDate'),
            "abstract": item.get('abstract'),
            "open_access": item.get('openAccess'),
            "pdf_link": item.get('url')[0]['value'] if 'url' in item else None
        }
        results.append(result)
    return results


literatureTypeEnum = ("Book", "Journal")


def is_in_types(value):
    return value in literatureTypeEnum


def search_springer_by_keyword(keyword, start=1, datefrom=None, dateto=None, literatureType=None, exclude=None):
    base_url = os.getenv('BASE_URL')
    params = {
        "q": "keyword:" + keyword.replace(" ", "%20"),
        "s": start,  # start index
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto


    if exclude:
        for key, value in exclude.items():
            params["q"] += f" -({key}:{value})"

    url = requests.Request('GET', base_url, params=params).prepare().url

    if literatureType:
        url += f"&type:{literatureType}"


    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def search_springer_by_doi(dois, start=1, datefrom=None, dateto=None, literatureType=None, exclude=None):
    base_url = os.getenv('BASE_URL')
    params = {
        "q": " OR ".join(f"doi:{doi}" for doi in dois),
        "s": start,  # start index
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto

    if exclude:
        for key, value in exclude.items():
            params["q"] += f" -({key}:{value})"

    url = requests.Request('GET', base_url, params=params).prepare().url

    if literatureType:
        url += f"&type:{literatureType}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def search_springer_by_isbn_issn(identifier_type, identifier, start=1, datefrom=None, dateto=None, literatureType=None, exclude=None):
    base_url = os.getenv('BASE_URL')
    params = {
        "q": identifier_type+':'+identifier,
        "s": start,  # start index
        "api_key": os.getenv('SPRINGER_API_KEY'),
    }

    if datefrom and dateto:
        params["datefrom"] = datefrom
        params["dateto"] = dateto

    if exclude:
        for key, value in exclude.items():
            params["q"] += f" -({key}:{value})"

    url = requests.Request('GET', base_url, params=params).prepare().url

    if literatureType:
        url += f"&type:{literatureType}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}