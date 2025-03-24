import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.get('https://6724d671c39fedae05b2efb7.mockapi.io/0306221384/TruongDuyTrong/account');
      
      if (response.status === 200) {
        const users = response.data;
        const user = users.find((u: any) => u.username === username && u.password === password);
  
        if (user) {
          setIsLoggedIn(true);
          return true;
        }
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }
    return false;
  };
  

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
