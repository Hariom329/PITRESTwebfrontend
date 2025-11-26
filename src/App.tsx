import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PinPage from './pages/PinPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePin from './pages/CreatePin';
import BoardDetail from './pages/BoardDetail';
import SearchPage from './pages/SearchPage';
import Notifications from './pages/Notifications';
import BusinessExplorer from './pages/BusinessExplorer';
import SponsoredExplorer from './pages/SponsoredExplorer';
import CreateBoard from './pages/CreateBoard';
import { AuthProvider, useAuth } from './context/AuthContext';

import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {children}
            <Footer />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Root Route: Landing Page (Signup) if guest, Home if auth */}
                        <Route path="/" element={
                            <AuthWrapper>
                                <Navbar />
                                <Home />
                            </AuthWrapper>
                        } />

                        {/* Protected Routes */}
                        <Route path="/pin/:id" element={
                            <ProtectedRoute>
                                <Navbar />
                                <PinPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/profile/:userId" element={
                            <ProtectedRoute>
                                <Navbar />
                                <ProfilePage />
                            </ProtectedRoute>
                        } />
                        <Route path="/create" element={
                            <ProtectedRoute>
                                <Navbar />
                                <CreatePin />
                            </ProtectedRoute>
                        } />
                        <Route path="/board/:id" element={
                            <ProtectedRoute>
                                <Navbar />
                                <BoardDetail />
                            </ProtectedRoute>
                        } />
                        <Route path="/search" element={
                            <ProtectedRoute>
                                <Navbar />
                                <SearchPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/notifications" element={
                            <ProtectedRoute>
                                <Navbar />
                                <Notifications />
                            </ProtectedRoute>
                        } />
                        <Route path="/business" element={
                            <ProtectedRoute>
                                <Navbar />
                                <BusinessExplorer />
                            </ProtectedRoute>
                        } />
                        <Route path="/shop" element={
                            <ProtectedRoute>
                                <Navbar />
                                <SponsoredExplorer />
                            </ProtectedRoute>
                        } />
                        <Route path="/create-board" element={
                            <ProtectedRoute>
                                <Navbar />
                                <CreateBoard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

// Wrapper to handle Root Route logic
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Signup />;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {children}
            <Footer />
        </div>
    );
};

export default App;
