# tests/test_search.py
import pytest

def test_search_by_identifier(client):
    response = client.get('/api/search?query=sample')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(
        'abstract' in result and
        'authors' in result and
        'open_access' in result and
        'pdf_link' in result
        for result in data
    )

def test_search_by_doi(client):
    response = client.get('/api/search/doi?dois=10.1007/978-3-319-07410-8_4,10.1038/s41598-017-17625-2')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(
        'abstract' in result and
        'authors' in result and
        'open_access' in result and
        'pdf_link' in result
        for result in data
    )

def test_search_by_isbn(client):
    response = client.get('/api/search/isbn?isbn=978-0-387-79148-7')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(
        'abstract' in result and
        'authors' in result and
        'open_access' in result and
        'pdf_link' in result
        for result in data
    )

def test_search_by_issn(client):
    response = client.get('/api/search/issn?issn=1861-0692')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(
        'abstract' in result and
        'authors' in result and
        'open_access' in result and
        'pdf_link' in result
        for result in data
    )