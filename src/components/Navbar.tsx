import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPinterest, FaSearch, FaBell, FaCommentDots, FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
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
                        <li className="nav-item"><Link className="nav-link text-dark" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link text-dark" to="/create">Create</Link></li>
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
                        />
                    </form>

                    <div className="d-flex align-items-center gap-3">
                        <Link to="/notifications" className="btn btn-light rounded-circle p-2">
                            <FaBell size={24} className="text-secondary" />
                        </Link>
                        <button className="btn btn-light rounded-circle p-2">
                            <FaCommentDots size={24} className="text-secondary" />
                        </button>
                        <Link to="/profile/me" className="btn btn-light rounded-circle p-2">
                            <FaUserCircle size={24} className="text-secondary" />
                        </Link>
                        <button
                            className="btn btn-link text-muted p-0 ms-2"
                            style={{ textDecoration: 'none', fontSize: '0.8rem' }}
                            onClick={() => {
                                localStorage.removeItem('pinterest_user');
                                window.location.href = '/login';
                            }}
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
