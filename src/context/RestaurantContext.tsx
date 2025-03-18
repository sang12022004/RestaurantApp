import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu nhà hàng
 interface Restaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  hours: string;
  menu: MenuItem[];
  overview: string;
}

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  category: string;
}

interface RestaurantContextType {
  restaurants: Restaurant[];
}

// Tạo Context
const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// Provider Component
export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "Cơm Tấm Cali",
      address: "852 Trường Sa, Quận 3, Hồ Chí Minh",
      rating: 4.5,
      reviews: 200,
      hours: "6:00 - 22:00",
      overview: "Nhà hàng nổi bật với không gian ấm cúng, đồ ăn ngon, phục vụ chu đáo.",
      menu: [
        { name: "Cơm Tấm Sườn Nướng", price: 45000, category: "Món chính", description: "Sườn nướng mềm thơm, ăn kèm nước mắm đặc trưng." },
        { name: "Bì Chả", price: 40000, category: "Món chính", description: "Bì chả tự làm, hương vị truyền thống." },
        { name: "Trà Tắc", price: 15000, category: "Nước uống" },
      ],
    },
    {
      id: 2,
      name: "Phở Hà Nội",
      address: "123 Nguyễn Trãi, Quận 1, Hồ Chí Minh",
      rating: 4.8,
      reviews: 150,
      hours: "7:00 - 21:00",
      overview: "Phở đậm đà, chuẩn vị Hà Nội giữa lòng Sài Gòn.",
      menu: [
        { name: "Phở Tái Chín", price: 50000, category: "Món chính", description: "Bát phở đầy đặn với nước dùng ngọt thanh." },
        { name: "Nem Rán", price: 30000, category: "Món ăn kèm", description: "Nem rán giòn, chấm kèm nước mắm pha." },
        { name: "Nước Sấu", price: 20000, category: "Nước uống" },
      ],
    },
  ]);

  return (
    <RestaurantContext.Provider value={{ restaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};

// Hook để sử dụng RestaurantContext
export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
