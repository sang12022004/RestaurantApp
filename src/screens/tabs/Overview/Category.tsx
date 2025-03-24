import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import CategoryListStyles from "../stylesTabs/CategoryListStyles";

interface CategoryListProps {
  categories: string[];
  addCategory: any;
  removeCategory: any;
}

const allCategories = ["Food", "Drinks", "Dessert", "Vegan", "Fast Food", "BBQ", "Seafood"];

const CategoryList: React.FC<CategoryListProps> = ({ categories, addCategory, removeCategory }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCategory = (category: string) => {
    addCategory(category);
    setModalVisible(false);
  };

  return (
   <>
    <View>
      <Text style={CategoryListStyles.categoryText}>
      Category
      </Text>
    <View style={CategoryListStyles.container}>
      {categories.map((item) => (
        <View key={item} style={CategoryListStyles.categoryItem}>
          <Text style={CategoryListStyles.categoryText}>{item}</Text>
          <TouchableOpacity onPress={() => removeCategory(item)}>
            <Icons name="times" size={16} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={CategoryListStyles.addButton} onPress={() => setModalVisible(true)}>
        <Icons name="plus" size={20} color="black" />
      </TouchableOpacity>
      </View>


      {/* Modal hiển thị danh sách category */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={CategoryListStyles.modalContainer}>
          <View style={CategoryListStyles.modalContent}>
            <Text style={CategoryListStyles.modalTitle}>Chọn danh mục</Text>
            <FlatList
              data={allCategories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={CategoryListStyles.modalItem} onPress={() => handleSelectCategory(item)}>
                  <Text style={CategoryListStyles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={CategoryListStyles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={CategoryListStyles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
};

export default CategoryList;
