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
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Protected Routes */}
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Navbar />
                                <Home />
                            </ProtectedRoute>
                        } />
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
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
// Rebuild trigger
