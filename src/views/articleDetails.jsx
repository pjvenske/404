import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function ArticleDetails() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/articles")
            .then((response) => { return response.json(); })
            .then(data => setData(data.articles))
            .catch((err) => { console.log(err) })
    }, []);

    return (
        <div>
            <h1>Article Details Screen</h1>
            <p>Details for article ID: {id}</p>
            <div>

            </div>
        </div>
    );
};