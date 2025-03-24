import React, { createContext, useState, useContext, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu nhà hàng
interface Restaurant {
  id: number;
  name: string;
  rating: number;
}

interface RestaurantContextType {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
}

// Tạo Context
const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// Provider Component
export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const addRestaurant = (restaurant: Restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, addRestaurant }}>
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
