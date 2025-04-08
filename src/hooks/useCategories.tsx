import { useState } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  // Thêm một category mới
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  // Xóa một category khỏi danh sách
  const removeCategory = (category: string) => {
    setCategories((prev) => prev.filter((item) => item !== category));
  };

  // Chuyển đổi mảng categories thành chuỗi, phân tách bằng dấu phẩy
  const toString = () => {
    return categories.join(', ');
  };

  // Chuyển chuỗi danh mục thành mảng categories
  const loadFromString = (categoryString: string) => {
    setCategories(categoryString.split(',').map((item) => item.trim()));
  };

  return {
    categories,
    setCategories,
    addCategory,
    removeCategory,
    toString,
    loadFromString,
  };
};
