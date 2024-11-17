import {SearchProps} from "@/components/searchParameters";

export function buildQuery(searchParams: SearchProps): string {
    const { searchType, literatureType, queries, constraints, keyword, dois, dateRange, serialNumber, openAccess } = searchParams;
    let baseUrlExtention = ''
    const queryParams: string[] = [];
    if (keyword) {
        baseUrlExtention += `/${encodeURIComponent(keyword)}`;
        if (dateRange) {
            const [dateFrom, dateTo] = dateRange;
            if (dateFrom) {
                queryParams.push(`datefrom:${dateFrom.toISOString().split('T')[0]}`);
            }
            if (dateTo) {
                queryParams.push(`dateto:${dateTo.toISOString().split('T')[0]}`);
            }
        }
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
                if (dateRange) {
                    const [dateFrom, dateTo] = dateRange;
                    if (dateFrom) {
                        queryParams.push(`datefrom:${dateFrom.toISOString().split('T')[0]}`);
                    }
                    if (dateTo) {
                        queryParams.push(`dateto:${dateTo.toISOString().split('T')[0]}`);
                    }
                }
                break;
            case 'DOI':
                baseUrlExtention += '/doi';
                if (dois && dois.length > 0) {
                    queryParams.push(`dois=${dois.join(',')}`);
                }
                break;
            case 'ISSN':
                baseUrlExtention += '/issn';
                if (serialNumber) {
                    queryParams.push(`issn=${serialNumber}`);
                }
                break;
            case 'ISBN':
                baseUrlExtention += '/isbn';
                if (serialNumber) {
                    queryParams.push(`isbn=${serialNumber}`);
                }
                break;
        }
    }

    if (literatureType && searchType !== 'Keyword' && !literatureType.exclude && literatureType.type !== 'Both') {
        queryParams.push(`literatureType=${literatureType.type}`);
    }

    if (literatureType && literatureType.exclude) {
        queryParams.push(`exclude=${encodeURIComponent(`{"type":"${literatureType.type}"}`)}`);
    }

    if (openAccess) {
        queryParams.push('openAccess=true');
    }

    //TODO: Date should be joined with space, not &
    return baseUrlExtention +`?${queryParams.join('&')}`;
}