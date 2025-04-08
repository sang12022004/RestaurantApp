import { StyleSheet } from "react-native";

const CategoryListStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    borderBottomWidth:2,
    marginBottom:20
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    margin: 4,
  },
  categoryText: {
    fontSize: 16,
    marginRight: 6,
  },
  addButton: {
    position:'absolute',
    right:0,
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  categoryWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  modalItem: {
    width: "45%",
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f33",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CategoryListStyles;
