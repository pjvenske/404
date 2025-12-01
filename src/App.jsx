import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Arts from './views/arts'
import Maths from './views/maths'
import AddForm from './views/addForm'
import ArticleDetails from './views/articleDetails'

function App() {

  return (
    <div className="app-container">
      <div className="navbar-container">
        <BrowserRouter>
              <nav>
                  <Link className="nav-link" to="/arts">Arts</Link>
                  <Link className="nav-link" to="/maths">Maths</Link>
                  <Link className="nav-link" to="/add-form">Add Form</Link>
              </nav>
              <Routes>
                  <Route path="/arts" element={<Arts />} />
                  <Route path="/maths" element={<Maths />} />
                  <Route path="/add-form" element={<AddForm />} />
                  <Route path="/article/:id" element={<ArticleDetails />} />
              </Routes>
          </BrowserRouter>
      </div>

    </div>
  )
}

export default App
