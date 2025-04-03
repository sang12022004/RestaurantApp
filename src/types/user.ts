
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
export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  register: (
    fullname: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  updateUser: (newData: Partial<User>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  logout: () => void;
}