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
}

export const ArticleCard = ({title, authors, abstract, pdf_link} : ArticleCardProps) => {
    return (
        <Card sx={{margin: 2, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
            <CardContent>
                <h3>{title}</h3>
                <b>Authors: </b> {authors && authors.map((author,i) => <span key={i}>{author.creator}</span>)}
                <p><b>Abstract: </b>{abstract?.substring(0, 300)+'...'}</p>
                <Link href={pdf_link} underline="none" sx={{color:'rgba(52, 86, 123, 255)'}}>Read more..</Link>
            </CardContent>
        </Card>
    )
}