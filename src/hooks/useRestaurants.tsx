import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface Restaurant {
  id: string;
  name: string;
  image?: string;
  rating?: number;
  address?: string | null;
}

const API_URL = "http://10.0.2.2:8080/api/v1/restaurants";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch dữ liệu
  const fetchRestaurants = useCallback(() => {
    setLoading(true);
    setError(null);  // Reset lỗi mỗi khi refetch

    axios
      .get(API_URL)
      .then((response) => {
        console.log("Dữ liệu từ API:", response.data);

        if (response.data?.data?.data) {
          const formattedRestaurants = response.data.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image || "https://via.placeholder.com/150",
            rating: item.rating || 0,
            address: item.address || "Chưa có địa chỉ",
          }));

          console.log("Danh sách sau khi format:", formattedRestaurants);
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

  // Chỉ gọi fetchRestaurants khi component được mount lần đầu tiên
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Trả về refetch function để gọi lại khi cần
  return { restaurants, loading, error, refetch: fetchRestaurants };
};
