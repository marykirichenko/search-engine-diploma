import SearchResults from "@/components/searchResults";
export default async function SearchPage({searchParams}: {searchParams: {query: string}}) {
    // TODO Add exports
    return <SearchResults query={searchParams.query}/>
}