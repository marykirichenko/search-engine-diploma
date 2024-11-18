import { ArticleCardProps } from "@/components/articleCard";

export async function fetchSearchResults(query: string,start:number = 1): Promise<ArticleCardProps[]> {
    const [pathSegment, querySegment] = query.split('?')
    let searchParams;
    if(!querySegment){
        searchParams = new URLSearchParams({query: query, start: start.toString()});
        if(query.split('')[0] !== '('){
            const res = await fetch(`http://127.0.0.1:5000/api/search/${query}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            return await res.json();
        }else{
            const res = await fetch(`http://127.0.0.1:5000/api/search?${searchParams}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            return await res.json();
        }

    }else{
        const res = await fetch(`http://127.0.0.1:5000/api/search/${pathSegment}?${querySegment}&start=${start.toString()}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.json();
    }

}