import React, { useState } from 'react';
import { MOCK_INVITATIONS, MOCK_USERS, MOCK_BOARDS } from '../data/mockData';
import { Link, useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

const Notifications: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialTab = searchParams.get('tab') === 'messages' ? 'messages' : 'updates';

    const [activeTab, setActiveTab] = useState<'updates' | 'messages'>(initialTab);
    const [invitations, setInvitations] = useState(MOCK_INVITATIONS);
    const [selectedInviteId, setSelectedInviteId] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<'all' | 'board_collaboration' | 'connection'>('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>({ show: false, message: '', type: 'info' });

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setToast({ show: true, message, type });
    };

    const handleAction = (id: string, action: 'accepted' | 'declined') => {
        try {
            // Simulate random error (10% chance)
            if (Math.random() < 0.1) {
                throw new Error('Network error');
            }

            setInvitations(prev => prev.map(inv =>
                inv.id === id ? { ...inv, status: action } : inv
            ));

            if (action === 'accepted') {
                const invite = invitations.find(i => i.id === id);
                if (invite?.type === 'board_collaboration' && invite.boardId) {
                    const board = MOCK_BOARDS.find(b => b.id === invite.boardId);
                    showToast(`You accepted the invitation! You are now a collaborator on "${board?.name}".`, 'success');
                } else if (invite?.type === 'connection') {
                    const user = MOCK_USERS.find(u => u.id === invite.inviterId);
                    // Simulate adding to following list
                    const me = MOCK_USERS.find(u => u.id === 'me');
                    if (me && user) {
                        if (!me.following.includes(user.id)) me.following.push(user.id);
                        if (!user.followers.includes(me.id)) user.followers.push(me.id);
                    }
                    showToast(`You are now connected with ${user?.name}.`, 'success');
                }
            } else if (action === 'declined') {
                showToast('Invitation declined.', 'info');
            }

            if (selectedInviteId === id) setSelectedInviteId(null);
        } catch (error) {
            showToast('Failed to process invitation. Please try again.', 'error');
        }
    };

    const filteredInvites = invitations
        .filter(inv => inv.status === 'pending')
        .filter(inv => filterType === 'all' || inv.type === filterType)
        .sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime(); // Assuming timestamp is parsable or just string compare for mock
            const dateB = new Date(b.timestamp).getTime();
            // Mock timestamp is relative string (e.g. '2h ago'), so we can't sort easily by date object. 
            // For this mock, let's just reverse the array for 'oldest' since they are likely ordered by newest in mock data.
            // Or better, let's just toggle reverse.
            return sortOrder === 'newest' ? 0 : -1; // Simplified for mock data which lacks real dates
        });

    // Better sort logic if timestamps were real dates, but for "5h ago" strings, it's hard. 
    // Let's assume MOCK_INVITATIONS is already sorted by newest.
    const displayInvites = sortOrder === 'newest' ? filteredInvites : [...filteredInvites].reverse();

    const getInviter = (id: string) => MOCK_USERS.find(u => u.id === id);
    const getBoard = (id?: string) => MOCK_BOARDS.find(b => b.id === id);

    const selectedInvite = invitations.find(inv => inv.id === selectedInviteId);
    const selectedInviter = selectedInvite ? getInviter(selectedInvite.inviterId) : null;
    const selectedBoard = selectedInvite?.boardId ? getBoard(selectedInvite.boardId) : null;

    return (
        <div className="container mt-5 pt-5">
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />
            <div className="d-flex justify-content-center mb-4">
                <div className="d-flex gap-4">
                    <button
                        className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'updates' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
                        onClick={() => setActiveTab('updates')}
                    >
                        Updates
                    </button>
                    <button
                        className={`btn btn-link text-decoration-none pb-2 ${activeTab === 'messages' ? 'text-dark fw-bold border-bottom border-dark border-3' : 'text-muted'}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        Messages
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {activeTab === 'updates' ? (
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between align-items-center px-2 mb-2">
                                <h5 className="fw-bold mb-0">New</h5>
                                <div className="d-flex gap-2">
                                    <select
                                        className="form-select form-select-sm rounded-pill border-0 bg-light"
                                        style={{ width: 'auto' }}
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value as any)}
                                    >
                                        <option value="all">All</option>
                                        <option value="board_collaboration">Boards</option>
                                        <option value="connection">Connections</option>
                                    </select>
                                    <select
                                        className="form-select form-select-sm rounded-pill border-0 bg-light"
                                        style={{ width: 'auto' }}
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value as any)}
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="oldest">Oldest</option>
                                    </select>
                                </div>
                            </div>

                            {displayInvites.length > 0 ? (
                                <>
                                    {displayInvites.map(inv => {
                                        const inviter = getInviter(inv.inviterId);
                                        const board = getBoard(inv.boardId);
                                        return (
                                            <div
                                                className="card border-0 bg-light rounded-4 p-3 cursor-pointer hover-shadow"
                                                key={inv.id}
                                                onClick={() => setSelectedInviteId(inv.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img src={inviter?.avatar} className="rounded-circle me-3" width="48" height="48" alt="" />
                                                    <div className="flex-grow-1">
                                                        <p className="mb-0">
                                                            <span className="fw-bold">{inviter?.name}</span>
                                                            {inv.type === 'board_collaboration'
                                                                ? ` invited you to collaborate on "${board?.name || 'a board'}"`
                                                                : ` wants to connect with you`}
                                                        </p>
                                                        <small className="text-muted">{inv.timestamp}</small>
                                                    </div>
                                                    <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            className="btn btn-danger rounded-pill fw-bold btn-sm"
                                                            onClick={() => handleAction(inv.id, 'accepted')}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="btn btn-light rounded-pill fw-bold btn-sm border"
                                                            onClick={() => handleAction(inv.id, 'declined')}
                                                        >
                                                            Decline
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="text-center py-5">
                                    <h5 className="text-muted">No new updates</h5>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <h4 className="fw-bold">Share ideas with your friends</h4>
                            <p className="text-muted">Message your friends to share your favorite Pins.</p>
                            <button className="btn btn-danger rounded-pill fw-bold">New Message</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed View Modal */}
            {selectedInvite && selectedInviter && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1060 }}>
                    <div className="bg-white rounded-5 p-5 shadow-lg text-center" style={{ width: '450px' }}>
                        <img src={selectedInviter.avatar} className="rounded-circle mb-3" width="80" height="80" alt="" />
                        <h3 className="fw-bold mb-1">{selectedInviter.name}</h3>
                        <p className="text-muted">@{selectedInviter.username}</p>

                        <div className="my-4 p-3 bg-light rounded-4 text-start">
                            <p className="mb-2 fw-bold text-secondary text-uppercase small">Invitation Type</p>
                            <p className="mb-3">
                                {selectedInvite.type === 'board_collaboration' ? 'Board Collaboration' : 'Connection Request'}
                            </p>

                            {selectedBoard && (
                                <>
                                    <p className="mb-2 fw-bold text-secondary text-uppercase small">Board</p>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-secondary rounded-3 me-2" style={{ width: '40px', height: '40px' }}></div>
                                        <span className="fw-bold">{selectedBoard.name}</span>
                                    </div>
                                </>
                            )}

                            {selectedInvite.message && (
                                <>
                                    <p className="mb-2 fw-bold text-secondary text-uppercase small">Message</p>
                                    <p className="mb-0 fst-italic">"{selectedInvite.message}"</p>
                                </>
                            )}
                        </div>

                        <div className="d-flex gap-2 justify-content-center w-100">
                            <button
                                className="btn btn-light rounded-pill fw-bold flex-grow-1"
                                onClick={() => setSelectedInviteId(null)}
                            >
                                Ignore
                            </button>
                            <button
                                className="btn btn-danger rounded-pill fw-bold flex-grow-1"
                                onClick={() => handleAction(selectedInvite.id, 'accepted')}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
