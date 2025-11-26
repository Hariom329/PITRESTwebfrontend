import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaPinterest, FaSearch, FaBell, FaCommentDots, FaUserCircle } from 'react-icons/fa';

import { MOCK_PINS, MOCK_BOARDS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm px-3">
            <div className="container-fluid">
                <Link className="navbar-brand text-danger fw-bold d-flex align-items-center" to="/">
                    <FaPinterest size={32} />
                    <span className="ms-2 d-none d-md-block">Pinterest</span>
                </Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-dark' : 'text-muted'}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/business" className={`nav-link ${location.pathname === '/business' ? 'text-dark' : 'text-muted'}`}>Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'text-dark' : 'text-muted'}`}>Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className={`nav-link ${location.pathname === '/create' ? 'text-dark' : 'text-muted'}`}>Create</Link>
                        </li>
                    </ul>

                    <form className="d-flex flex-grow-1 mx-4 position-relative" onSubmit={handleSearch}>
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
                        <input
                            className="form-control rounded-pill ps-5 bg-light border-0 py-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />
                        {showSuggestions && searchQuery.trim() && (
                            <div className="position-absolute top-100 start-0 w-100 bg-white shadow-lg rounded-4 mt-2 overflow-hidden" style={{ zIndex: 1000 }}>
                                <div className="list-group list-group-flush text-start">
                                    {MOCK_PINS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(pin => (
                                        <button
                                            key={pin.id}
                                            className="list-group-item list-group-item-action border-0 px-4 py-2 fw-bold"
                                            onClick={() => {
                                                setSearchQuery(pin.title);
                                                navigate(`/search?q=${encodeURIComponent(pin.title)}`);
                                                setShowSuggestions(false);
                                            }}
                                        >
                                            <FaSearch className="me-3 text-secondary" size={12} />
                                            {pin.title}
                                        </button>
                                    ))}
                                    {MOCK_BOARDS.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2).map(board => (
                                        <button
                                            key={board.id}
                                            className="list-group-item list-group-item-action border-0 px-4 py-2 fw-bold"
                                            onClick={() => {
                                                setSearchQuery(board.name);
                                                navigate(`/search?q=${encodeURIComponent(board.name)}`);
                                                setShowSuggestions(false);
                                            }}
                                        >
                                            <FaSearch className="me-3 text-secondary" size={12} />
                                            {board.name} <span className="text-muted fw-normal small ms-2">Board</span>
                                        </button>
                                    ))}
                                    <button
                                        className="list-group-item list-group-item-action border-0 px-4 py-2"
                                        onClick={() => {
                                            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        <span className="text-muted">Search for "{searchQuery}"</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="d-flex align-items-center gap-3">
                        <Link to="/notifications" className="btn btn-light rounded-circle p-2">
                            <FaBell size={24} className="text-secondary" />
                        </Link>
                        <Link to="/notifications?tab=messages" className="btn btn-light rounded-circle p-2">
                            <FaCommentDots size={24} className="text-secondary" />
                        </Link>
                        <Link to="/profile/me" className="btn btn-light rounded-circle p-2">
                            <FaUserCircle size={24} className="text-secondary" />
                        </Link>
                        <button
                            className="btn btn-link text-muted p-0 ms-2"
                            style={{ textDecoration: 'none', fontSize: '0.8rem' }}
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
