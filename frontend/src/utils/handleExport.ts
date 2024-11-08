export async function handleExport(query: string, startIdx: number) {
    try {
        // Extract the type from the current URL, ignoring any query parameters
        const urlPath = window.location.pathname.split('/');
        const type = urlPath[urlPath.length - 1]; // Get the last part of the path without query parameters

        // Create a URLSearchParams instance
        const searchParams = new URLSearchParams();
        searchParams.append('amountOfArticles', startIdx.toString()); // Use startIdx as amountOfArticles
        searchParams.append('type', type); // Set the extracted type

        // Adjust the query parameter name based on the type
        switch (type) {
            case 'keyword':
                searchParams.set('keyword', query);
                break;
            case 'issn':
                searchParams.set('issn', query);
                break;
            case 'isbn':
                searchParams.set('isbn', query);
                break;
            case 'doi':
                searchParams.set('dois', query);
                break;
            case 'query':
                searchParams.set('query', query);
                break;
        }

        // Fetch and download the export file
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
