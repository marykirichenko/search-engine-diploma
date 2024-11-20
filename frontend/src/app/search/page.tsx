import SearchResults from "@/components/searchResults";

export default async function SearchPage({ searchParams }: { searchParams: { query: string, openAccess?: string } }) {
    const openAccess = searchParams.openAccess === 'true';
    return <SearchResults query={searchParams.query} headerQuery={searchParams.query.replace(/\)[\s\S]*/, ')').toLowerCase()} openAccess={openAccess} />;
}