import {SearchProps} from "@/components/searchParameters";

export function buildQuery(searchParams: SearchProps): string {
    const { searchType, literatureType, queries, constraints, keyword, dois, dateRange, serialNumber, openAccess } = searchParams;
    let baseUrlExtension = ''
    const queryParams: string[] = [];
    if (keyword) {
        baseUrlExtension += `/${encodeURIComponent(keyword)}`;
    } else {
        switch (searchType) {
            case 'Article':
                if (queries && queries.length > 0 && constraints) {
                    let queryStr = queries[0];
                    for (let i = 1; i < queries.length; i++) {
                        queryStr += ` ${constraints[i - 1]} "${queries[i]}"`;
                    }
                    queryParams.push(`query=${encodeURIComponent(`(${queryStr})`)}`);
                }
                break;
            case 'DOI':
                baseUrlExtension += '/doi';
                if (dois && dois.length > 0) {
                    queryParams.push(`dois=${dois.join(',')}`);
                }
                break;
            case 'ISSN':
                baseUrlExtension += '/issn';
                if (serialNumber) {
                    queryParams.push(`issn=${serialNumber}`);
                }
                break;
            case 'ISBN':
                baseUrlExtension += '/isbn';
                if (serialNumber) {
                    queryParams.push(`isbn=${serialNumber}`);
                }
                break;
        }
    }

    if (dateRange) {
        const [dateFrom, dateTo] = dateRange;
        if (dateFrom) {
            queryParams.push(`datefrom:${dateFrom.toISOString().split('T')[0]}`);
        }
        if (dateTo) {
            queryParams.push(`dateto:${dateTo.toISOString().split('T')[0]}`);
        }
    }

    if (literatureType && literatureType.type !== 'Both') {
        queryParams.push(`literatureType=${literatureType.type}`);
    }


    return baseUrlExtension +`?${queryParams.join(' ')}` + (openAccess ? `&openAccess=true` : '')
}