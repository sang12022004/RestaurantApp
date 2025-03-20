import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginTop:30,
  },
  tab: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth:2,
  },
  tabButtonActive: {
   backgroundColor:'aqua'
  },
  activeTab: {
  },
});

export default Tabs;
