import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import {Box, Typography} from "@mui/material";


export type ArticleCardProps = {
    title: string,
    authors?: {
        creator: string
    }[],
    abstract?: string,
    pdf_link: string,
    open_access: boolean,
    publisher?: string,
    publication_date?: string,
    subjects?: string[],
    disciplines?: { id: string, term: string }[],
    content_type?: string,
    language?: string,
}

// TODO:  extend query build
export const ArticleCard = ({title, authors, abstract, pdf_link, open_access, publisher, publication_date, subjects, disciplines ,content_type, language} : ArticleCardProps) => {
    const abstractSnippet = typeof abstract === 'string'
        ? (abstract ? abstract.substring(0, 300) : 'No abstract')
        : (abstract ? Object.values(abstract)[0] : 'No abstract')

    return (
        <Card sx={{margin: 2, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
            <CardContent>
                <h3>{title} {
                    // @ts-expect-error open access is a string
                    (open_access === "true") && <span style={{backgroundColor:'green', color:'white', borderRadius: '50%', padding:'3px 8px', fontSize: '10px'}}>Open Access</span>
                }</h3>
                <b>Authors: </b> {authors && authors.map((author,i) => <span key={i}>{author.creator}</span>)}
                {/* @ts-expect-error just works*/}
                <p><b>Abstract: </b>{abstractSnippet}</p>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    {language && <><b>Language:</b> {language}</>}
                    {publication_date && <><b>Publish Date:</b> {publication_date}</>}
                    {publisher && <><b>Publisher:</b> {publisher}</>}
                    {content_type && <><b>Content type:</b> {content_type}</>}
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body2"><b>Subjects:</b> {subjects?.join(', ')}</Typography> </Box>
                <Box mt={2}>
                    {disciplines && <Typography variant="body2"><b>Disciplines:</b></Typography>}

                    {disciplines && disciplines.map((discipline) => (
                        <Typography key={discipline.id} variant="body2">
                            {discipline.term}
                        </Typography>
                    ))}
                </Box>
                <Link href={pdf_link} underline="none" sx={{color:'rgba(52, 86, 123, 255)'}}>Read more..</Link>
            </CardContent>
        </Card>
    )
}