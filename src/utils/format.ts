// utils/format.ts

export const formatTime = (time: string) => {
    if (!time) return "Chưa cập nhật";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };
  
  export const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(parseFloat(amount));
  };
  