import { SearchProps } from "@/components/searchParameters";
import { buildQuery } from "@/utils/buildSearchUrl";
import { styled } from "@mui/material/styles";
import { useOptionsError } from "@/contexts/optionsErrorContext";
import {useRouter} from "next/navigation";

export const ExtensiveSearchButton = ({ searchType, literatureType, queries, constraints, keyword, dois, dateRange, serialNumber }: SearchProps) => {
    const { validationErrors } = useOptionsError();
    const router = useRouter();


    const constructedQuery = buildQuery({ searchType, literatureType, queries, constraints, keyword, dois, dateRange, serialNumber });
    const isButtonDisabled = () => {

        switch (searchType) {
            case 'Article':
                return (!queries || queries.length === 0) || queries.filter(query => query === "").length || validationErrors.query;
            case 'DOI':
                return (!dois || dois.length === 0) || dois.filter(doi => doi === "").length || validationErrors.doi;
            case 'ISSN':
                return serialNumber==="" || validationErrors.issn;
            case 'ISBN':
                return serialNumber==="" || validationErrors.isbn;
            default:
                return false;
        }
    };


    const handleClick = () => {
        if (!isButtonDisabled()) {
            router.push(`/search${constructedQuery}`);
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <StyledButton onClick={handleClick} disabled={isButtonDisabled()} style={{ color: 'black' }}>
                Search by {searchType}
            </StyledButton>
        </div>
    );
};

const StyledButton = styled('button')({
    backgroundColor: '#1976d2',
    display: 'block',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    margin: 'auto',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:disabled': {
        backgroundColor: '#cccccc',
        cursor: 'not-allowed',
    },
    '&:hover:not(:disabled)': {
        backgroundColor: '#115293',
    },

});
