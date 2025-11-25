import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    username: string;
    name: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string) => void;
    logout: () => void;
    signup: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('pinterest_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username: string) => {
        const newUser = {
            username,
            name: 'Test User',
            avatar: 'https://i.pravatar.cc/150?u=me'
        };
        setUser(newUser);
        localStorage.setItem('pinterest_user', JSON.stringify(newUser));
    };

    const signup = (username: string) => {
        login(username); // Auto login after signup for now
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pinterest_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
