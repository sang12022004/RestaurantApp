import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SearchBarStyles from '../styles/SearchBar';

const SearchBar = ({ onSearch }: { onSearch: (text: string) => void }) => {
  const [searchText, setSearchText] = useState('');

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onSearch(text); // Gọi hàm onSearch khi nhập vào ô tìm kiếm
  };

  return (
    <View style={SearchBarStyles.container}>
      <TextInput
        style={SearchBarStyles.input}
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

export default SearchBar;
