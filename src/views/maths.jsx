import React, { useEffect, useState }  from "react";
import ArticleCard from "../components/articleCard";
import { Link } from "react-router-dom";

export default function Maths() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch("http://localhost:5000/api/articles/category/mathematics", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => { return response.json(); })
            .then(data => setData(data.articles))
            .catch((err) => { console.log(err) })
    }, []);

    return (
        <div>
            <h1>Maths Screen</h1>
            <div className="add-article-link">
                <Link to="/add-form">Add New Article</Link>
            </div>
            <div className="cards-grid">
                <ul className="articles-list">
                    {data.map(article => (
                        <li key={article.id}>
                            <ArticleCard article={article} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}