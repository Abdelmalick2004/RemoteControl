// src/components/RemoteButton.js
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TvDiscoveryService } from "../services/TvDiscoveryService";

const RemoteButton = ({
  icon: Icon,
  label,
  command,
  color = "#333",
  size = 30,
  style,
  iconColor = "white",
}) => {
  const handlePress = () => {
    if (command) {
      TvDiscoveryService.sendCommand(command);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {Icon && <Icon color={iconColor} size={size} />}
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  label: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default RemoteButton;
