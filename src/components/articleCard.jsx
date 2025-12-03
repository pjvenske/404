import { useState } from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  if (!article) {
    return <div>No article data</div>;
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Delete article "${article.name}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/articles/${article.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete.");
        return;
      }

      // Call parent callback to refresh list
      if (onDelete) onDelete(article.id);

    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting article.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="article-card">
        <div className="article-info">
            <h3>{article.name}</h3>
            <p>{article.type}</p>
            <p>{article.about}</p>
        </div>

        <div className="article-actions">
            <div className="article-button">
                <Link to={`/article/${article.id}`}>
                Read More
                </Link>
            </div>
            <div>
                <button
                className="article-btn delete-btn"
                onClick={handleDelete}
                disabled={deleting}
                >
                {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    </div>
  );
}
