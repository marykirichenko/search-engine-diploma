import SearchResults from "@/components/searchResults";
export default async function SearchPage({searchParams}: {searchParams: {query: string}}) {
    // TODO Add exports
    // TODO show is its open access or pdf (to verification)
    return <SearchResults query={searchParams.query}/>
}