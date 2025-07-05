
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: 'admin' | 'user' | 'manager') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Jane Manager',
    email: 'manager@example.com',
    role: 'manager',
  },
  {
    id: '3',
    name: 'Bob User',
    email: 'user@example.com',
    role: 'user',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('AuthProvider mounted, checking localStorage');
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('Found saved user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    } else {
      console.log('No saved user found');
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Attempting login with:', email, password);
    
    // Accept password "password" for any email, or match our mock users
    let foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser && password === 'password') {
      // Create a user for any email with correct password
      foundUser = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email,
        role: 'user',
      };
    }
    
    if (foundUser && password === 'password') {
      console.log('Login successful for:', foundUser);
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      console.error('Invalid credentials');
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const switchRole = (role: 'admin' | 'user' | 'manager') => {
    if (user) {
      const updatedUser = { ...user, role };
      console.log('Switching role to:', role);
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const contextValue = { user, login, logout, switchRole };
  console.log('AuthProvider rendering with user:', user);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error('useAuth called outside of AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
