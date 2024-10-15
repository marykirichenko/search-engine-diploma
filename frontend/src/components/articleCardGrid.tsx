import {ArticleCard, ArticleCardProps} from "@/components/articleCard";

interface ArticleCardGridProps {
    articles: ArticleCardProps[];
    lastArticleRef: (node: HTMLDivElement | null) => void;
}

export const ArticleCardGrid: React.FC<ArticleCardGridProps> = ({ articles, lastArticleRef}) => {
    return (
        <div>
            {articles.map((article, index) => {
                if (index === articles.length - 1) {
                    return <div ref={lastArticleRef} key={index}><ArticleCard {...article} /></div>;
                } else {
                    return <ArticleCard key={index} {...article} />;
                }
            })}
        </div>
    );
};
