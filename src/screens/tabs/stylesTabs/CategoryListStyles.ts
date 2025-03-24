import { StyleSheet } from "react-native";

const CategoryListStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  titleCategories: {
    flex: 1,
    fontWeight: "bold",
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
    position: "absolute",
    borderColor: "black",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    right: 0,
  },
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
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff5555",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CategoryListStyles;
