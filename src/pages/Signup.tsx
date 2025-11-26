import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPinterest, FaFacebook, FaGoogle, FaChevronDown } from 'react-icons/fa';
import Footer from '../components/Footer';

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80',
    'https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?w=500&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    'https://images.unsplash.com/photo-1529139574466-a302d2d3f524?w=500&q=80',
    'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
];

const HERO_TEXTS = [
    { text: "outfit idea", color: "#496d56" }, // Green
    { text: "home decor idea", color: "#618c7b" }, // Teal/Sage
    { text: "DIY project", color: "#0076d3" }, // Blue
    { text: "dinner recipe", color: "#c28b00" }, // Gold/Orange
];

const Signup: React.FC = () => {
    // Signup Form State
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { signup, checkEmailExists } = useAuth();
    const navigate = useNavigate();
    const signupSectionRef = React.useRef<HTMLDivElement>(null);

    // Hero Animation State
    const [activeTextIndex, setActiveTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTextIndex((prev) => (prev + 1) % HERO_TEXTS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in)$/;
        if (!email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';
        else if (checkEmailExists(email)) newErrors.email = 'Email already taken';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password too short';

        if (!birthdate) newErrors.age = 'Birthdate is required';
        else {
            const today = new Date();
            const birthDate = new Date(birthdate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 13) newErrors.age = 'You must be at least 13 years old';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const today = new Date();
            const birthDate = new Date(birthdate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const success = signup(email, password, username || email.split('@')[0], age);
            if (success) navigate('/');
        }
    };

    const scrollToSignup = () => {
        signupSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <header className="fixed-top bg-white py-3 px-4 d-flex justify-content-between align-items-center shadow-sm" style={{ zIndex: 1000 }}>
                <div className="d-flex align-items-center gap-2">
                    <FaPinterest size={32} className="text-danger" />
                    <span className="fw-bold fs-5 text-danger d-none d-md-block">Pinterest</span>
                    <nav className="d-none d-md-flex gap-4 ms-4">
                        <a href="#" className="text-dark text-decoration-none fw-bold small">About</a>
                        <a href="#" className="text-dark text-decoration-none fw-bold small">Business</a>
                        <a href="#" className="text-dark text-decoration-none fw-bold small">Blog</a>
                    </nav>
                </div>
                <div className="d-flex gap-2">
                    <Link to="/login" className="btn btn-danger rounded-pill fw-bold px-3">Log in</Link>
                    <button className="btn btn-light rounded-pill fw-bold px-3 bg-secondary bg-opacity-10" onClick={scrollToSignup}>Sign up</button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="position-relative overflow-hidden pt-5 mt-5" style={{ height: '90vh' }}>
                {/* Text Overlay */}
                <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ zIndex: 10, width: '100%' }}>
                    <h1 className="display-3 fw-bold mb-3">Get your next</h1>
                    <h1 className="display-3 fw-bold mb-5 landing-hero-text" style={{ color: HERO_TEXTS[activeTextIndex].color }}>
                        {HERO_TEXTS[activeTextIndex].text}
                    </h1>
                    <div className="d-flex justify-content-center gap-2 mb-5">
                        {HERO_TEXTS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`rounded-circle transition-all ${idx === activeTextIndex ? 'bg-dark' : 'bg-secondary bg-opacity-25'}`}
                                style={{ width: '10px', height: '10px' }}
                            />
                        ))}
                    </div>
                    <FaChevronDown size={32} className="text-dark animate-bounce" />
                </div>

                {/* Scrolling Columns */}
                <div className="container-fluid h-100 px-0">
                    <div className="row g-3 h-100 justify-content-center opacity-50">
                        {[0, 1, 2, 3, 4, 5, 6].map((colIndex) => (
                            <div key={colIndex} className="col-2 d-none d-md-block overflow-hidden h-100 position-relative">
                                <div className={`d-flex flex-column gap-3 position-absolute w-100 ${colIndex % 2 === 0 ? 'animate-scroll-up' : 'animate-scroll-down'}`} style={{ top: colIndex % 2 === 0 ? '0' : '-50%' }}>
                                    {[...HERO_IMAGES, ...HERO_IMAGES].map((img, imgIdx) => (
                                        <img
                                            key={imgIdx}
                                            src={`${img}&random=${colIndex * 10 + imgIdx}`}
                                            className="w-100 rounded-4"
                                            style={{ height: '300px', objectFit: 'cover' }}
                                            alt=""
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fade Overlay */}
                <div className="position-absolute bottom-0 start-0 w-100 h-25 bg-gradient-to-t from-white to-transparent" style={{ background: 'linear-gradient(to top, white, transparent)' }}></div>
            </div>

            {/* Feature 1: Search */}
            <div className="py-5 bg-light" style={{ minHeight: '80vh' }}>
                <div className="container h-100 d-flex align-items-center">
                    <div className="row w-100 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-5 mb-md-0">
                            <h2 className="display-4 fw-bold mb-4" style={{ color: '#c28b00' }}>Search for an idea</h2>
                            <p className="lead text-muted mb-4" style={{ maxWidth: '400px' }}>
                                What do you want to try next? Think of something you're into—like "easy chicken dinner"—and see what you find.
                            </p>
                            <button className="btn btn-danger rounded-pill px-4 py-2 fw-bold" onClick={scrollToSignup}>Join now</button>
                        </div>
                        <div className="col-md-6">
                            <div className="position-relative">
                                <div className="bg-white p-3 rounded-5 shadow-lg" style={{ transform: 'rotate(-5deg)', width: '300px', margin: '0 auto' }}>
                                    <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80" className="w-100 rounded-4 mb-2" alt="Chicken" />
                                    <h5 className="fw-bold mb-0">Easy chicken dinner</h5>
                                </div>
                                <div className="bg-white p-3 rounded-5 shadow-lg position-absolute top-50 start-50" style={{ transform: 'translate(-20%, -20%) rotate(5deg)', width: '250px', zIndex: -1 }}>
                                    <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80" className="w-100 rounded-4 mb-2" alt="Chicken" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature 2: Save */}
            <div className="py-5 bg-white" style={{ minHeight: '80vh' }}>
                <div className="container h-100 d-flex align-items-center">
                    <div className="row w-100 align-items-center flex-row-reverse">
                        <div className="col-md-6 text-center text-md-start mb-5 mb-md-0 ps-md-5">
                            <h2 className="display-4 fw-bold mb-4" style={{ color: '#0076d3' }}>Save ideas you like</h2>
                            <p className="lead text-muted mb-4" style={{ maxWidth: '400px' }}>
                                Collect your favorites so you can get back to them later.
                            </p>
                            <button className="btn btn-danger rounded-pill px-4 py-2 fw-bold" onClick={scrollToSignup}>Join now</button>
                        </div>
                        <div className="col-md-6">
                            <div className="row g-3">
                                <div className="col-4 mt-5"><img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300" className="w-100 rounded-4 shadow-sm" alt="" /></div>
                                <div className="col-4"><img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300" className="w-100 rounded-4 shadow-sm" alt="" /></div>
                                <div className="col-4 mt-4"><img src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=300" className="w-100 rounded-4 shadow-sm" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature 3: See it happen (Signup) */}
            <div ref={signupSectionRef} className="d-flex min-vh-100 bg-black overflow-hidden position-relative">
                {/* Left Side - Collage & Text */}
                <div className="flex-grow-1 position-relative d-none d-lg-block overflow-hidden">
                    {/* Background Collage */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
                        <div className="row g-3 opacity-50" style={{ transform: 'rotate(-15deg) scale(1.5)', width: '150%', marginLeft: '-25%', marginTop: '-10%' }}>
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className="col-4">
                                    <img src={`${HERO_IMAGES[i % HERO_IMAGES.length]}&random=${i + 200}`} className="w-100 rounded-4 mb-3" alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Text Overlay */}
                    <div className="position-absolute top-50 start-50 translate-middle text-white text-center w-100 px-4" style={{ zIndex: 10 }}>
                        <h1 className="display-1 fw-bold mb-0" style={{ fontSize: '4.5rem', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>Sign up to get<br />your ideas</h1>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="bg-white p-5 d-flex flex-column justify-content-center position-relative shadow-lg" style={{ width: '100%', maxWidth: '500px', zIndex: 20 }}>
                    <div className="mx-auto w-100" style={{ maxWidth: '380px' }}>
                        <div className="text-center mb-4">
                            <FaPinterest size={48} className="text-danger mb-2" />
                            <h2 className="fw-bold mb-2 fs-1">Welcome to Pinterest</h2>
                            <p className="text-muted fs-6">Find new ideas to try</p>
                        </div>

                        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Email</label>
                                <input
                                    type="email"
                                    className={`form-control form-control-lg rounded-4 fs-6 ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Password</label>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg rounded-4 fs-6 ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">Birthdate</label>
                                <input
                                    type="date"
                                    className={`form-control form-control-lg rounded-4 fs-6 ${errors.age ? 'is-invalid' : ''}`}
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                />
                                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                            </div>

                            <button type="submit" className="btn btn-danger rounded-pill w-100 fw-bold py-3 mb-3 fs-6">Continue</button>
                        </form>

                        <div className="fw-bold text-muted text-center mb-3 small">OR</div>

                        <button className="btn btn-primary rounded-pill w-100 fw-bold py-2 mb-2 d-flex align-items-center justify-content-center gap-2 fs-6">
                            <FaFacebook size={20} /> Continue with Facebook
                        </button>
                        <button className="btn btn-light border rounded-pill w-100 fw-bold py-2 mb-4 d-flex align-items-center justify-content-center gap-2 fs-6">
                            <FaGoogle size={20} /> Continue with Google
                        </button>

                        <p className="small text-muted text-center" style={{ fontSize: '0.75rem' }}>
                            By continuing, you agree to Pinterest's <Link to="#" className="text-dark fw-bold text-decoration-none">Terms of Service</Link> and acknowledge you've read our <Link to="#" className="text-dark fw-bold text-decoration-none">Privacy Policy</Link>.
                        </p>

                        <hr className="my-4" />

                        <p className="small fw-bold text-center mb-0">
                            Already a member? <Link to="/login" className="text-dark text-decoration-none">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Signup;
