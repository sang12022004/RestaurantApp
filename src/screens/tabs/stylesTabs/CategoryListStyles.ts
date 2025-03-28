import { StyleSheet } from "react-native";

const CategoryListStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  categoryTitle: { 
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 15,
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    marginRight: 5,
    fontWeight: "bold",
  },
  addButton: {
    borderColor: "black",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",

  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
   
  },
  modalItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 15, 
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    margin: 5,
    minWidth: 100,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ff5555",
    borderRadius: 8,
    left:100
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CategoryListStyles;
