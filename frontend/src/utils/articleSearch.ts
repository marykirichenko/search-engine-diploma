import { ArticleCardProps } from "@/components/articleCard";

export async function fetchSearchResults(query: string,start:number = 1, openAccess:boolean = false): Promise<ArticleCardProps[]> {
    let [pathSegment, querySegment] = query.split('?')
    let searchParams =  new URLSearchParams();

    if(!querySegment){
        searchParams.append('start', start.toString())

        const keyValuePairs = query.split(" ");
        const literatureTypePair = keyValuePairs.find(pair => pair.startsWith("literatureType"));

        searchParams.append('query', query.replace(/\+?literatureType[^&]*/g, ''))

        if (literatureTypePair) {
            const [key, value] = literatureTypePair.split("=");
            searchParams.append(key, value);
        }

        if(openAccess){
            searchParams.append('openAccess', 'true');
        }

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

        const keyValuePairs = querySegment.split(" ");
        const literatureTypePair = keyValuePairs.find(pair => pair.startsWith("literatureType"));

        if (literatureTypePair) {
            const [key, value] = literatureTypePair.split("=");
            searchParams.append(key, value);
        }

        querySegment = querySegment.replace(/\s*literatureType=[^ ]+/, '')
        searchParams.append('openAccess',openAccess.toString());
        const res = await fetch(`http://127.0.0.1:5000/api/search/${pathSegment}?${querySegment}&start=${start.toString()}`+(searchParams ? '&'+searchParams : ''), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.json();
    }

}