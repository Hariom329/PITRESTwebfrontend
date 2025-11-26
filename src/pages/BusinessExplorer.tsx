import React, { useState } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaFilter } from 'react-icons/fa';

const BusinessExplorer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'fashion' | 'design' | 'food' | 'tech'>('all');

    // Filter users to only show businesses
    const businessUsers = MOCK_USERS.filter(user => user.isBusiness);

    // Apply search and category filters
    const filteredBusinesses = businessUsers.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.username.toLowerCase().includes(searchQuery.toLowerCase());

        // Mock category logic based on bio or name keywords since we don't have explicit categories in mock data
        let matchesCategory = true;
        if (selectedCategory !== 'all') {
            const text = (business.bio + business.name).toLowerCase();
            if (selectedCategory === 'fashion') matchesCategory = text.includes('fashion') || text.includes('style');
            if (selectedCategory === 'design') matchesCategory = text.includes('design') || text.includes('interior') || text.includes('art');
            if (selectedCategory === 'food') matchesCategory = text.includes('food') || text.includes('eat');
            if (selectedCategory === 'tech') matchesCategory = text.includes('tech');
        }

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mt-5 pt-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3">Explore Businesses</h1>
                <p className="text-muted lead">Discover brands, creators, and professionals.</p>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
                        <input
                            type="text"
                            className="form-control rounded-pill ps-5 py-2 bg-light border-0"
                            placeholder="Search businesses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="dropdown">
                        <button className="btn btn-light rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaFilter /> Filter
                        </button>
                        <ul className="dropdown-menu shadow-lg border-0 rounded-4 p-2">
                            <li><button className={`dropdown-item rounded-3 fw-bold ${selectedCategory === 'all' ? 'bg-light' : ''}`} onClick={() => setSelectedCategory('all')}>All Categories</button></li>
                            <li><button className={`dropdown-item rounded-3 fw-bold ${selectedCategory === 'fashion' ? 'bg-light' : ''}`} onClick={() => setSelectedCategory('fashion')}>Fashion</button></li>
                            <li><button className={`dropdown-item rounded-3 fw-bold ${selectedCategory === 'design' ? 'bg-light' : ''}`} onClick={() => setSelectedCategory('design')}>Design & Art</button></li>
                            <li><button className={`dropdown-item rounded-3 fw-bold ${selectedCategory === 'food' ? 'bg-light' : ''}`} onClick={() => setSelectedCategory('food')}>Food & Drink</button></li>
                            <li><button className={`dropdown-item rounded-3 fw-bold ${selectedCategory === 'tech' ? 'bg-light' : ''}`} onClick={() => setSelectedCategory('tech')}>Technology</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {filteredBusinesses.map(business => (
                    <div className="col-md-6 col-lg-4" key={business.id}>
                        <Link to={`/profile/${business.id}`} className="text-decoration-none text-dark">
                            <div className="card border-0 shadow-sm rounded-4 h-100 hover-shadow transition-all">
                                <div className="card-body p-4 text-center">
                                    <div className="position-relative d-inline-block mb-3">
                                        <img src={business.avatar} className="rounded-circle" width="80" height="80" alt={business.name} />
                                        <span className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                                            <FaBriefcase />
                                        </span>
                                    </div>
                                    <h5 className="fw-bold mb-1">{business.name}</h5>
                                    <p className="text-muted small mb-3">@{business.username}</p>
                                    <p className="text-muted small mb-4 line-clamp-2">{business.bio}</p>

                                    {business.showcases && business.showcases.length > 0 && (
                                        <div className="bg-light rounded-3 p-2 mb-3">
                                            <small className="fw-bold text-uppercase text-secondary d-block mb-2" style={{ fontSize: '10px' }}>Featured Showcase</small>
                                            <div className="d-flex align-items-center gap-2">
                                                <img src={business.showcases[0].coverImage} className="rounded-3" width="40" height="40" style={{ objectFit: 'cover' }} alt="" />
                                                <div className="text-start overflow-hidden">
                                                    <p className="fw-bold mb-0 small text-truncate">{business.showcases[0].title}</p>
                                                    <p className="text-muted mb-0 small text-truncate" style={{ fontSize: '10px' }}>{business.showcases[0].description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button className="btn btn-dark rounded-pill fw-bold w-100">Visit Profile</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

                {filteredBusinesses.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <h4 className="text-muted">No businesses found matching your criteria.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessExplorer;
