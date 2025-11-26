import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    username: string;
    name: string;
    avatar: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => boolean;
    logout: () => void;
    signup: (email: string, password: string, username: string, age: number) => boolean;
    checkEmailExists: (email: string) => boolean;
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

    const checkEmailExists = (email: string): boolean => {
        const users = JSON.parse(localStorage.getItem('pinterest_users_db') || '[]');
        return users.some((u: any) => u.email === email);
    };

    const login = (email: string): boolean => {
        // For mock purposes, we'll allow login if the user exists in our "db" or if it's a test user
        const users = JSON.parse(localStorage.getItem('pinterest_users_db') || '[]');
        const foundUser = users.find((u: any) => u.email === email);

        if (foundUser) {
            const userObj = {
                username: foundUser.username,
                name: foundUser.username, // Use username as name for now
                avatar: 'https://i.pravatar.cc/150?u=' + foundUser.username,
                email: foundUser.email
            };
            setUser(userObj);
            localStorage.setItem('pinterest_user', JSON.stringify(userObj));
            return true;
        }

        // Fallback for previous mock implementation (optional, can be removed if strict)
        if (email.includes('@')) {
            const userObj = {
                username: email.split('@')[0],
                name: 'Test User',
                avatar: 'https://i.pravatar.cc/150?u=me',
                email: email
            };
            setUser(userObj);
            localStorage.setItem('pinterest_user', JSON.stringify(userObj));
            return true;
        }

        return false;
    };

    const signup = (email: string, password: string, username: string, age: number): boolean => {
        if (checkEmailExists(email)) {
            return false;
        }

        const newUser = { email, password, username, age };
        const users = JSON.parse(localStorage.getItem('pinterest_users_db') || '[]');
        users.push(newUser);
        localStorage.setItem('pinterest_users_db', JSON.stringify(users));

        // Auto login
        return login(email);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pinterest_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup, checkEmailExists }}>
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
