import React from 'react';
import { MOCK_CAMPAIGNS } from '../data/mockData';
import { FaExternalLinkAlt, FaTag } from 'react-icons/fa';

const SponsoredExplorer: React.FC = () => {
    return (
        <div className="container mt-5 pt-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3">Shop & Discover</h1>
                <p className="text-muted lead">Curated collections and exclusive offers from top brands.</p>
            </div>

            <div className="row g-4">
                {MOCK_CAMPAIGNS.map(campaign => (
                    <div className="col-md-6" key={campaign.id}>
                        <div className="card border-0 shadow-lg rounded-5 overflow-hidden h-100 hover-shadow transition-all">
                            <div className="position-relative">
                                <img
                                    src={campaign.coverImage}
                                    className="card-img-top"
                                    alt={campaign.title}
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                                <div className="position-absolute top-0 start-0 m-3">
                                    <span className="badge bg-white text-dark shadow-sm py-2 px-3 rounded-pill fw-bold">
                                        <FaTag className="me-2 text-danger" /> Sponsored
                                    </span>
                                </div>
                            </div>
                            <div className="card-body p-4 text-center">
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                    <img src={campaign.brandAvatar} className="rounded-circle me-2" width="32" height="32" alt={campaign.brandName} />
                                    <span className="fw-bold text-muted small">{campaign.brandName}</span>
                                </div>
                                <h3 className="fw-bold mb-2">{campaign.title}</h3>
                                <p className="text-muted mb-4">{campaign.description}</p>
                                <a
                                    href={campaign.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-dark rounded-pill fw-bold px-5 py-2"
                                >
                                    Shop Now <FaExternalLinkAlt className="ms-2 small" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 p-5 bg-light rounded-5 text-center">
                <h2 className="fw-bold mb-3">Advertise with us</h2>
                <p className="text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Reach millions of people looking for ideas and inspiration. Create your first campaign today.
                </p>
                <button className="btn btn-danger rounded-pill fw-bold px-4">Create Ad</button>
            </div>
        </div>
    );
};

export default SponsoredExplorer;
