import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, Image, StyleSheet } from 'react-native';
import Tabs from '../components/Tabs';
import OverviewContent from '../components/OverviewContent';

const DetailRestaurant = ({ route }:any) => {
  const { restaurant } = route.params;
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewContent />;
      case 'Menu':
        return restaurant.menu.map((menuItem:any, index:any) => (
          <Text key={index} style={styles.text}>
            {menuItem.name} - {menuItem.price} VND
          </Text>
        ));
      case 'Reviews':
        return (
          <>
            <Text style={styles.text}>"Excellent service and presentation!" - 5 stars</Text>
            <Text style={styles.text}>"Reasonable prices, lovely space." - 4 stars</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image source={{ uri: 'https://placehold.co/600x700' }} style={styles.imageRestaurant} />
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.titleRestaurant}>{restaurant.name}</Text>
          <Text style={styles.addressRestaurant}>{restaurant.address}</Text>
        </View>
        <Tabs tabs={['Overview', 'Menu', 'Reviews']} activeTab={activeTab} setActiveTab={setActiveTab} />
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {renderTabContent()}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageRestaurant: { width: '100%', height: 200, backgroundColor: 'pink',marginTop:40},
  mainContent: { flex: 1, top:-50,backgroundColor: '#fff', margin: 10},
  header: { alignItems: 'center',marginTop:10},
  titleRestaurant: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  addressRestaurant: { fontSize: 16, color: 'black' },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  text: { fontSize: 16, marginBottom: 5 },
});

export default DetailRestaurant;
