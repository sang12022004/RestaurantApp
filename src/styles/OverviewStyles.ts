import { StyleSheet } from 'react-native';
const Overview = StyleSheet.create({
    container: {
        padding: 16,
      },
      section: {
        marginBottom: 16,
      },
      formRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
      },
      containerDropdown: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      reviews: {
        borderBottomWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
      }, 
      item: {
        flexDirection: "row",
        alignItems: "center",
        lineHeight: 24,
      },
      sectionTitle: {
        fontWeight: "bold",
        marginRight: 10,
        width: 70,
      },
      row: {
        flexDirection: "row",
        flexWrap:'wrap',
        alignItems: "center",
        marginBottom: 10,
      },
      
      label: {
        fontWeight: "bold",
        marginRight: 5,
      },
      
      dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 5,
        borderRadius: 5,
        width: 128,
        marginRight: 5,
      },
      
      input: {
        flex: 1,
        backgroundColor: "white",
      },
      
      note: {
        fontStyle: "italic",
        borderColor:'black',
        borderWidth:2,
        flexWrap:'wrap'
      },
      
      text: {
        flexDirection: "row",
        alignItems: "center",
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
      
  });

export default Overview;