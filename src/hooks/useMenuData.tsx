import { useState, useEffect } from 'react';
import { getMenuById } from '../api/tabs/menuApi'; // Import hàm API đã viết

const useMenuData = (restaurantId) => {
  const [menu, setMenu] = useState(null); // Lưu trữ dữ liệu menu
  const [loading, setLoading] = useState(true); // Trạng thái đang tải
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true); // Bắt đầu tải
      setError(null); // Xóa lỗi trước đó (nếu có)
      try {
        const data = await getMenuById(restaurantId); // Gọi API theo id
        setMenu(data); // Cập nhật dữ liệu menu
      } catch (err) {
        setError(err.message); // Cập nhật lỗi nếu xảy ra
      } finally {
        setLoading(false); // Hoàn thành tải
      }
    };

    if (restaurantId) {
      fetchMenu(); // Gọi API khi có restaurantId
    }
  }, [restaurantId]); // Chạy lại khi restaurantId thay đổi

  return { menu, loading, error }; // Trả về dữ liệu và trạng thái
};

export default useMenuData;