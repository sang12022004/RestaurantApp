import { useState, useEffect } from "react";
import axios from "axios";
import { Restaurant } from "../types/restaurantTypes";

const API_URL = "http://10.0.2.2:8080/api/v1/restaurants";

export const useRestaurantDetail = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`${API_URL}/${id}`)
      .then((response) => {
        if (response.data && response.data.statusCode === "S2000") {
          const rawData = response.data.data.data; // Lấy dữ liệu thực tế từ API

          const formattedData: Restaurant = {
            id: rawData.id,
            name: rawData.name,
            code: rawData.code,
            phone: rawData.phone,
            email: rawData.email,
            open_time: rawData.open_time,
            close_time: rawData.close_time,
            lowest_avg_cost: rawData.lowest_avg_cost,
            highest_avg_cost: rawData.highest_avg_cost,
            categories: rawData.categories,
            facebook: rawData.facebook || "",
            instagram: rawData.instagram || "",
            website: rawData.website || "",
            note: rawData.note || "",
            is_verified: rawData.is_verified,
            address: rawData.address || "Chưa cập nhật",
            partnership: rawData.partnership || null,
            createdAt: rawData.createdAt,
            updatedAt: rawData.updatedAt,
            image: rawData.image || "https://via.placeholder.com/150", 
            rating: rawData.is_verified ? 5 : 4, // Giả sử nếu verified thì 5 sao
          };

          setRestaurant(formattedData);
        } else {
          setError("Không thể tải thông tin nhà hàng.");
        }
      })
      .catch((err) => {
        setError("Lỗi khi fetch chi tiết nhà hàng.");
        console.error("Lỗi khi fetch chi tiết nhà hàng:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);



    // Hàm cập nhật nhà hàng
    const updateRestaurant = async (updatedRestaurantData: Restaurant) => {
      if (!restaurant?.id) {
        setError("Không có nhà hàng để cập nhật.");
        return;
      }
      setLoading(true);
      await axios.put(`${API_URL}/${restaurant.id}`, updatedRestaurantData);
    };

  return { restaurant, loading, error ,updateRestaurant};
};
