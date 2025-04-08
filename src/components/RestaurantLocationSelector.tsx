import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LocationPicker } from './LocationPicker';
import { MapRouteView } from './MapRouteView';

interface Props {
  initialCoords?: [number, number];
}

const RestaurantLocationSelector: React.FC<Props> = ({ initialCoords }) => {
  const [destination, setDestination] = useState<[number, number] | null>(initialCoords || null);

  const handleAddressSelected = (address: string, coords: [number, number] | null) => {
    setDestination(coords);
  };

  return (
    <View style={styles.container}>
      <LocationPicker onAddressSelected={handleAddressSelected} />
      <View style={styles.mapContainer}>
        <MapRouteView destination={destination} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
});

export default RestaurantLocationSelector;
