// src/views/editForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditForm() {
  const { id } = useParams();               // article id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    about: "",
    category: "art",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // load existing article
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to edit articles.");
      setLoading(false);
      return;
    }

    async function fetchArticle() {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Fetch article error:", data);
          setError(data.message || "Could not load article.");
          setLoading(false);
          return;
        }

        const article = data.article || data; // supports both shapes

        setForm({
          name: article.name || "",
          about: article.about || "",
          category: article.category || "art",
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch article error:", err);
        setError("Could not load article.");
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.about) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Update article error:", data);
        setError(data.message || "Failed to update article.");
        setSaving(false);
        return;
      }

      setSuccess("Article updated successfully!");
      setTimeout(() => navigate(-1), 1000); // go back to previous page
    } catch (err) {
      console.error("Update article error:", err);
      setError("Request failed: " + err.message);
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="form-page">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="form-page">
      <h1 className="hero-title">Edit Article</h1>
      <p style={{ marginTop: 8, color: "#475569" }}>
        Update the article details and save changes.
      </p>

      {error && <div className="auth-alert error" style={{ marginTop: 16 }}>{error}</div>}
      {success && <div className="auth-alert success" style={{ marginTop: 16 }}>{success}</div>}

      <form className="article-form" onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Title</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Article title"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="art">Art</option>
              <option value="maths">Maths</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-field" style={{ marginTop: 16 }}>
          <label htmlFor="about">Description</label>
          <textarea
            id="about"
            name="about"
            rows="5"
            placeholder="Write something about this article..."
            value={form.about}
            onChange={handleChange}
          />
        </div>

        <button className="auth-button" type="submit" disabled={saving} style={{ marginTop: 20 }}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
