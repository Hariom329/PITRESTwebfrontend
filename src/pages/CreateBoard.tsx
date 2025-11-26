import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_BOARDS } from '../data/mockData';
import { FaArrowLeft } from 'react-icons/fa';

const CreateBoard: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCreate = () => {
        if (!name.trim()) return;

        const newBoard = {
            id: `b${Date.now()}`,
            name: name,
            pins: [],
            isPrivate: isPrivate
        };

        // In a real app, this would be an API call
        // For this mock, we'll try to push to the mock array if possible, 
        // or just simulate success.
        MOCK_BOARDS.push(newBoard);

        // Navigate back or to create pin
        navigate(-1);
    };

    return (
        <div className="container mt-5 pt-5">
            <button className="btn btn-light rounded-circle mb-4" onClick={() => navigate(-1)}>
                <FaArrowLeft />
            </button>

            <div className="card border-0 shadow-lg rounded-5 mx-auto p-5" style={{ maxWidth: '600px' }}>
                <h2 className="fw-bold mb-4 text-center">Create Board</h2>

                <div className="mb-4">
                    <label className="form-label small fw-bold text-muted">Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg rounded-pill"
                        placeholder='Like "Places to Go" or "Recipes to Make"'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="secretBoard"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <label className="form-check-label fw-bold" htmlFor="secretBoard">Keep this board secret</label>
                    </div>
                    <p className="small text-muted mt-1">So only you and collaborators can see it.</p>
                </div>

                <button
                    className="btn btn-danger rounded-pill fw-bold w-100 py-3"
                    onClick={handleCreate}
                    disabled={!name.trim()}
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default CreateBoard;
