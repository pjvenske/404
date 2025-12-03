import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ArticleDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
     const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:5000/api/articles/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setData(data.article[0]))
            .catch((err) => { console.log(err) })
    }, [id]);

     if (!data) return <h2>Loading...</h2>;

    return (
        <div className='article-details'>
            <div>
                <h1>{data.name}</h1>
                <Link to={`/edit-form/${data.id}`}>Edit Article</Link>
            </div>
            <div>
                <div>
                    <p>Type: {data.type}</p>
                    { data.born && <p>Born: {data.born}</p> }
                    { data.died && <p>Died: {data.died}</p> }
                    { data.nationality && <p>Nationality: {data.nationality}</p> }
                    { data.known_for && <p>Known for: {data.known_for}</p> }
                    { data.notable_works && <p>Notable Works: {data.notable_works}</p> }
                    { data.year && <p>Year: {data.year}</p> }
                    { data.medium && <p>Medium: {data.medium}</p> }
                    { data.dimensions && <p>Dimensions: {data.dimensions}</p> }
                    { data.designed_by && <p>Designed by: {data.designed_by}</p> }
                    { data.developed_by && <p>Developed by: {data.developed_by}</p> }
                </div>
                <p>{data.about}</p>
            </div>
        </div>
    );
};