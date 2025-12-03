import React, { useEffect, useState }  from "react";
import ArticleCard from "../components/articleCard";
import { Link } from "react-router-dom";

export default function Arts() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const token = localStorage.getItem('token');

    const getArticles = () => {
        fetch("http://localhost:5000/api/articles/category/art", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => { return response.json(); })
            .then(data => setData(data.articles))
            .catch((err) => { console.log(err) })
    };

    const searchArticles = (e) => {
        const text = e.target.value;

        setSearch(text);

        const filteredArticles = data.filter(article =>
            article.name.toLowerCase().includes(text.toLowerCase()) ||
            article.type.toLowerCase().includes(text.toLowerCase())
        );
        setData(filteredArticles);
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <div>
            <h1>Arts Screen</h1>
            <div className="add-article-link">
                <Link to="/add-form">Add New Article</Link>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={searchArticles}
                />
                <button onClick={getArticles}>Clear Search</button>
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