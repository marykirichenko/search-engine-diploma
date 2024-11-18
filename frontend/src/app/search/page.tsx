import SearchResults from "@/components/searchResults";
export default async function SearchPage({searchParams}: {searchParams: {query: string}}) {

    return <SearchResults query={searchParams.query}/>
}