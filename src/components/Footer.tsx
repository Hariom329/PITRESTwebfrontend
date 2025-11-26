import React from 'react';
import { FaPinterest, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white pt-5 pb-4 mt-5">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-4 mb-4 text-center text-lg-start">
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
                            <FaPinterest size={28} className="text-danger me-2" />
                            <span className="fw-bold fs-4">Pinterest</span>
                        </div>
                        <p className="text-white-50 small mx-auto mx-lg-0" style={{ maxWidth: '300px' }}>
                            Discover recipes, home ideas, style inspiration and other ideas to try.
                        </p>
                    </div>

                    <div className="col-6 col-md-3 col-lg-2 mb-4 text-center text-md-start">
                        <h6 className="fw-bold mb-3 text-white">About</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">About Us</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">Careers</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">Brand</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3 col-lg-2 mb-4 text-center text-md-start">
                        <h6 className="fw-bold mb-3 text-white">Resources</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">Blog</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">Developer</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">Help Center</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 mb-4 text-center text-lg-end">
                        <h6 className="fw-bold mb-3 text-white">Get in touch</h6>
                        <div className="d-flex gap-3 mb-4 justify-content-center justify-content-lg-end">
                            <a href="#" className="text-white-50 hover-text-white transition-all"><FaFacebook size={24} /></a>
                            <a href="#" className="text-white-50 hover-text-white transition-all"><FaTwitter size={24} /></a>
                            <a href="#" className="text-white-50 hover-text-white transition-all"><FaInstagram size={24} /></a>
                        </div>
                        <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
                            <button className="btn btn-outline-light rounded-pill px-3 fw-bold small">English</button>
                            <button className="btn btn-outline-light rounded-pill px-3 fw-bold small">USD</button>
                        </div>
                    </div>
                </div>

                <hr className="my-4 text-white-50 opacity-25" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-white-50">
                    <p className="mb-2 mb-md-0">&copy; 2025 Pinterest Clone. All rights reserved.</p>
                    <div className="d-flex gap-4">
                        <a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">Terms of Service</a>
                        <a href="#" className="text-white-50 text-decoration-none hover-text-white transition-all">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
