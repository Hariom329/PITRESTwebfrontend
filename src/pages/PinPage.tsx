import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PINS } from '../data/mockData';
import { FaArrowLeft, FaEllipsisH, FaShare } from 'react-icons/fa';

const PinPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const pin = MOCK_PINS.find(p => p.id === id);

    if (!pin) {
        return <div className="text-center mt-5 pt-5">Pin not found</div>;
    }

    return (
        <div className="container mt-5 pt-5">
            <Link to="/" className="btn btn-light rounded-circle position-fixed top-0 start-0 mt-5 ms-3" style={{ zIndex: 1000 }}>
                <FaArrowLeft />
            </Link>

            <div className="card border-0 shadow-lg rounded-5 mx-auto" style={{ maxWidth: '1000px', overflow: 'hidden' }}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={pin.image} className="img-fluid w-100" alt={pin.title} style={{ objectFit: 'cover', minHeight: '100%' }} />
                    </div>
                    <div className="col-md-6 p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex gap-2">
                                <button className="btn btn-light rounded-circle"><FaEllipsisH /></button>
                                <button className="btn btn-light rounded-circle"><FaShare /></button>
                            </div>
                            <button className="btn btn-danger rounded-pill px-4 fw-bold">Save</button>
                        </div>

                        <h1 className="fw-bold mb-3">{pin.title}</h1>
                        <p className="text-muted">Uploaded by {pin.user.name}</p>

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
