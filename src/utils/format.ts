// utils/format.ts

export const formatTime = (time: string) => {
    if (!time) return "Chưa cập nhật";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };
  
  export const formatCurrency = (amount: string) => {
    const value = parseFloat(amount);
    if (isNaN(value)) return "0";
  
    return `${Math.round(value / 1000)}k`;
  };
  