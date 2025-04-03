import { useState } from "react";

export const useOverviewLogic = () => {

    // Hàm onPress MicroPhone
    const showAlert = () => {
        window.alert("Microphone pressed!");
      };
      

  // Danh sách danh mục
  const [categories, setCategories] = useState(["Grill", "Hot pot"]);

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };
  

  const removeCategory = (categoryToRemove: string) => {
    setCategories((prevCategories) => prevCategories.filter((cat) => cat !== categoryToRemove));
  };

  // Dropdown States
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWard1, setSelectedWard1] = useState(null);
  const [selectedWard2, setSelectedWard2] = useState(null);
  const [selectedPC, setSelectedPC] = useState(null);

  // Dữ liệu Dropdown
  const cities = [
    { label: "Ho Chi Minh", value: "ho-chi-minh" },
    { label: "Ha Noi", value: "ha-noi" },
  ];

  const wards = [
    { label: "TP Thu Duc", value: "tp-thu-duc" },
    { label: "Quan 1", value: "quan-1" },
    { label: "Quan 7", value: "quan-7" },
  ];

  const subWards = [
    { label: "Truong Tho", value: "truong-tho" },
    { label: "Linh Dong", value: "linh-dong" },
    { label: "Binh Tho", value: "binh-tho" },
  ];

  const pcList = [
    { label: "PC 1", value: "pc_1" },
    { label: "PC 2", value: "pc_2" },
    { label: "PC 3", value: "pc_3" },
  ];

  return {
    showAlert,
    categories,
    addCategory,
    removeCategory,
    selectedCity,
    setSelectedCity,
    selectedWard1,
    setSelectedWard1,
    selectedWard2,
    setSelectedWard2,
    selectedPC,
    setSelectedPC,
    cities,
    wards,
    subWards,
    pcList,
  };
};