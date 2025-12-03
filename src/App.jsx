import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Arts from './views/arts'
import Maths from './views/maths'
import Technology from './views/technology'
import AddForm from './views/addForm'
import ArticleDetails from './views/articleDetails'
import Login from './views/Login'
import Signup from "./views/Signup";
import Home from './views/Home'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="sidebar">
          <nav>
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/arts">Arts</Link>
            <Link className="nav-link" to="/maths">Maths</Link>
            <Link className="nav-link" to="/technology">Technology</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </nav>
        </div>

        <main className="main-content">
          <Routes>
            <Route path="/arts" element={<Arts />} />
            <Route path="/maths" element={<Maths />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/add-form" element={<AddForm />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
