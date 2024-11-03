import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';


export type ArticleCardProps = {
    title: string,
    authors?: {
        creator: string
    }[],
    abstract?: string,
    pdf_link: string
    open_access: boolean
}

export const ArticleCard = ({title, authors, abstract, pdf_link, open_access} : ArticleCardProps) => {
    return (
        <Card sx={{margin: 2, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
            <CardContent>
                <h3>{title} {
                    open_access && <span style={{backgroundColor:'green', color:'white', borderRadius: '50%', padding:'3px 8px', fontSize: '10px'}}>Open Access</span>
                }</h3>
                <b>Authors: </b> {authors && authors.map((author,i) => <span key={i}>{author.creator}</span>)}
                <p><b>Abstract: </b>{abstract?.substring(0, 300)+'...'}</p>
                <Link href={pdf_link} underline="none" sx={{color:'rgba(52, 86, 123, 255)'}}>Read more..</Link>
            </CardContent>
        </Card>
    )
}