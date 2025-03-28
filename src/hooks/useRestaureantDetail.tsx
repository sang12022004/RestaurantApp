import { useState, useEffect } from "react";
import axios from "axios";
import { Restaurant } from "../types/restaurantTypes";

const API_URL = "https://67241832493fac3cf24d1d33.mockapi.io/0306221306/VanNamCao/restaurantlist";

export const useRestaurantDetail = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`${API_URL}/${id}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((err) => {
        setError("Không thể tải thông tin nhà hàng.");
        console.error("Lỗi khi fetch chi tiết nhà hàng:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { restaurant, loading, error };
};
