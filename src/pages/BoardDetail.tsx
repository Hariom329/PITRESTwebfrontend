import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BOARDS, MOCK_PINS } from '../data/mockData';
import { FaEllipsisH, FaPlus, FaFilter } from 'react-icons/fa';

const BoardDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const board = MOCK_BOARDS.find(b => b.id === id);

    if (!board) {
        return <div className="text-center mt-5 pt-5">Board not found</div>;
    }

    const boardPins = MOCK_PINS.filter(pin => board.pins.includes(pin.id));

    return (
        <div className="container mt-5 pt-5 text-center">
            <div className="mb-5">
                <h1 className="fw-bold display-4">{board.name}</h1>
                <div className="d-flex justify-content-center align-items-center gap-2 text-muted">
                    <img src="https://i.pravatar.cc/150?u=me" className="rounded-circle" width="32" height="32" alt="Me" />
                    <small>{boardPins.length} Pins</small>
                    {board.isPrivate && <small>• 🔒 Secret Board</small>}
                </div>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button className="btn btn-light rounded-circle p-3"><FaEllipsisH /></button>
                    <button className="btn btn-light rounded-circle p-3"><FaPlus /></button>
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
        </div>
    );
};

export default BoardDetail;
