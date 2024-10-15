import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const PackedAccordion = ({ summary, details }: {summary: string, details:string}) => {
    return (
        <Accordion>
            <AccordionSummary  expandIcon={<ArrowDownwardIcon />}>
                <Typography sx={{fontWeight:'800'}}>
                    {summary}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {details}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}
