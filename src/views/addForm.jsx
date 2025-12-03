import React from 'react';
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function AddForm() {
    const [responseMessage, setResponseMessage] = useState('');
    const [articleData, setArticleData] = useState({
        category: '',
        type: '',
        name: '',
        born: '',
        died: '',
        nationality: '',
        known_for: '',
        notable_work: '',
        about: '',
        year: '',
        medium: '',
        dimensions: '',
        location: '',
        designed_by: '',
        developer: ''
    })


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const processedData = {
                ...articleData,
                born: articleData.born === "" ? null : parseInt(articleData.born),
                died: articleData.died === "" ? null : parseInt(articleData.died),
                year: articleData.year === "" ? null : parseInt(articleData.year)
            };

            const response = await fetch('http://localhost:5000/api/articles/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            body: JSON.stringify(processedData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setResponseMessage(`Article successfully added!`);
        } catch (error) {
        setResponseMessage(`Error creating article: ${error.message}`);
        }
  };

    return (
        <div>
            <h1>Add Form Screen</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category:
                        <select
                            value={articleData.category}
                            onChange={(e) => setArticleData({ ...articleData, category: e.target.value })}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="art">Art</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="technology">Technology</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Type:
                        <select
                            value={articleData.type}
                            onChange={(e) => setArticleData({ ...articleData, type: e.target.value })}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Painting">Painting</option>
                            <option value="Biography">Biography</option>
                            <option value="Theorem">Theorem</option>
                            <option value="Algorithm">Algorithm</option>
                            <option value="Programming Language">Programming Language</option>
                        </select>
                    </label>
                    <br />
                    <label>Name:
                        <input type="text" 
                        placeholder="Name"
                        value={articleData.name} 
                        onChange={(e) => setArticleData({...articleData, name: e.target.value})}
                        required
                        />
                    </label>
                    <br />
                    <label>
                        Born:
                        <input 
                        type="number" 
                        placeholder="Born"
                        value={articleData.born}
                        onChange={(e) => setArticleData({...articleData, born: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Died:
                        <input type="number" 
                        placeholder="Died"
                        value={articleData.died}
                        onChange={(e) => setArticleData({...articleData, died: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Nationality:
                        <input type="text" 
                        placeholder="Nationality"
                        value={articleData.nationality}
                        onChange={(e) => setArticleData({...articleData, nationality: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Known For:
                        <input type="text" 
                        placeholder="Known For"
                        value={articleData.known_for}
                        onChange={(e) => setArticleData({...articleData, known_for: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Notable Works:
                        <input type="text" 
                        placeholder="Notable Works"
                        value={articleData.notable_work}
                        onChange={(e) => setArticleData({...articleData, notable_work: e.target.value})}
                        />
                    </label>
                    <br />
                    
                    <label>
                        About:
                        <input type="text" 
                        placeholder="About"
                        value={articleData.about}
                        onChange={(e) => setArticleData({...articleData, about: e.target.value})}
                        required
                        />
                    </label>
                    <br />
                    <label>
                        Year:
                        <input type="number" 
                        placeholder="Year"
                        value={articleData.year}
                        onChange={(e) => setArticleData({...articleData, year: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Medium:
                        <input type="text" 
                        placeholder="Medium"
                        value={articleData.medium}
                        onChange={(e) => setArticleData({...articleData, medium: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Dimensions:
                        <input type="text" 
                        placeholder="Dimensions"
                        value={articleData.dimensions}
                        onChange={(e) => setArticleData({...articleData, dimensions: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Location:
                        <input type="text" 
                        placeholder="Location"
                        value={articleData.location}
                        onChange={(e) => setArticleData({...articleData, location: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Designed By:
                        <input type="text" 
                        placeholder="Designed By"
                        value={articleData.designed_by}
                        onChange={(e) => setArticleData({...articleData, designed_by: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Developed By:
                        <input type="text" 
                        placeholder="Developed By"
                        value={articleData.developed_by}
                        onChange={(e) => setArticleData({...articleData, developed_by: e.target.value})}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </div>
    );
}