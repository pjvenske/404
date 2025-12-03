import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";

import Home from "./views/Home";
import Arts from "./views/arts";
import Maths from "./views/maths";
import AddForm from "./views/addForm";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ArticleDetails from "./views/articleDetails"; // if you have it
import Technology from "./views/technology";         // if you have it
// import EditForm from "./views/editForm";          // if you have it

function Layout() {
  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="logo">404</div>
        <nav className="nav-menu">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/arts">
            Arts
          </NavLink>
          <NavLink className="nav-link" to="/maths">
            Maths
          </NavLink>
          <NavLink className="nav-link" to="/add-form">
            Add Form
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
      <div className="top-header">
      <h1>404 Student Library</h1>
      <p>Explore curated articles and biographies</p>
</div>


        <div className="main-inner">
          <Outlet />
        </div>

        <footer className="site-footer">
          <span>© 2025 · 404 Student Library</span>
          <span>Built for IT6037 · Whitecliffe</span>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/arts" element={<Arts />} />
          <Route path="/maths" element={<Maths />} />
          <Route path="/add-form" element={<AddForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          {/* <Route path="/technology" element={<Technology />} /> */}
          {/* <Route path="/edit/:id" element={<EditForm />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
