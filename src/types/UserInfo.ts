export interface UserInfo {
    idPerson: string;
    surname: string;
    lastName: string;
    phone: string;
    email: string;
    birthdate: string;
    gender: number;
  }
  
  export interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInfo | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (newData: Partial<UserInfo>) => void;
  }
  