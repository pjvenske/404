// src/views/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">Welcome to 404 Student Library</h1>
        <p className="hero-text">
          Please <Link className="auth-link" to="/login">log in</Link> or{" "}
          <Link className="auth-link" to="/signup">create an account</Link> to view content.
        </p>
      </section>

      {/* Sections grid */}
      <section className="section-grid">
        {/* Arts */}
        <div className="section-card">
          <h2 className="section-title">Arts</h2>
          <p className="section-description">
            Browse famous artists, artworks and student-created content.
          </p>
          <Link className="section-link" to="/arts">
            Go to Arts
          </Link>
        </div>

        {/* Maths */}
        <div className="section-card">
          <h2 className="section-title">Maths</h2>
          <p className="section-description">
            Explore mathematicians, key concepts and exam resources.
          </p>
          <Link className="section-link" to="/maths">
            Go to Maths
          </Link>
        </div>

        {/* Add Form */}
        <div className="section-card">
          <h2 className="section-title">Add Form</h2>
          <p className="section-description">
            Add a new article or resource to the shared library.
          </p>
          <Link className="section-link" to="/add-form">
            Add Article
          </Link>
        </div>
      </section>
    </div>
  );
}
