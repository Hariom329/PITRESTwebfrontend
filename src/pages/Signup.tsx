import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPinterest, FaFacebook, FaGoogle } from 'react-icons/fa';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { signup } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (!age) newErrors.age = 'Age is required';
        else if (parseInt(age) < 13) newErrors.age = 'You must be at least 13 years old';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            signup(email.split('@')[0]);
            navigate('/');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="bg-white p-5 rounded-5 shadow-sm text-center" style={{ width: '400px' }}>
                <FaPinterest size={48} className="text-danger mb-3" />
                <h2 className="fw-bold mb-2">Welcome to Pinterest</h2>
                <p className="text-muted mb-4">Find new ideas to try</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-2 text-start">
                        <label className="form-label small fw-bold">Email</label>
                        <input
                            type="email"
                            className={`form-control rounded-pill py-2 ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-2 text-start">
                        <label className="form-label small fw-bold">Password</label>
                        <input
                            type="password"
                            className={`form-control rounded-pill py-2 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-2 text-start">
                        <label className="form-label small fw-bold">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control rounded-pill py-2 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                    <div className="mb-3 text-start">
                        <label className="form-label small fw-bold">Age</label>
                        <input
                            type="number"
                            className={`form-control rounded-pill py-2 ${errors.age ? 'is-invalid' : ''}`}
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                    </div>

                    <button type="submit" className="btn btn-danger rounded-pill w-100 fw-bold py-2 mb-3">Continue</button>
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
                    Already a member? <Link to="/login" className="text-dark text-decoration-none">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
