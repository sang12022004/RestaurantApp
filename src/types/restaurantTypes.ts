export type Dish = {
    id: string;
    name: string;
    image: string;
    price: string;
  };
  
  export type Restaurant = {
    id: string;
    name: string;
    image: string;
    rating: number;
    address: string;
    dishes: Dish[];
  };