import React, { useEffect, useState }  from "react";
import ArticleCard from "../components/articleCard";

export default function Arts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/articles/category/art")
            .then((response) => { return response.json(); })
            .then(data => setData(data.articles))
            .catch((err) => { console.log(err) })
    }, []);

    return (
        <div>
            <h1>Arts Screen</h1>
            <div className="cards-grid">
                {data.map( article => (
                    <ArticleCard  article={article} />
                ))}
            </div>
        </div>
    );
}