import { ArticleCardGrid } from "@/components/articleCardGrid";
import { ArticleCardProps } from "@/components/articleCard";
import {Typography} from "@mui/material";
import {HeaderCard} from "@/components/headerCard";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function getPageData(): Promise<ArticleCardProps[]> {
    const res = await fetch('http://127.0.0.1:5000/api/search?query=new');
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
}

// TODO: cleanup TS typeerrors
// TODO: create conf file for project organization

export default async function Home() {
    const articles = await getPageData();
    const handleLastArticleRef = (node: HTMLDivElement | null) => {
        // Handle the ref here
    };
    return (
        <>
            <HeaderCard/>
            <Typography variant={'h5'} style={{margin : '30px 10px 0px 20px', display: 'block', fontWeight: '700'}}> Latest literature:</Typography>
            <ArticleCardGrid articles={articles}  />
        </>
    );
}