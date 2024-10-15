import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {styled} from "@mui/material/styles";

export const ScrollUpButton = () => {
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    return <div><StyledButton onClick={scrollToTop}>
        <ArrowUpwardIcon/>
    </StyledButton></div>
}

const StyledButton = styled('button')({
    position: 'fixed',
    bottom:'20px',
    right: '20px',
    borderRadius: '50%',
    padding: '5px',
    border: 'none',
    background: 'rgba(52, 86, 123, 255)',
    borderColor: 'rgba(52, 86, 123, 255)'
})