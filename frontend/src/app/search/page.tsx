import SearchResults from "@/components/searchResults";
export default async function SearchPage({searchParams}: {searchParams: {query: string, openAccess?: string }}) {

    return <SearchResults query={searchParams.query} openAccess={searchParams.openAccess === 'true'}/>
}