import SearchResults from "@/components/searchResults";

interface Params {
    slug: string;
}

type SearchParams =
    | { query: string }
    | { issn: string }
    | { doi: string }
    | { isbn: string };

export default async function SearchPage({ params, searchParams }: { params: Params, searchParams: SearchParams }) {
    let query = '';
    if ('query' in searchParams) {
        query = `${params.slug}?query=${searchParams.query}`;
    } else if ('issn' in searchParams) {
        query = `${params.slug}?issn=${searchParams.issn}`;
    } else if (params.slug==='doi') {
        query = `${params.slug}?dois=${searchParams.dois}`;
    } else if ('isbn' in searchParams) {
        query = `${params.slug}?isbn=${searchParams.isbn}`;
    } else if (!['issn', 'isbn', 'doi','query'].includes(params.slug)){
        query = `${params.slug}?`;
    }

    const queryParams = new URLSearchParams();
    let dateQuery = '';

    for (const [key, value] of Object.entries(searchParams).slice(1)) {
        if (key.includes('datefrom') || key.includes('dateto')) {
            dateQuery += `${key} `;
        } else {
            queryParams.append(key, value);
        }
    }

    dateQuery = dateQuery.trim();
    if (dateQuery) {
        dateQuery = `${dateQuery}`;
    }

    query += ` ${queryParams.toString()}` + dateQuery;


    const [key, value] = Object.entries(searchParams)[0];
    const headerQuery = !['issn', 'isbn', 'doi','query'].includes(params.slug)?`keyword ${params.slug}`:`${key}: ${value}`;
    return <SearchResults query={query} headerQuery={headerQuery}/>;
}