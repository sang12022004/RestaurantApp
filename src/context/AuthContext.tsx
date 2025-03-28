import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Cấu hình URL API
const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

// Interface cho User
export interface User {
  id: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  email: string;
  password: string;
  role: 'admin' | 'sales';
  avatar: string | null;
  nation: string | null;
  refresh_token: string | null;
  refresh_token_exp: Date | null;
}

// Kiểu dữ liệu cho AuthContext
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  register: (
    fullname: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /**
   * Hàm register: Gửi request đăng ký tài khoản
   */
  const register = async (
    fullname: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    if (!fullname || !email || !password || !confirmPassword) {
      throw new Error('Vui lòng nhập đầy đủ thông tin');
    }
    if (password !== confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/sign-up`, {
        fullname: fullname.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Đăng ký thành công:', response.data);
        return true;
      }
      throw new Error(response.data.message || 'Đăng ký thất bại');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lỗi khi đăng ký');
    }
  };

  /**
   * Hàm login: Gọi API đăng nhập và lấy thông tin chi tiết user
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        throw new Error('Vui lòng nhập đầy đủ email và mật khẩu');
      }

      console.log('Gọi API /auth/sign-in');
      const signInResponse = await axios.post(`${API_BASE_URL}/auth/sign-in`, {
        email: email.trim(),
        password: password.trim(),
      });

      console.log('Phản hồi từ /auth/sign-in:', signInResponse.data);

      // Kiểm tra HTTP status và statusCode để xác định thành công
      if (
        signInResponse.status === 200 &&
        signInResponse.data.statusCode === 'S2000'
      ) {
        throw new Error(
          signInResponse.data.message || 'Email hoặc mật khẩu không đúng'
        );
      } else {
        
        console.log('Đăng nhập thành công:', signInResponse.data);
        const tokenData = signInResponse.data.data;

        if (!tokenData?.accessToken || !tokenData?.refreshToken) {
          throw new Error('Dữ liệu token không hợp lệ');
        }

        // Giải mã accessToken để lấy thông tin user
        let decodedToken: { id?: string; fullName?: string; email?: string };
        try {
          decodedToken = jwtDecode(tokenData.accessToken);
          if (!decodedToken.id) {
            throw new Error('Không thể lấy ID người dùng từ token');
          }
        } catch (error) {
          console.error('Lỗi khi giải mã token:', error);
          throw new Error('Token không hợp lệ');
        }

        const userId = decodedToken.id;
        const fallbackUser: User = {
          id: userId,
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
          fullname: decodedToken.fullName || 'Unknown',
          email: decodedToken.email || email,
          password: '',
          role: 'sales',
          avatar: null,
          nation: null,
          refresh_token: tokenData.refreshToken,
          refresh_token_exp: tokenData.accessTokenExp
            ? new Date(
                Date.now() +
                  parseInt(tokenData.accessTokenExp.replace('s', '')) * 1000
              )
            : null,
        };

        // Gọi API /users/{id} để lấy thông tin chi tiết user
        try {
          console.log('Gọi API /users/', userId);
          const userResponse = await axios.get(`${API_BASE_URL}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${tokenData.accessToken}`,
            },
          });

          console.log('Phản hồi từ /users/', userId, ':', userResponse.data);

          if (
            userResponse.status !== 200 ||
            userResponse.data.statusCode !== 'S2000'
          ) {
            throw new Error(
              userResponse.data.message || 'Không thể lấy thông tin người dùng'
            );
          }

          const userObj = userResponse.data.data?.data;
          if (!userObj || typeof userObj !== 'object') {
            throw new Error('Dữ liệu user không hợp lệ');
          }

          // Cập nhật thông tin user từ API /users/{id}
          const fetchedUser: User = {
            id: userObj.id || userId,
            deleted: userObj.deleted || false,
            created_at: new Date(userObj.createdAt || Date.now()),
            updated_at: new Date(userObj.updatedAt || Date.now()),
            fullname: userObj.fullname || decodedToken.fullName || 'Unknown',
            email: userObj.email || decodedToken.email || email,
            password: '',
            role: userObj.role || 'sales',
            avatar: userObj.avatar || null,
            nation: userObj.nation || null,
            refresh_token: tokenData.refreshToken,
            refresh_token_exp: tokenData.accessTokenExp
              ? new Date(
                  Date.now() +
                    parseInt(tokenData.accessTokenExp.replace('s', '')) * 1000
                )
              : null,
          };

          setUser(fetchedUser);
          console.log('User từ API /users:', fetchedUser);
        } catch (error: any) {
          console.error('Lỗi khi lấy thông tin user từ /users:', error.message, error.response?.data);
          // Nếu không lấy được thông tin từ /users/{id}, sử dụng thông tin từ token
          setUser(fallbackUser);
          console.log('User từ fallback:', fallbackUser);
        }

        setIsLoggedIn(true);
        console.log('Đăng nhập thành công, isLoggedIn:', true);
        return true;
      }
    } catch (error: any) {
      console.error('Lỗi khi đăng nhập:', error.message, error.response?.data);
      throw new Error(
        error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.'
      );
    }
  };

  /**
   * Hàm logout: Xóa thông tin người dùng và cập nhật trạng thái
   */
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};

export default AuthProvider;