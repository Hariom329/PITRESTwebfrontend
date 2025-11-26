import React, { useState, useEffect } from 'react';
import { MOCK_PINS, MOCK_BOARDS, MOCK_USERS } from '../data/mockData';
import { Link, useParams } from 'react-router-dom';
import { FaSearch, FaPlus, FaPen, FaTrash, FaSortAmountDown, FaEllipsisH, FaShare, FaBriefcase, FaGlobe, FaStore } from 'react-icons/fa';
import Toast from '../components/Toast';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState<'created' | 'saved' | 'showcases'>('saved');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  // User Data State
  const isMe = !userId || userId === 'me';
  const profileId = isMe ? 'me' : userId;
  const user = MOCK_USERS.find(u => u.id === profileId);
  const [isFollowing, setIsFollowing] = useState(false); // Mock follow state

  // Modal & Dropdown States
  const [renamingBoardId, setRenamingBoardId] = useState<string | null>(null);
  const [deletingBoardId, setDeletingBoardId] = useState<string | null>(null);
  const [newBoardName, setNewBoardName] = useState('');
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

  // Edit Profile State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>({ show: false, message: '', type: 'info' });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    setIsFollowing(false);
    setShowOptionsDropdown(false);
    if (user?.isBusiness) {
      setActiveTab('showcases');
    } else {
      setActiveTab('saved');
    }
  }, [profileId, user]);

  if (!user) {
    return <div className="text-center mt-5 pt-5">User not found</div>;
  }

  const handleRenameClick = (e: React.MouseEvent, boardId: string, currentName: string) => {
    e.preventDefault();
    e.stopPropagation();
    setRenamingBoardId(boardId);
    setNewBoardName(currentName);
  };

  const handleDeleteClick = (e: React.MouseEvent, boardId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingBoardId(boardId);
  };

  const confirmRename = () => {
    if (renamingBoardId && newBoardName) {
      console.log(`Renaming board ${renamingBoardId} to ${newBoardName}`);
      setRenamingBoardId(null);
      setNewBoardName('');
    }
  };

  const confirmDelete = () => {
    if (deletingBoardId) {
      console.log(`Deleting board ${deletingBoardId}`);
      setDeletingBoardId(null);
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // In real app, update backend
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Profile link copied to clipboard!', 'success');
  };

  const handleEditProfileClick = () => {
    setEditName(user.name);
    setEditBio(user.bio);
    setShowEditProfileModal(true);
  };

  const saveProfileChanges = () => {
    // In a real app, this would update the backend
    console.log('Saving profile:', { name: editName, bio: editBio });
    user.name = editName; // Mock update
    user.bio = editBio;   // Mock update
    setShowEditProfileModal(false);
  };

  const filteredPins = MOCK_PINS.filter(pin =>
    pin.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  const filteredBoards = MOCK_BOARDS.filter(board =>
    board.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const followersList = MOCK_USERS.filter(u => user.followers.includes(u.id));
  const followingList = MOCK_USERS.filter(u => user.following.includes(u.id));

  return (
    <div className="container mt-5 pt-5 text-center position-relative" onClick={() => setShowOptionsDropdown(false)}>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <div className="d-flex flex-column align-items-center mb-5">
        <div className="position-relative d-inline-block mb-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="rounded-circle shadow-sm"
            width="120"
            height="120"
            style={{ border: '2px solid white' }}
          />
          {user.isBusiness && (
            <span className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle p-1 border border-white" title="Business Account">
              <FaStore size={14} />
            </span>
          )}
        </div>

        <h1 className="fw-bold mb-1">{user.name}</h1>
        <p className="text-muted mb-3">@{user.username}</p>
        <p className="text-muted small" style={{ maxWidth: '400px' }}>{user.bio}</p>

        {user.isBusiness && user.website && (
          <a href={user.website} target="_blank" rel="noopener noreferrer" className="d-block mb-3 fw-bold text-dark text-decoration-none hover-underline">
            {user.website.replace(/^https?:\/\//, '')}
          </a>
        )}

        <div className="d-flex justify-content-center gap-3 mb-4 text-muted small fw-bold">
          <button className="btn btn-link text-dark text-decoration-none fw-bold p-0" onClick={() => setShowFollowersModal(true)}>
            {user.followers?.length || 0} followers
          </button>
          <span>&bull;</span>
          <button className="btn btn-link text-dark text-decoration-none fw-bold p-0" onClick={() => setShowFollowingModal(true)}>
            {user.following?.length || 0} following
          </button>
        </div>

        <div className="d-flex gap-2 mb-4">
          {isMe ? (
            <>
              <button className="btn btn-light rounded-pill px-4 fw-bold hover-bg-gray transition-all" onClick={handleShare}>
                Share
              </button>
              <button className="btn btn-light rounded-pill px-4 fw-bold hover-bg-gray transition-all" onClick={handleEditProfileClick}>Edit Profile</button>
            </>
          ) : (
            <>
              <button className="btn btn-light rounded-pill fw-bold">Message</button>
              <button
                className={`btn rounded-pill px-4 fw-bold transition-all ${isFollowing ? 'btn-dark' : 'btn-danger'}`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <div className="position-relative">
                <button
                  className="btn btn-light rounded-circle p-2"
                  onClick={(e) => { e.stopPropagation(); setShowOptionsDropdown(!showOptionsDropdown); }}
                >
                  <FaEllipsisH />
                </button>
                {showOptionsDropdown && (
                  <div className="position-absolute top-100 start-50 translate-middle-x mt-2 bg-white shadow-lg rounded-4 overflow-hidden" style={{ width: '150px', zIndex: 1000 }}>
                    <button className="btn btn-link w-100 text-start text-dark text-decoration-none px-3 py-2 fw-bold small" onClick={() => showToast('User blocked', 'error')}>Block user</button>
                    <button className="btn btn-link w-100 text-start text-dark text-decoration-none px-3 py-2 fw-bold small" onClick={() => showToast('User reported', 'info')}>Report user</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="d-flex gap-4 border-bottom mb-4">
          {user.isBusiness && (
            <button
              className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'showcases' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
              onClick={() => setActiveTab('showcases')}
            >
              Showcases
            </button>
          )}
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
          <div className="d-flex gap-2">
            <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}><FaSortAmountDown /></button>
            <select
              className="form-select rounded-pill border-0 bg-light fw-bold"
              style={{ width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
            >
              <option value="date">Last Saved</option>
              <option value="name">A to Z</option>
            </select>
          </div>

          <div className="position-relative flex-grow-1 mx-3">
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
            <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}><FaPlus /></button>
          </div>
        </div>
      </div>

      {activeTab === 'showcases' && user.isBusiness ? (
        <div className="row g-4 text-start">
          {user.showcases?.map(showcase => (
            <div className="col-md-6" key={showcase.id}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                <div className="row g-0 h-100">
                  <div className="col-5">
                    <img src={showcase.coverImage} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={showcase.title} />
                  </div>
                  <div className="col-7 p-4 d-flex flex-column justify-content-center">
                    <h5 className="fw-bold mb-2">{showcase.title}</h5>
                    <p className="text-muted small mb-3">{showcase.description}</p>
                    <button className="btn btn-light rounded-pill fw-bold align-self-start">View Collection</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!user.showcases || user.showcases.length === 0) && (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No showcases available yet.</p>
            </div>
          )}
        </div>
      ) : activeTab === 'saved' ? (
        <div className="row g-3 text-start">
          {/* Boards Section */}
          {filteredBoards.map(board => (
            <div className="col-6 col-md-4 col-lg-3" key={board.id}>
              <Link to={`/board/${board.id}`} className="text-decoration-none text-dark">
                <div className="card border-0 h-100 position-relative group-hover-container">
                  <div className="rounded-4 bg-light d-flex align-items-center justify-content-center overflow-hidden position-relative" style={{ height: '160px' }}>
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

                    {/* Hover Actions for Board (Only if Me) */}
                    {isMe && (
                      <div className="position-absolute top-0 end-0 p-2 d-none d-md-flex gap-1" style={{ zIndex: 10 }}>
                        <button className="btn btn-light btn-sm rounded-circle shadow-sm" onClick={(e) => handleRenameClick(e, board.id, board.name)} title="Rename Board"><FaPen size={12} /></button>
                        <button className="btn btn-light btn-sm rounded-circle shadow-sm text-danger" onClick={(e) => handleDeleteClick(e, board.id)} title="Delete Board"><FaTrash size={12} /></button>
                      </div>
                    )}
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
              <div className="d-flex justify-content-between align-items-start mt-2">
                <div>
                  <h6 className="fw-bold mb-0">{pin.title}</h6>
                  <small className="text-muted">{MOCK_BOARDS.find(b => b.pins.includes(pin.id))?.name || 'Saved'}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rename Modal */}
      {renamingBoardId && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
          <div className="bg-white rounded-5 p-4 shadow-lg text-center" style={{ width: '400px' }}>
            <h3 className="fw-bold mb-3">Rename Board</h3>
            <input
              type="text"
              className="form-control rounded-pill py-2 mb-4"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              autoFocus
            />
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-light rounded-pill fw-bold" onClick={() => setRenamingBoardId(null)}>Cancel</button>
              <button className="btn btn-danger rounded-pill fw-bold px-4" onClick={confirmRename}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingBoardId && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
          <div className="bg-white rounded-5 p-4 shadow-lg text-center" style={{ width: '400px' }}>
            <h3 className="fw-bold mb-3">Delete this board?</h3>
            <p className="text-muted mb-4">Are you sure you want to delete this board and all its pins? You can't undo this!</p>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-light rounded-pill fw-bold" onClick={() => setDeletingBoardId(null)}>Cancel</button>
              <button className="btn btn-danger rounded-pill fw-bold px-4" onClick={confirmDelete}>Delete forever</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1060 }}>
          <div className="bg-white rounded-5 p-5 shadow-lg text-start" style={{ width: '500px' }}>
            <h2 className="fw-bold mb-4">Edit Profile</h2>

            <div className="mb-3">
              <label className="form-label small fw-bold">Name</label>
              <input
                type="text"
                className="form-control rounded-pill py-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold">Bio</label>
              <textarea
                className="form-control rounded-4 py-2"
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-light rounded-pill fw-bold" onClick={() => setShowEditProfileModal(false)}>Cancel</button>
              <button className="btn btn-danger rounded-pill fw-bold px-4" onClick={saveProfileChanges}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Followers Modal */}
      {showFollowersModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1060 }}>
          <div className="bg-white rounded-5 p-4 shadow-lg text-center" style={{ width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 className="fw-bold mb-4">Followers</h3>
            <div className="list-group list-group-flush text-start">
              {followersList.map(u => (
                <div key={u.id} className="list-group-item border-0 d-flex align-items-center justify-content-between px-0">
                  <Link to={`/profile/${u.id}`} className="d-flex align-items-center text-decoration-none text-dark" onClick={() => setShowFollowersModal(false)}>
                    <img src={u.avatar} className="rounded-circle me-3" width="40" height="40" alt="" />
                    <span className="fw-bold">{u.name}</span>
                  </Link>
                  <button className="btn btn-light rounded-pill fw-bold btn-sm">Remove</button>
                </div>
              ))}
              {followersList.length === 0 && <p className="text-muted">No followers yet.</p>}
            </div>
            <button className="btn btn-light rounded-pill fw-bold mt-4 px-4" onClick={() => setShowFollowersModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1060 }}>
          <div className="bg-white rounded-5 p-4 shadow-lg text-center" style={{ width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 className="fw-bold mb-4">Following</h3>
            <div className="list-group list-group-flush text-start">
              {followingList.map(u => (
                <div key={u.id} className="list-group-item border-0 d-flex align-items-center justify-content-between px-0">
                  <Link to={`/profile/${u.id}`} className="d-flex align-items-center text-decoration-none text-dark" onClick={() => setShowFollowingModal(false)}>
                    <img src={u.avatar} className="rounded-circle me-3" width="40" height="40" alt="" />
                    <span className="fw-bold">{u.name}</span>
                  </Link>
                  <button className="btn btn-dark rounded-pill fw-bold btn-sm">Unfollow</button>
                </div>
              ))}
              {followingList.length === 0 && <p className="text-muted">Not following anyone yet.</p>}
            </div>
            <button className="btn btn-light rounded-pill fw-bold mt-4 px-4" onClick={() => setShowFollowingModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
