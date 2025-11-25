import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPinterest, FaFacebook, FaGoogle } from 'react-icons/fa';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const storedLockout = localStorage.getItem('login_lockout');
        const storedAttempts = localStorage.getItem('login_attempts');

        if (storedLockout) {
            const lockoutTime = parseInt(storedLockout, 10);
            if (Date.now() < lockoutTime) {
                setLockoutUntil(lockoutTime);
            } else {
                localStorage.removeItem('login_lockout');
                localStorage.removeItem('login_attempts');
                setAttempts(0);
            }
        } else if (storedAttempts) {
            setAttempts(parseInt(storedAttempts, 10));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (lockoutUntil && Date.now() < lockoutUntil) {
            setError(`Too many attempts. Please try again later.`);
            return;
        }

        if (email && password) {
            // Mock login success
            login(email.split('@')[0]);
            localStorage.removeItem('login_attempts');
            localStorage.removeItem('login_lockout');
            navigate('/');
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem('login_attempts', newAttempts.toString());

            if (newAttempts >= 3) {
                const lockoutTime = Date.now() + 60000; // 1 minute
                setLockoutUntil(lockoutTime);
                localStorage.setItem('login_lockout', lockoutTime.toString());
                setError('Too many failed attempts. You are locked out for 1 minute.');
            } else {
                setError('Invalid credentials.');
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="bg-white p-5 rounded-5 shadow-sm text-center" style={{ width: '400px' }}>
                <FaPinterest size={48} className="text-danger mb-3" />
                <h2 className="fw-bold mb-4">Welcome to Pinterest</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label className="form-label small fw-bold">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-pill py-2"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!!lockoutUntil}
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label className="form-label small fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill py-2"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!!lockoutUntil}
                        />
                    </div>
                    <Link to="#" className="d-block text-start small text-dark fw-bold mb-3 text-decoration-none">Forgot your password?</Link>

                    <button
                        type="submit"
                        className="btn btn-danger rounded-pill w-100 fw-bold py-2 mb-3"
                        disabled={!!lockoutUntil}
                    >
                        Log in
                    </button>
                </form>

                <div className="fw-bold text-muted mb-3">OR</div>

                <button className="btn btn-primary rounded-pill w-100 fw-bold py-2 mb-2 d-flex align-items-center justify-content-center gap-2">
                    <FaFacebook size={20} /> Continue with Facebook
                </button>
                <button className="btn btn-light border rounded-pill w-100 fw-bold py-2 mb-4 d-flex align-items-center justify-content-center gap-2">
                    <FaGoogle size={20} /> Continue with Google
                </button>

                <p className="small text-muted">
                    By continuing, you agree to Pinterest's <Link to="#" className="text-dark fw-bold text-decoration-none">Terms of Service</Link> and acknowledge you've read our <Link to="#" className="text-dark fw-bold text-decoration-none">Privacy Policy</Link>.
                </p>

                <hr />

                <p className="small fw-bold">
                    Not on Pinterest yet? <Link to="/signup" className="text-dark text-decoration-none">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
