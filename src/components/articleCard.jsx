import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ArticleCard({ article }) {
    if (!article) {
        return <div>No article data</div>;
    }

    return (
        <div>
            <div>
                <h3>{article.name}</h3>
                <p>{article.about}</p>
            </div>
            <div>
                <Link to={`/article/${article.id}`}>
                    Read More
                </Link>
            </div>
        </div>
    );
}