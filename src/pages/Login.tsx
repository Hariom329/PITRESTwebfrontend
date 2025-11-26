import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPinterest, FaFacebook, FaGoogle, FaMobileAlt, FaLock } from 'react-icons/fa';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [failedAttempts, setFailedAttempts] = useState<number[]>([]); // Store timestamps of failed attempts
    const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    // Forgot Password State
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetStep, setResetStep] = useState<'mobile' | 'otp' | 'newPassword'>('mobile');
    const [resetMobile, setResetMobile] = useState('');
    const [resetOtp, setResetOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    // Load state from local storage on mount
    useEffect(() => {
        const storedLockout = localStorage.getItem('login_lockout');
        const storedAttempts = localStorage.getItem('login_failed_attempts');

        if (storedLockout) {
            const lockoutTime = parseInt(storedLockout, 10);
            if (Date.now() < lockoutTime) {
                setLockoutUntil(lockoutTime);
            } else {
                localStorage.removeItem('login_lockout');
                localStorage.removeItem('login_failed_attempts');
            }
        }

        if (storedAttempts) {
            setFailedAttempts(JSON.parse(storedAttempts));
        }
    }, []);

    // Countdown timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (lockoutUntil) {
            interval = setInterval(() => {
                const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
                if (remaining <= 0) {
                    setLockoutUntil(null);
                    setTimeLeft(0);
                    setFailedAttempts([]);
                    localStorage.removeItem('login_lockout');
                    localStorage.removeItem('login_failed_attempts');
                } else {
                    setTimeLeft(remaining);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [lockoutUntil]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (lockoutUntil) {
            return;
        }

        if (login(email)) { // Using AuthContext login which checks email existence for now
            // In a real app we would check password too. 
            // For this mock, if email exists in our "DB", we consider it a success if we want to be simple,
            // BUT US 02 says "Validate credentials". 
            // Since we don't have a real backend, we'll assume if the user exists, the password is "password" or matches what they signed up with (stored in localstorage).

            const users = JSON.parse(localStorage.getItem('pinterest_users_db') || '[]');
            const user = users.find((u: any) => u.email === email);

            if (user && user.password === password) {
                // Success
                localStorage.removeItem('login_failed_attempts');
                localStorage.removeItem('login_lockout');
                navigate('/');
                return;
            }

            // If user not found in DB but is a "test" user (fallback in AuthContext), we might let them in.
            // Let's rely on AuthContext.login returning true/false.
            // Wait, AuthContext.login currently returns true if email has '@'. We need to be stricter here.
            // Let's refine the logic:

            if (!user) {
                // Check if it's a legacy test user? No, let's enforce strictness.
                handleLoginFailure();
            } else {
                handleLoginFailure();
            }
        } else {
            handleLoginFailure();
        }
    };

    const handleLoginFailure = () => {
        const now = Date.now();
        // Filter attempts to keep only those within the last 30 seconds
        const recentAttempts = [...failedAttempts, now].filter(timestamp => now - timestamp <= 30000);

        setFailedAttempts(recentAttempts);
        localStorage.setItem('login_failed_attempts', JSON.stringify(recentAttempts));

        if (recentAttempts.length >= 3) {
            const lockoutTime = now + 60000; // 1 minute lockout
            setLockoutUntil(lockoutTime);
            localStorage.setItem('login_lockout', lockoutTime.toString());
            setError('Too many failed attempts. You are locked out for 1 minute.');
        } else {
            setError('Invalid email or password.');
        }
    };

    // Forgot Password Handlers
    const handleSendOtp = () => {
        if (resetMobile.length < 10) {
            setResetMessage('Please enter a valid mobile number.');
            return;
        }
        setResetMessage('OTP sent to your mobile number.');
        setResetStep('otp');
    };

    const handleVerifyOtp = () => {
        if (resetOtp === '1234') { // Mock OTP
            setResetStep('newPassword');
            setResetMessage('');
        } else {
            setResetMessage('Invalid OTP. Try 1234.');
        }
    };

    const handleResetPassword = () => {
        if (newPassword.length < 6) {
            setResetMessage('Password must be at least 6 characters.');
            return;
        }
        // In a real app, we'd update the user's password in the DB here.
        setResetMessage('Password reset successfully! You can now log in.');
        setTimeout(() => {
            setShowForgotPassword(false);
            setResetStep('mobile');
            setResetMessage('');
        }, 2000);
    };

    if (showForgotPassword) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <div className="bg-white p-5 rounded-5 shadow-sm text-center" style={{ width: '400px' }}>
                    <h3 className="fw-bold mb-4">Reset Password</h3>
                    {resetMessage && <div className={`alert ${resetMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{resetMessage}</div>}

                    {resetStep === 'mobile' && (
                        <>
                            <p className="text-muted mb-3">Enter your mobile number to receive an OTP.</p>
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-light border-0"><FaMobileAlt /></span>
                                <input
                                    type="tel"
                                    className="form-control bg-light border-0 py-2"
                                    placeholder="Mobile Number"
                                    value={resetMobile}
                                    onChange={(e) => setResetMobile(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-danger rounded-pill w-100 fw-bold py-2" onClick={handleSendOtp}>Send OTP</button>
                        </>
                    )}

                    {resetStep === 'otp' && (
                        <>
                            <p className="text-muted mb-3">Enter the 4-digit OTP sent to {resetMobile}.</p>
                            <input
                                type="text"
                                className="form-control bg-light border-0 py-2 mb-3 text-center letter-spacing-2"
                                placeholder="0 0 0 0"
                                maxLength={4}
                                value={resetOtp}
                                onChange={(e) => setResetOtp(e.target.value)}
                            />
                            <button className="btn btn-danger rounded-pill w-100 fw-bold py-2" onClick={handleVerifyOtp}>Verify OTP</button>
                        </>
                    )}

                    {resetStep === 'newPassword' && (
                        <>
                            <p className="text-muted mb-3">Enter your new password.</p>
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-light border-0"><FaLock /></span>
                                <input
                                    type="password"
                                    className="form-control bg-light border-0 py-2"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-danger rounded-pill w-100 fw-bold py-2" onClick={handleResetPassword}>Reset Password</button>
                        </>
                    )}

                    <button className="btn btn-link text-muted mt-3 text-decoration-none" onClick={() => setShowForgotPassword(false)}>Back to Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="bg-white p-5 rounded-5 shadow-sm text-center" style={{ width: '400px' }}>
                <FaPinterest size={48} className="text-danger mb-3" />
                <h2 className="fw-bold mb-4">Welcome to Pinterest</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {lockoutUntil && (
                    <div className="alert alert-warning">
                        Locked out. Try again in {timeLeft} seconds.
                    </div>
                )}

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
                    <button
                        type="button"
                        className="btn btn-link d-block text-start small text-dark fw-bold mb-3 text-decoration-none p-0"
                        onClick={() => setShowForgotPassword(true)}
                    >
                        Forgot your password?
                    </button>

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
