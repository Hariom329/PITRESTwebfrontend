import React from 'react';
import { MOCK_PINS } from '../data/mockData';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="container-fluid mt-5 pt-4">
            <div className="text-center py-4 mb-2">
                <h2 className="fw-bold mb-2">Get inspired</h2>
                <p className="text-muted">What do you want to try next?</p>
            </div>

            <div className="masonry-container pt-3">
                {MOCK_PINS.map(pin => (
                    <div className="masonry-item" key={pin.id}>
                        <div className="card border-0 rounded-4 overflow-hidden position-relative group pin-card shadow-sm hover-shadow transition-all">
                            <Link to={`/pin/${pin.id}`}>
                                <img src={pin.image} className="card-img-top" alt={pin.title} style={{ borderRadius: '16px' }} />
                            </Link>
                            {pin.isSponsored && (
                                <span className="position-absolute top-0 start-0 m-2 badge bg-light text-dark opacity-90 shadow-sm">Sponsored</span>
                            )}
                            <div className="card-body p-2">
                                <h6 className="card-title text-truncate fw-bold mb-1">{pin.title}</h6>
                                <div className="d-flex align-items-center mt-2">
                                    <img
                                        src={pin.user.avatar}
                                        alt={pin.user.name}
                                        className="rounded-circle me-2"
                                        width="24"
                                        height="24"
                                    />
                                    <small className="text-muted text-truncate">{pin.user.name}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
