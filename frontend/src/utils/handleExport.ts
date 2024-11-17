import {findSourceMap} from "module";

export async function handleExport(query: string, startIdx: number) {
    try {
        const urlPath = window.location.pathname.split('/');
        const type = urlPath[urlPath.length - 1];

        const searchParams = new URLSearchParams();
        searchParams.append('amountOfArticles', startIdx.toString()); // Use startIdx as amountOfArticles
        const urlParams = new URLSearchParams(window.location.search);
        const firstParam = urlParams.entries().next().value;

        if(firstParam && firstParam[0] === 'query'){
            searchParams.set('type', firstParam[0]);
        }else if(!['issn', 'isbn', 'doi'].includes(type)){
            searchParams.set('type', 'keyword');
            searchParams.set('keyword', type);
        } else{
            searchParams.append('type', type);
        }

        // Adjust the query parameter name based on the type
        switch (type) {
            case 'issn':
                if(firstParam){
                    searchParams.set('issn', firstParam[1]);
                }
                break;
            case 'isbn':
                searchParams.set('isbn', query);
                break;
            case 'doi':
                if(firstParam){
                    searchParams.set('dois', firstParam[1]);
                }
                break;
            case 'search':
                if(firstParam && firstParam[0] === 'query'){
                    searchParams.set('query', firstParam[1]);
                }
                break;
        }

        const response = await fetch(`http://127.0.0.1:5000/api/export?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to export data');

        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = 'exported_data.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}
