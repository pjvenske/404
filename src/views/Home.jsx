import React, { useEffect, useState } from "react";
import ArticleCard from "../components/articleCard";

export default function Home() {
  const [arts, setArts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to see latest articles.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/articles/category/art", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArts(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Home articles error:", err);
        setError("Could not load articles.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h1 className="hero-title">Welcome to Student Archives</h1>

      {loading && <p>Loading...</p>}

      {!loading && error && (
        <p style={{ color: "red", marginTop: 12 }}>{error}</p>
      )}

      {!loading && !error && (
        <div className="cards-grid" style={{ marginTop: 32 }}>
          {arts.length === 0 && <p>No Art articles yet.</p>}
          {arts.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
