import React from 'react';
import { Text } from 'react-native';
import { Restaurant } from '../../types/restaurantTypes';
import RestaurantDetailStyles from '../../styles/RestaurantDetailStyles';
import OverviewContent from './Overview/Overview';

interface RestaurantTabContentProps {
  activeTab: string;
  restaurant: Restaurant;
}

const RestaurantTabContent: React.FC<RestaurantTabContentProps> = ({ activeTab, restaurant }) => {
  switch (activeTab) {
    case 'Overview':
      return <OverviewContent />;
    case 'Menu':
      return (
        <>
          {restaurant.dishes.map((menuItem, index) => (
            <Text key={index} style={RestaurantDetailStyles.text}>
              {menuItem.name} - {menuItem.price} VND
            </Text>
          ))}
        </>
      );
    case 'Reviews':
      return (
        <>
          <Text style={RestaurantDetailStyles.text}>"Excellent service and presentation!" - 5 stars</Text>
          <Text style={RestaurantDetailStyles.text}>"Reasonable prices, lovely space." - 4 stars</Text>
        </>
      );
    default:
      return null;
  }
};

export default RestaurantTabContent;
