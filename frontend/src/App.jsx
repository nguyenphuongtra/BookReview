import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from "lucide-react"; 
import './App.css';

import AuthorList from './pages/AuthorList.jsx';
import AuthorCreate from './pages/AuthorCreate.jsx';
import BookList from './pages/BookList.jsx';
import BookCreate from './pages/BookCreate.jsx';
import ReviewList from './pages/ReviewList.jsx';
import ReviewCreate from './pages/ReviewCreate.jsx';

const MainLayout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState("Authors");
  const menu = ["Authors", "Books", "Reviews"];
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(x => x);
  const breadcrumb = pathParts.length === 2
    ? `${pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1)} > ${pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)}` : "Home";
    
  return (
    <div className="app-container">
      <div className="header">Book Review</div>
      <div className="breadcrumb">{breadcrumb}</div>

      <div className="main-layout">
        <div className="sidebar">
          {menu.map((item) => (
            <div key={item} className="menu-item">
              <div className="menu-header" onClick={() => setOpenMenu(openMenu === item ? "" : item)}>
                <div className="menu-title-wrapper">
                  <div className="folder-icon"></div>
                  <span>{item}</span>
                </div>
                {openMenu === item ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {openMenu === item && (
                <div className="submenu">
                  <Link to={`/${item.toLowerCase()}/list`} className={location.pathname.includes('list') ? "active" : ""}>List</Link>
                  <Link to={`/${item.toLowerCase()}/create`} className={location.pathname.includes('create') ? "active" : ""}>Create</Link>
                </div>
              )}  
            </div>
          ))}
        </div>
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AuthorList />} />
          <Route path="/authors/list" element={<AuthorList />} />
          <Route path="/authors/create" element={<AuthorCreate />} />
          <Route path="/books/list" element={<BookList />} />
          <Route path="/books/create" element={<BookCreate />} />
          <Route path="/reviews/list" element={<ReviewList />} />
          <Route path="/reviews/create" element={<ReviewCreate />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}