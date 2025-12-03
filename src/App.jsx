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
import Technology from "./views/technology";
import AddForm from "./views/addForm";
import ArticleDetails from "./views/articleDetails";
import Login from "./views/Login";
import Signup from "./views/Signup";
import EditForm from "./views/editform"; 

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
          <NavLink className="nav-link" to="/technology">
            Technology
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
        <Outlet />
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
          <Route path="/technology" element={<Technology />} />
          <Route path="/add-form" element={<AddForm />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
