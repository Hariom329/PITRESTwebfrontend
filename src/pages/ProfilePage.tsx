import React, { useState } from 'react';
import { MOCK_PINS, MOCK_BOARDS } from '../data/mockData';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('saved');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPins = MOCK_PINS.filter(pin =>
    pin.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBoards = MOCK_BOARDS.filter(board =>
    board.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5 pt-5 text-center">
      <div className="d-flex flex-column align-items-center mb-5">
        <img
          src="https://i.pravatar.cc/150?u=me"
          alt="Profile"
          className="rounded-circle mb-3"
          width="120"
          height="120"
        />
        <h1 className="fw-bold">My Profile</h1>
        <p className="text-muted">@myprofile</p>
        <div className="d-flex gap-3 mb-3">
          <span className="fw-bold">120 <span className="text-muted fw-normal">followers</span></span>
          <span className="fw-bold">45 <span className="text-muted fw-normal">following</span></span>
        </div>
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-light rounded-pill fw-bold">Share</button>
          <button className="btn btn-light rounded-pill fw-bold">Edit Profile</button>
        </div>

        <div className="d-flex gap-4 border-bottom mb-4">
          <button
            className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'created' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
            onClick={() => setActiveTab('created')}
          >
            Created
          </button>
          <button
            className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'saved' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-center w-100 mb-4 px-3">
          <div className="position-relative">
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
            <input
              type="text"
              className="form-control rounded-pill ps-5 bg-light border-0"
              placeholder="Search your pins"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-light rounded-circle"><FaPlus /></button>
          </div>
        </div>
      </div>

      {activeTab === 'saved' ? (
        <div className="row g-3 text-start">
          {/* Boards Section */}
          {filteredBoards.map(board => (
            <div className="col-6 col-md-4 col-lg-3" key={board.id}>
              <Link to={`/board/${board.id}`} className="text-decoration-none text-dark">
                <div className="card border-0 h-100">
                  <div className="rounded-4 bg-light d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '160px' }}>
                    {/* Mock collage of pins */}
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
                    <small className="text-muted">{board.pins.length} Pins {board.isPrivate && '🔒'}</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="masonry-container text-start">
          {filteredPins.map(pin => (
            <div className="masonry-item" key={pin.id}>
              <Link to={`/pin/${pin.id}`}>
                <img src={pin.image} className="img-fluid rounded-4" alt={pin.title} />
              </Link>
              <h6 className="mt-2 fw-bold">{pin.title}</h6>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
