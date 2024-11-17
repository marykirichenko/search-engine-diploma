import SearchResults from "@/components/searchResults";
export default async function SearchPage({searchParams}: {searchParams: {query: string}}) {
    let query = `${searchParams.query}`;
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
        queryParams.append(key, value);
    }

    query += queryParams.toString();
    return <SearchResults query={searchParams.query}/>
}