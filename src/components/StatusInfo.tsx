import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StatusInfo = ({ icon, text }) => {
  return (
    <View style={styles.item}>
      <Icon name={icon} size={20} color="black" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default StatusInfo;
