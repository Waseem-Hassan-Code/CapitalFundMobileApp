import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  propertyActions: {
    flexDirection: "row",
  },
  propertyDetails: {
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 5,
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  flatListContent: {
    padding: 10,
  },
});
export { styles };
