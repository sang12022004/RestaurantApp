import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

// Kiểu dữ liệu User
interface UserInfo {
  idPerson: string;
  surname: string;
  lastName: string;
  phone: string;
  email: string;
  birthdate: string;
  gender: number;
}

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInfo | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.get('http://10.0.2.2/IOT_ConnectMart_API/api/account/read.php');
      
      if (response.status === 200) {
        const accounts  = response.data;
        const foundAccount  = accounts .find((u: any) => u.username === username && u.password === password);
  
        if (foundAccount ) {
          // Lấy idPerson
          const { idPerson } = foundAccount;
          const resCustomer = await axios.get(`http://10.0.2.2/IOT_ConnectMart_API/api/customer/show.php?id=${idPerson}`);
          if (resCustomer.status === 200) {
            const customer = resCustomer.data;
            // => Lưu user (kết hợp account + customer)
            setIsLoggedIn(true);
            setUser({
              idPerson,
              surname: customer.surname,
              lastName: customer.lastName,
              phone: customer.phone,
              email: customer.email,
              birthdate: customer.birthdate,
              gender: customer.gender,
            });
            return true; // Đăng nhập thành công
          }
        }
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }
    return false;
  };
  

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
