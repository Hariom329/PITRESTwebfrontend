import React, { useState } from 'react';

const Notifications: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'updates' | 'messages'>('updates');

    const mockInvites = [
        { id: 1, type: 'invite', user: 'Interior Design Co.', message: 'invited you to collaborate on "Modern Living"', time: '2h' },
        { id: 2, type: 'update', user: 'Pinterest', message: 'We found some ideas you might like.', time: '5h' },
    ];

    return (
        <div className="container mt-5 pt-5">
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
                            <h5 className="fw-bold">New</h5>
                            {mockInvites.map(notif => (
                                <div className="card border-0 bg-light rounded-4 p-3" key={notif.id}>
                                    <div className="d-flex align-items-center">
                                        <img src={`https://i.pravatar.cc/150?u=${notif.id}`} className="rounded-circle me-3" width="48" height="48" alt="" />
                                        <div className="flex-grow-1">
                                            <p className="mb-0"><span className="fw-bold">{notif.user}</span> {notif.message}</p>
                                            <small className="text-muted">{notif.time}</small>
                                        </div>
                                        {notif.type === 'invite' && (
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-danger rounded-pill fw-bold btn-sm">Accept</button>
                                                <button className="btn btn-light rounded-pill fw-bold btn-sm border">Decline</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
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
        </div>
    );
};

export default Notifications;
