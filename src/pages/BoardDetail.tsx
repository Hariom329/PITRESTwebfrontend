import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_BOARDS, MOCK_PINS } from '../data/mockData';
import { FaPlus, FaFilter, FaPen } from 'react-icons/fa';

const BoardDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const board = MOCK_BOARDS.find(b => b.id === id);
    const [showEditModal, setShowEditModal] = useState(false);
    const [boardName, setBoardName] = useState(board?.name || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!board) {
        return <div className="text-center mt-5 pt-5">Board not found</div>;
    }

    const boardPins = MOCK_PINS.filter(pin => board.pins.includes(pin.id));

    const handleSaveBoard = () => {
        alert(`Board renamed to: ${boardName}`);
        setShowEditModal(false);
        // In real app, update state/backend
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        alert("Board deleted");
        navigate('/profile/me');
    };

    return (
        <div className="container mt-5 pt-5 text-center position-relative">
            <div className="mb-5">
                <h1 className="fw-bold display-4">{board.name}</h1>
                <div className="d-flex justify-content-center align-items-center gap-2 text-muted">
                    <img src="https://i.pravatar.cc/150?u=me" className="rounded-circle" width="32" height="32" alt="Me" />
                    <small>{boardPins.length} Pins</small>
                    {board.isPrivate && <small>• 🔒 Secret Board</small>}
                </div>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }} onClick={() => setShowEditModal(true)} title="Edit Board"><FaPen size={20} /></button>
                    <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}><FaPlus size={24} /></button>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                <button className="btn btn-light rounded-circle"><FaFilter /></button>
                <button className="btn btn-light rounded-pill fw-bold">Organize</button>
            </div>

            <div className="masonry-container text-start">
                {boardPins.map(pin => (
                    <div className="masonry-item" key={pin.id}>
                        <Link to={`/pin/${pin.id}`}>
                            <img src={pin.image} className="img-fluid rounded-4" alt={pin.title} />
                        </Link>
                        <h6 className="mt-2 fw-bold">{pin.title}</h6>
                    </div>
                ))}
                {boardPins.length === 0 && (
                    <div className="text-center w-100 py-5">
                        <h4 className="text-muted">No pins yet</h4>
                        <Link to="/create" className="btn btn-danger rounded-pill fw-bold mt-3">Create Pin</Link>
                    </div>
                )}
            </div>

            {/* Edit Board Modal Overlay */}
            {showEditModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
                    <div className="bg-white rounded-5 p-5 shadow-lg text-start" style={{ width: '500px' }}>
                        <h2 className="fw-bold mb-4">Edit your board</h2>

                        <div className="mb-3">
                            <label className="form-label small fw-bold">Name</label>
                            <input
                                type="text"
                                className="form-control rounded-pill py-2"
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold">Settings</label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="keepSecret" defaultChecked={board.isPrivate} />
                                <label className="form-check-label" htmlFor="keepSecret">Keep this board secret</label>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <button className="btn btn-light rounded-pill fw-bold text-danger" onClick={handleDeleteClick}>Delete</button>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light rounded-pill fw-bold" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button className="btn btn-danger rounded-pill fw-bold px-4" onClick={handleSaveBoard}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1060 }}>
                    <div className="bg-white rounded-5 p-4 shadow-lg text-center" style={{ width: '400px' }}>
                        <h3 className="fw-bold mb-3">Delete this board?</h3>
                        <p className="text-muted mb-4">Are you sure you want to delete this board and all its pins? You can't undo this!</p>
                        <div className="d-flex gap-2 justify-content-end">
                            <button className="btn btn-light rounded-pill fw-bold" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn btn-danger rounded-pill fw-bold px-4" onClick={confirmDelete}>Delete forever</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardDetail;
