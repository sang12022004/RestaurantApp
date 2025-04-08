import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, User } from '../types/user';

// Cấu hình URL API
const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

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
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/sign-up`, {
        fullname: fullname.trim(),
        email: email.trim(),
        password: password.trim(),
      });
  
      if (response.status === 200 || response.status === 201) {
        return true;
      }
  
      throw new Error(response.data.message || 'Đăng ký thất bại');
    } catch (error: any) {
      // Xử lý email bị trùng
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || '';
  
        if (status === 400 || status === 409) {
          if (message.toLowerCase().includes('email')) {
            throw new Error('Email đã được sử dụng');
          }
        }
  
        throw new Error(message || 'Đăng ký thất bại');
      }
  
      throw new Error('Lỗi không xác định');
    }
  };

  /**
   * Hàm login: Gọi API đăng nhập và lấy thông tin chi tiết user
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const signInResponse = await axios.post(`${API_BASE_URL}/auth/sign-in`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (
        signInResponse.status === 200 &&
        signInResponse.data.statusCode === 'S2000'
      ) {
        throw new Error(
          signInResponse.data.message || 'Email hoặc mật khẩu không đúng'
        );
      } else {
        const tokenData = signInResponse.data.data;
        // Giải mã accessToken để lấy thông tin user
        let decodedToken: { id?: string; fullName?: string; email?: string };
        
        decodedToken = jwtDecode(tokenData.accessToken);
        if (!decodedToken.id) {
           throw new Error('Không thể lấy ID người dùng từ token');
        }

        const userId = decodedToken.id;
        const fallbackUser: User = {
          id: userId,
          fullname: decodedToken.fullName || 'Unknown',
          email: decodedToken.email || email,
          password: '',
          role: 'sales',
          phone: null,
          address: null,
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
          const userResponse = await axios.get(`${API_BASE_URL}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${tokenData.accessToken}`,
            },
          });

          const userObj = userResponse.data.data?.data;
          // Cập nhật thông tin user từ API /users/{id}
          const fetchedUser: User = {
            id: userObj.id || userId,
            fullname: userObj.fullname || decodedToken.fullName || 'Unknown',
            email: userObj.email || decodedToken.email || email,
            password: '',
            role: userObj.role || 'sales',
            phone: userObj.phone || null,
            address: userObj.address || null,
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
        }
        catch (error: any) {
          setUser(fallbackUser);
        }
        setIsLoggedIn(true);
        return true;
      }
    }
    catch (error: any) {
      throw new Error(
        error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.'
      );
    }
  };

  /**
   * Hàm updateUser: Gọi API update
   */
  const updateUser = async (newData: Partial<User>): Promise<boolean> => {
    // Nếu chưa đăng nhập hoặc chưa có user trên context
    if (!user) {
      return false;
    }
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/users/${user.id}`,
        newData
      );
  
      // Kiểm tra điều kiện thành công:
      //   1) response.status === 200
      //   2) response.data.statusCode === 'S2000' (hoặc giá trị do backend quy định)
      if (response.status === 200 && response.data?.statusCode === 'S2000') {
        const updatedUser = response.data.data;
  
        // Cập nhật user trên Context
        setUser({
          id: updatedUser.id,
          fullname: updatedUser.fullname,
          email: updatedUser.email,
          password: '',  // Không trả password về client
          role: updatedUser.role ?? 'sales',
          phone: updatedUser.phone ?? null,
          address: updatedUser.address ?? null,
          nation: updatedUser.nation ?? null,
          refresh_token: updatedUser.refreshToken ?? null,
          refresh_token_exp: updatedUser.refreshTokenExp
            ? new Date(updatedUser.refreshTokenExp)
            : null,
        });
  
        // Đã update thành công
        return true;
      } else {
        // API trả về statusCode hoặc status HTTP không hợp lệ => thất bại
        console.log('API updateUser trả về:', response.data);
        return false;
      }
    } catch (error) {
      // Bắt lỗi nếu có exception từ axios
      console.error('Lỗi trong quá trình updateUser:', error);
      return false;
    }
  };

  /**
   * Hàm đổi mật khẩu
   */
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    if (!user) {
      return false;
    }
    try {
      const response = await axios.put(
        `${API_BASE_URL}/users/change-password/${user.id}`,
        {
          currentPassword,
          newPassword,
        }
      );
      if (
        response.status === 200 &&
        response.data.statusCode === 'S2000'
      ) {
        return true;
      } else {
        throw new Error(response.data.message || 'Đổi mật khẩu thất bại!');
      }
    } catch (error) {
       throw new Error('Mật khẩu cũ chưa chính xác!');
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
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, updateUser, changePassword, logout }}>
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