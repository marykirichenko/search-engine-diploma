
export async function handleExport(query: string, startIdx: number) {
    try {
        const urlPath = window.location.pathname.split('/');
        const type = urlPath[urlPath.length - 1];

        const searchParams = new URLSearchParams();
        searchParams.append('amountOfArticles', startIdx.toString()); // Use startIdx as amountOfArticles
        const urlParams = new URLSearchParams(window.location.search);

        const firstParam = urlParams.entries().next().value;

        const keyValuePairs = query.split(" ");
        const literatureTypePair = keyValuePairs.find(pair => pair.startsWith("literatureType"));


        if(firstParam && firstParam[0] === 'query'){
            searchParams.set('type', firstParam[0].replace(/\+?literatureType[^&]*/g, ''));
        }else if(!['issn', 'isbn', 'doi'].includes(type)){
            searchParams.set('type', 'keyword');
            searchParams.set('keyword', type);
            if(firstParam){
                searchParams.append(firstParam[0],firstParam[1])
            }
        } else{
            searchParams.append('type', type);
        }

        switch (type) {
            case 'issn':
                if(firstParam){
                    searchParams.set('issn', firstParam[1].replace(/\+?literatureType[^&]*/g, ''));
                }

                break;
            case 'isbn':
                searchParams.set('isbn', query.replace(/\+?literatureType[^&]*/g, ''));
                break;
            case 'doi':
                if(firstParam){
                    searchParams.set('dois', firstParam[1].replace(/\+?literatureType[^&]*/g, ''));
                }
                break;
            case 'search':
                if(firstParam && firstParam[0] === 'query'){
                    searchParams.set('query', firstParam[1].replace(/\+?literatureType[^&]*/g, ''));
                }
                break;

        }

        if (literatureTypePair) {
            const [key, value] = literatureTypePair.split("=");
            searchParams.append(key, value);
        }

        if(urlParams.get('openAccess')){
            searchParams.append('openAccess', 'true');
        }

        const response = await fetch(`http://127.0.0.1:5000/api/export?${searchParams.toString()}`, {
            method: 'GET'
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
