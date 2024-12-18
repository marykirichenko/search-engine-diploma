import SearchResults from "@/components/searchResults";

interface Params {
    slug: string;
}

type SearchParams =
    | { query: string, openAccess?: string, literatureType?: string }
    | { issn: string, openAccess?: string, literatureType?: string }
    | { dois: string, openAccess?: string, literatureType?: string }
    | { isbn: string, openAccess?: string, literatureType?: string };

export default async function SearchPage({ params, searchParams }: { params: Params, searchParams: SearchParams }) {
    let query = '';
    if ('query' in searchParams) {
        query = `${params.slug}?query=${searchParams.query}`;
    } else if ('issn' in searchParams) {
        query = `${params.slug}?issn=${searchParams.issn}`;
    } else if (params.slug==='doi' && 'dois' in searchParams) {
        query = `${params.slug}?dois=${searchParams.dois}`;
    } else if ('isbn' in searchParams) {
        query = `${params.slug}?isbn=${searchParams.isbn}`;
    } else if (!['issn', 'isbn', 'doi','query'].includes(params.slug)){
        query = `${params.slug}?${searchParams.literatureType? `&literatureType=${searchParams.literatureType}?`:'?'}`;
    }

    const queryParams = new URLSearchParams();
    let dateQuery = '';

    for (const [key, value] of Object.entries(searchParams).slice(1)) {
        if (key.includes('datefrom') || key.includes('dateto')) {
            dateQuery += `${key} `;
        }else if(key === 'openAccess'){
            break
        } else {
            queryParams.append(key, value);
        }
    }

    if (dateQuery) {
        dateQuery = dateQuery.trim();
        dateQuery = `${dateQuery}`;
    }

    query += ` ${queryParams.toString()}` + dateQuery;

    if(Object.keys(searchParams).length > 0 ) {
        const [key, value] = Object.entries(searchParams)[0];
        const headerQuery = !['issn', 'isbn', 'doi','query'].includes(params.slug)?`keyword ${params.slug}`:`${key}: ${value.split(' ')[0]}`;
        return <SearchResults query={query} headerQuery={headerQuery} openAccess={searchParams.openAccess === 'true'}/>;
    }else{
        return <SearchResults query={query} headerQuery={params.slug} openAccess={searchParams.openAccess === 'true'}/>;
    }

}