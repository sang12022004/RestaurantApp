import { useState, useEffect } from "react";
import axios from "axios";

export interface Restaurant {
  id: string;
  name: string;
  image?: string;  // Có thể không có
  rating?: number; // Có thể không có
  address?: string | null;
}

const API_URL = "http://10.0.2.2:8080/api/v1/restaurants";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log("Dữ liệu từ API:", response.data); // Kiểm tra API trả về
  
        if (response.data?.data?.data) {
          const formattedRestaurants = response.data.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image || "https://via.placeholder.com/150",
            rating: item.rating || 0,
            address: item.address || "Chưa có địa chỉ",
          }));
  
          console.log("Danh sách sau khi format:", formattedRestaurants); // Debug dữ liệu format
          setRestaurants(formattedRestaurants);
        } else {
          throw new Error("Dữ liệu API không hợp lệ");
        }
      })
      .catch((err) => {
        setError("Không thể tải danh sách nhà hàng.");
        console.error("Lỗi khi fetch API:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  return { restaurants, loading, error };
};
