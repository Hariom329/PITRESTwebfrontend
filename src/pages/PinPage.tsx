import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PINS } from '../data/mockData';
import { FaArrowLeft, FaEllipsisH, FaShare, FaEdit, FaTrash } from 'react-icons/fa';

const PinPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pin = MOCK_PINS.find(p => p.id === id);
    const [isDeleting, setIsDeleting] = useState(false);

    // Mock check for current user ownership
    // In a real app, we'd compare pin.user.id with auth.user.id
    const isOwner = pin?.user.name === 'You' || pin?.user.name === 'Test User';

    if (!pin) {
        return <div className="text-center mt-5 pt-5">Pin not found</div>;
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this pin?')) {
            setIsDeleting(true);
            // Mock deletion delay
            setTimeout(() => {
                alert('Pin deleted!');
                navigate('/');
            }, 1000);
        }
    };

    const handleEdit = () => {
        // In a real app, we'd navigate to an edit page with the pin ID
        // For now, we'll just show an alert or navigate to create page with state
        alert('Edit functionality would open the editor with this pin\'s data.');
        navigate('/create');
    };

    return (
        <div className="container mt-5 pt-5">
            <Link to="/" className="btn btn-light rounded-circle position-fixed top-0 start-0 mt-5 ms-3" style={{ zIndex: 1000 }}>
                <FaArrowLeft />
            </Link>

            <div className="card border-0 shadow-lg rounded-5 mx-auto overflow-hidden" style={{ maxWidth: '1000px' }}>
                <div className="row g-0">
                    <div className="col-md-6 bg-light d-flex align-items-center justify-content-center">
                        <img src={pin.image} className="img-fluid" alt={pin.title} style={{ objectFit: 'contain', maxHeight: '80vh', width: '100%' }} />
                    </div>
                    <div className="col-md-6 p-5 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex gap-2">
                                <button className="btn btn-light rounded-circle p-3 hover-bg-gray transition-all"><FaEllipsisH /></button>
                                <button className="btn btn-light rounded-circle p-3 hover-bg-gray transition-all"><FaShare /></button>
                                {isOwner && (
                                    <>
                                        <button className="btn btn-light rounded-circle p-3 hover-bg-gray transition-all" onClick={handleEdit} title="Edit Pin">
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-light rounded-circle p-3 hover-bg-gray text-danger transition-all" onClick={handleDelete} title="Delete Pin" disabled={isDeleting}>
                                            <FaTrash />
                                        </button>
                                    </>
                                )}
                            </div>
                            <button className="btn btn-danger rounded-pill px-4 py-2 fw-bold shadow-sm hover-scale transition-all">Save</button>
                        </div>

                        <h1 className="fw-bold mb-3">{pin.title}</h1>
                        {pin.isSponsored ? (
                            <div className="mb-3">
                                <span className="badge bg-secondary mb-2">Sponsored</span>
                                <p className="text-muted mb-1">Promoted by <span className="fw-bold text-dark">{pin.user.name}</span></p>
                                {pin.campaignInfo && (
                                    <div className="bg-light p-3 rounded-4 mb-3">
                                        <p className="fw-bold mb-1">{pin.campaignInfo.title}</p>
                                        <p className="small text-muted mb-0">{pin.campaignInfo.description}</p>
                                    </div>
                                )}
                                {pin.website && (
                                    <a href={pin.website} target="_blank" rel="noopener noreferrer" className="btn btn-dark rounded-pill fw-bold w-100">
                                        Visit Website
                                    </a>
                                )}
                            </div>
                        ) : (
                            <p className="text-muted">Uploaded by {pin.user.name}</p>
                        )}

                        <div className="d-flex align-items-center mb-4">
                            <img src={pin.user.avatar} alt={pin.user.name} className="rounded-circle me-3" width="48" height="48" />
                            <div>
                                <h6 className="mb-0 fw-bold">{pin.user.name}</h6>
                                <small className="text-muted">1.2k followers</small>
                            </div>
                            <button className="btn btn-light rounded-pill ms-auto fw-bold">Follow</button>
                        </div>

                        <div className="mt-auto">
                            <h5 className="fw-bold">Comments</h5>
                            <p className="text-muted">No comments yet! Add one to start the conversation.</p>

                            <div className="d-flex gap-2 mt-3">
                                <img src="https://i.pravatar.cc/150?u=me" className="rounded-circle" width="40" height="40" alt="Me" />
                                <input type="text" className="form-control rounded-pill bg-light border-0" placeholder="Add a comment" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="text-center mt-5 mb-4 fw-bold">More like this</h4>
            <div className="masonry-container">
                {MOCK_PINS.filter(p => p.id !== id).map(p => (
                    <div className="masonry-item" key={p.id}>
                        <Link to={`/pin/${p.id}`}>
                            <img src={p.image} className="img-fluid rounded-4" alt={p.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PinPage;
