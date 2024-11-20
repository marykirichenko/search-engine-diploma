import SearchResults from "@/components/searchResults";

export default async function SearchPage({ searchParams }: { searchParams: { query: string, openAccess?: string } }) {
    const openAccess = searchParams.openAccess === 'true';
    const firstParenthesisIndex = searchParams.query.indexOf('(');
    const lastParenthesisIndex = searchParams.query.lastIndexOf(')');
    let headerQuery = searchParams.query.replace(/%20/g, ' ');
    if (firstParenthesisIndex !== -1 && lastParenthesisIndex !== -1 && lastParenthesisIndex > firstParenthesisIndex) {
        headerQuery = headerQuery.slice(firstParenthesisIndex+1, lastParenthesisIndex);
    }
    return <SearchResults query={searchParams.query} headerQuery={`the query - ${headerQuery.toLowerCase()}`} openAccess={openAccess} />;
}