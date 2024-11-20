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

export default async function Home() {
    const articles = await getPageData();

    return (
        <>
            <HeaderCard/>
            <Typography variant={'h5'} style={{margin : '30px 10px 0px 20px', display: 'block', fontWeight: '700'}}> Latest literature:</Typography>

            {/* @ts-expect-error we statically load 10 articles from cache, no need for handling last loaded articles, we will not fetch more */}
            <ArticleCardGrid articles={articles}  />
        </>
    );
}