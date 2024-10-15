import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = styled('div')({
    position: 'relative',
    borderRadius: 2,
    marginLeft: 0,
    width: '100%',
    background: 'rgba(52, 86, 123, 255)',
    display: 'flex',
    alignItems: 'center',
});

const SearchIconWrapper = styled('div')({
    padding: 5,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledInputBase = styled(InputBase)({
    color: 'white',
    width: 'calc(100% - 40px)',
    padding: '0 0 0 30px',
});

export const NavbarSearch = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchTrigger = () => {
        router.push(`/search?query=${searchQuery}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            handleSearchTrigger()
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Search>
            <StyledInputBase
                onKeyDown={handleKeyDown}
                placeholder="Search for an article…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleInputChange}
            />
            <SearchIconWrapper>
                <button onClick={handleSearchTrigger} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <SearchIcon />
                </button>
            </SearchIconWrapper>
        </Search>
    );
};
