import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MOCK_PINS, MOCK_BOARDS } from '../data/mockData';
import { FaFilter } from 'react-icons/fa';

const SearchPage: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';
    const [activeTab, setActiveTab] = useState<'pins' | 'boards' | 'people'>('pins');

    const filteredPins = MOCK_PINS.filter(pin =>
        pin.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredBoards = MOCK_BOARDS.filter(board =>
        board.name.toLowerCase().includes(query.toLowerCase())
    );

    // Mock people results
    const filteredPeople = [
        { id: 'u1', name: 'Interior Design Co.', username: 'interiors', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 'u2', name: 'Foodie Life', username: 'foodie', avatar: 'https://i.pravatar.cc/150?u=2' },
    ].filter(user => user.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="container mt-5 pt-5 text-center">
            <div className="mb-4">
                <h2 className="fw-bold mb-3">Results for "{query}"</h2>

                <div className="d-flex justify-content-center gap-4 border-bottom mb-4">
                    <button
                        className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'pins' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
                        onClick={() => setActiveTab('pins')}
                    >
                        Pins
                    </button>
                    <button
                        className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'boards' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
                        onClick={() => setActiveTab('boards')}
                    >
                        Boards
                    </button>
                    <button
                        className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'people' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
                        onClick={() => setActiveTab('people')}
                    >
                        People
                    </button>
                </div>

                <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                    <button className="btn btn-light rounded-circle"><FaFilter /></button>
                    <div className="dropdown">
                        <button className="btn btn-light rounded-pill fw-bold dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            All Recommendations
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => { }}>Most Relevant</button></li>
                            <li><button className="dropdown-item" onClick={() => { }}>Newest</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            {activeTab === 'pins' && (
                <div className="masonry-container text-start">
                    {filteredPins.map(pin => (
                        <div className="masonry-item" key={pin.id}>
                            <Link to={`/pin/${pin.id}`}>
                                <img src={pin.image} className="img-fluid rounded-4" alt={pin.title} />
                            </Link>
                            <h6 className="mt-2 fw-bold">{pin.title}</h6>
                            <div className="d-flex align-items-center mt-1">
                                <img src={pin.user.avatar} className="rounded-circle me-2" width="24" height="24" alt="" />
                                <small className="text-muted">{pin.user.name}</small>
                            </div>
                        </div>
                    ))}
                    {filteredPins.length === 0 && <p className="text-muted">No pins found.</p>}
                </div>
            )}

            {activeTab === 'boards' && (
                <div className="row g-3 text-start">
                    {filteredBoards.map(board => (
                        <div className="col-6 col-md-4 col-lg-3" key={board.id}>
                            <Link to={`/board/${board.id}`} className="text-decoration-none text-dark">
                                <div className="card border-0 h-100">
                                    <div className="rounded-4 bg-light d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '160px' }}>
                                        <div className="row g-0 w-100 h-100">
                                            <div className="col-8 h-100 border-end border-white">
                                                <img src={MOCK_PINS.find(p => p.id === board.pins[0])?.image || 'https://via.placeholder.com/150'} className="w-100 h-100" style={{ objectFit: 'cover' }} alt="" />
                                            </div>
                                            <div className="col-4 h-100 d-flex flex-column">
                                                <div className="h-50 border-bottom border-white">
                                                    <img src={MOCK_PINS.find(p => p.id === board.pins[1])?.image || 'https://via.placeholder.com/150'} className="w-100 h-100" style={{ objectFit: 'cover' }} alt="" />
                                                </div>
                                                <div className="h-50 bg-secondary bg-opacity-10"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body px-1 py-2">
                                        <h6 className="fw-bold mb-0">{board.name}</h6>
                                        <small className="text-muted">{board.pins.length} Pins</small>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    {filteredBoards.length === 0 && <p className="text-muted">No boards found.</p>}
                </div>
            )}

            {activeTab === 'people' && (
                <div className="row g-3 text-start">
                    {filteredPeople.map(user => (
                        <div className="col-12 col-md-6 col-lg-4" key={user.id}>
                            <div className="card border-0 bg-light rounded-4 p-3 d-flex flex-row align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img src={user.avatar} className="rounded-circle me-3" width="64" height="64" alt="" />
                                    <div>
                                        <h6 className="fw-bold mb-0">{user.name}</h6>
                                        <small className="text-muted">@{user.username}</small>
                                    </div>
                                </div>
                                <button className="btn btn-danger rounded-pill fw-bold">Follow</button>
                            </div>
                        </div>
                    ))}
                    {filteredPeople.length === 0 && <p className="text-muted">No people found.</p>}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
