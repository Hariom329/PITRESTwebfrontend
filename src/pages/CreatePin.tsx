import React, { useState } from 'react';
import { MOCK_BOARDS } from '../data/mockData';
import { FaUpload } from 'react-icons/fa';

const CreatePin: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [destinationLink, setDestinationLink] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(MOCK_BOARDS[0]?.id || '');
    const [isPrivate, setIsPrivate] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleSave = (isDraft: boolean) => {
        console.log('Saving pin:', {
            title,
            description,
            imageUrl,
            destinationLink,
            selectedBoard,
            isPrivate,
            isDraft
        });
        alert(isDraft ? 'Saved as draft!' : 'Pin published!');
    };

    if (showPreview) {
        return (
            <div className="container mt-5 pt-5">
                <button className="btn btn-light mb-4 fw-bold" onClick={() => setShowPreview(false)}>← Back to editing</button>
                <div className="card border-0 shadow-lg rounded-5 mx-auto" style={{ maxWidth: '800px', overflow: 'hidden' }}>
                    <div className="row g-0">
                        <div className="col-md-6">
                            {imageUrl ? (
                                <img src={imageUrl} className="img-fluid w-100" alt="Preview" style={{ objectFit: 'cover', minHeight: '100%' }} />
                            ) : (
                                <div className="d-flex align-items-center justify-content-center bg-light h-100 text-muted">No image</div>
                            )}
                        </div>
                        <div className="col-md-6 p-4">
                            <h2 className="fw-bold mb-3">{title || 'No Title'}</h2>
                            <p className="text-muted mb-4">{description || 'No description'}</p>
                            <div className="d-flex align-items-center mb-3">
                                <img src="https://i.pravatar.cc/150?u=me" className="rounded-circle me-3" width="48" height="48" alt="" />
                                <span className="fw-bold">You</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="bg-white p-0 rounded-5 shadow-sm mx-auto" style={{ maxWidth: '880px', minHeight: '600px' }}>
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                    <div className="d-flex gap-3">
                        <button className="btn btn-light rounded-circle p-2"><FaUpload /></button>
                    </div>
                    <div className="d-flex gap-2">
                        <div className="dropdown">
                            <button className="btn btn-light rounded-pill fw-bold dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                {MOCK_BOARDS.find(b => b.id === selectedBoard)?.name || 'Select Board'}
                            </button>
                            <ul className="dropdown-menu">
                                {MOCK_BOARDS.map(board => (
                                    <li key={board.id}>
                                        <button className="dropdown-item" onClick={() => setSelectedBoard(board.id)}>{board.name}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="btn btn-danger rounded-pill fw-bold px-4" onClick={() => handleSave(false)}>Save</button>
                    </div>
                </div>

                <div className="row g-0">
                    <div className="col-md-5 p-5 border-end">
                        <div className="bg-light rounded-4 d-flex flex-column align-items-center justify-content-center text-center p-4" style={{ height: '450px', border: '2px dashed #ddd' }}>
                            {imageUrl ? (
                                <div className="position-relative w-100 h-100">
                                    <img src={imageUrl} className="w-100 h-100 rounded-4" style={{ objectFit: 'cover' }} alt="Upload" />
                                    <button className="btn btn-light rounded-circle position-absolute bottom-0 end-0 m-3" onClick={() => setImageUrl('')}>×</button>
                                </div>
                            ) : (
                                <>
                                    <FaUpload size={32} className="text-secondary mb-3" />
                                    <p className="fw-bold mb-2">Choose a file or drag and drop it here</p>
                                    <p className="small text-muted mb-4">We recommend using high quality .jpg files less than 20MB</p>
                                    <input
                                        type="text"
                                        className="form-control rounded-pill"
                                        placeholder="Paste image URL here..."
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </>
                            )}
                        </div>
                        <button className="btn btn-light rounded-pill fw-bold w-100 mt-3" onClick={() => handleSave(true)}>Save as Draft</button>
                    </div>

                    <div className="col-md-7 p-5">
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control form-control-lg border-0 fw-bold fs-1 ps-0"
                                placeholder="Add your title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <img src="https://i.pravatar.cc/150?u=me" className="rounded-circle me-3" width="48" height="48" alt="" />
                            <span className="fw-bold">You</span>
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control border-0 ps-0"
                                placeholder="Tell everyone what your Pin is about"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control rounded-pill py-2"
                                placeholder="Add a destination link"
                                value={destinationLink}
                                onChange={(e) => setDestinationLink(e.target.value)}
                            />
                        </div>

                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="privateSwitch"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                            <label className="form-check-label fw-bold" htmlFor="privateSwitch">Keep this board secret</label>
                        </div>

                        <button className="btn btn-outline-secondary rounded-pill fw-bold mt-4" onClick={() => setShowPreview(true)}>Preview</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePin;
