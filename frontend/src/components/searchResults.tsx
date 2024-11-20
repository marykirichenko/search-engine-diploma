"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchSearchResults } from "@/utils/articleSearch";
import { CircularProgress, Typography } from "@mui/material";
import { ArticleCardGrid } from "@/components/articleCardGrid";
import { ArticleCardProps } from "@/components/articleCard";
import { styled } from "@mui/material/styles";
import { ScrollUpButton } from "@/components/scrollUpButton";
import NoElementsFoundCard from "@/components/noElementsFoundCard";
import ExportButton from "@/components/ExportButton";

export default function SearchResults({ query, headerQuery, openAccess }: { query: string, headerQuery?: string, openAccess?: boolean }) {
    const [articles, setArticles] = useState<ArticleCardProps[]>([])
    const [loading, setLoading] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)
    const [startIdx, setStartIdx] = useState(1)
    const [hasMoreArticles, setHasMoreArticles] = useState(true)

    const initialLoad = useCallback(() => {

        setLoading(true)
        setHasMoreArticles(true)

        fetchSearchResults(query, 1, openAccess)
            .then((data) => {
                setArticles(data)
                setStartIdx(16)
                setHasMoreArticles(data.length > 0)
            })
            .catch((error) => {
                console.error('Error during initial load:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [query, openAccess])

    const loadMore = useCallback(() => {

        if (loading || !hasMoreArticles) return
        setLoading(true)

        fetchSearchResults(query, startIdx, openAccess)
            .then((data) => {
                if (data.length === 0) {
                    setHasMoreArticles(false)
                } else {
                    setArticles((prevArticles) => [...prevArticles, ...data])
                    setStartIdx((prevStartIdx) => prevStartIdx + 15)
                }
            })
            .catch((error) => {
                console.error('Error during load more:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [query, startIdx, openAccess, loading, hasMoreArticles])

    useEffect(() => {
        initialLoad()
    }, [query])

    const lastArticleRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || !hasMoreArticles) return

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });

        if (node) observer.current.observe(node)
    }, [loadMore, loading, hasMoreArticles])


    return (
        <>
            <HeaderContainer>
                <Typography variant={'h5'} style={{ fontWeight: '700' }}>
                    Search results for {(headerQuery || query).replace(/^\(|\)$/g, "").replace(/"/g, "")}:
                </Typography>
                <ExportButton query={query} startIdx={startIdx} />
            </HeaderContainer>
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

const HeaderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '30px 10px 0px 20px',
});