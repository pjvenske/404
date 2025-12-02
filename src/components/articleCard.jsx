import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ArticleCard({ article }) {
    if (!article) {
        return <div>Article does not exist</div>;
    }

    return (
        <div className="article-card">
            <div className="article-info">
                <h3>{article.name}</h3>
                <p>{article.type}</p>
                <p>{article.about}</p>
            </div>
            <div className="article-button">
                <Link to={`/article/${article.id}`}>
                    Read More
                </Link>
            </div>
        </div>
    );
}