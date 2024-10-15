"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchSearchResults } from "@/utils/articleSearch";
import { CircularProgress, Typography } from "@mui/material";
import { ArticleCardGrid } from "@/components/articleCardGrid";
import { ArticleCardProps } from "@/components/articleCard";
import { styled } from "@mui/material/styles";
import { ScrollUpButton } from "@/components/scrollUpButton";
import NoElementsFoundCard from "@/components/noElementsFoundCard";

export default function SearchResults({ query, headerQuery }: { query: string, headerQuery?: string }) {
    const [articles, setArticles] = useState<ArticleCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const [startIdx, setStartIdx] = useState(1);

    const loadMore = useCallback(() => {
        setLoading(true);
        fetchSearchResults(query, startIdx)
            .then((data) => {
                setArticles((prevArticles) => [...prevArticles, ...data]);
                setLoading(false);
            })
            .catch((e) => {
                console.error('Error while fetching search results:', e);
                setLoading(false);
            });
    }, [query, startIdx]);

    useEffect(() => {
        setArticles([]);
        setStartIdx(1);
        loadMore();
    }, [query]);

    useEffect(() => {
        if (startIdx > 1) {
            loadMore();
        }
    }, [startIdx]);

    const lastArticleRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setStartIdx((prevStartInx) => prevStartInx + 15);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    return (
        <>
            <Typography variant={'h5'} style={{ margin: '30px 10px 0px 20px', display: 'block', fontWeight: '700' }}>
                Search results for {(headerQuery || query).replace(/^\(|\)$/g, "").replace(/"/g, "")}:
            </Typography>
            <ArticleCardGrid articles={articles} lastArticleRef={lastArticleRef} />
            {loading && (
                <LoadingWrapper>
                    <CircularProgress color="inherit" size={64} />
                </LoadingWrapper>
            )}
            {articles.length === 0 && !loading && (<NoElementsFoundCard />)}
            {window.scrollY > 0 && <ScrollUpButton />}
        </>
    );
}

const LoadingWrapper = styled('div')({
    width: '100%',
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center'
});

