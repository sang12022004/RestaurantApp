import { useState, useEffect } from 'react';
import { getMenuById } from '../api/tabs/menuApi'; // Import hàm API đã viết

const useMenuData = (restaurantId:any) => {
  const [menu, setMenu] = useState(null); // Lưu trữ dữ liệu menu
  const [loading, setLoading] = useState(true); // Trạng thái đang tải
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const data = await getMenuById(restaurantId); // Gọi API
        setMenu(data[0]?.menu || null); // Lưu dữ liệu vào state
      } catch (err) {
        setError('Không thể tải dữ liệu menu.'); // Xử lý lỗi
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchMenu(); // Gọi API khi có restaurantId
    }
  }, [restaurantId]); // Chạy lại khi restaurantId thay đổi

  return { menu, loading, error }; // Trả về dữ liệu và trạng thái
};

export default useMenuData;