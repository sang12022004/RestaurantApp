import { useState, useEffect } from "react";
import axios from "axios";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  address: string;
  
}

const API_URL = "https://67241832493fac3cf24d1d33.mockapi.io/0306221306/VanNamCao/restaurantlist";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        console.log("Dữ liệu từ API:", response.data); // Debug dữ liệu trả về từ API
        setRestaurants(response.data);
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