import { StyleSheet } from "react-native";

const VisitsCounterStyle = StyleSheet.create({
  counterContainer: { // Container chính của Counter
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginRight: 20,
  },
  counterLabel: { // Label "Visits"
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  counterDisplay: { // Ô hiển thị số đếm
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: { // Số đếm bên trong ô
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: { // Nhóm các nút tăng/giảm
    flexDirection: "column",
    alignItems: "center",
  },
  counterButton: { // Style cho nút bấm
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VisitsCounterStyle;
