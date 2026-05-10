// App.js
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Circle,
    CornerDownLeft,
    Home,
    MicOff,
    Power,
    Settings,
    Tv
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RemoteButton from "./src/components/RemoteButton";
import { TV_CODES } from "./src/constants/TvCommands";
import { TvDiscoveryService } from "./src/services/TvDiscoveryService";

export default function App() {
  const [tvIp, setTvIp] = useState("");
  const [isConfigModalVisible, setConfigModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const loadIp = async () => {
      const savedIp = await TvDiscoveryService.getSavedTvIp();
      if (savedIp) {
        setTvIp(savedIp);
        setIsConnected(true);
      } else {
        setConfigModalVisible(true);
      }
    };
    loadIp();
  }, []);

  const saveConfiguration = async () => {
    if (tvIp.trim().length > 7) {
      await TvDiscoveryService.saveTvIp(tvIp);
      setIsConnected(true);
      setConfigModalVisible(false);
      Alert.alert("Succès", "Configuration IP sauvegardée.");
    } else {
      Alert.alert("Erreur", "Veuillez entrer une adresse IP valide.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Remote</Text>
        <TouchableOpacity
          onPress={() => setConfigModalVisible(true)}
          style={styles.statusIndicator}
        >
          <Tv color={isConnected ? "#4CAF50" : "#F44336"} size={24} />
          <Text
            style={[
              styles.statusText,
              { color: isConnected ? "#4CAF50" : "#F44336" },
            ]}
          >
            {isConnected ? "Connecté" : "Déconnecté"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.topSection}>
        <RemoteButton
          icon={Power}
          command={TV_CODES.KEY_POWER}
          color="#FF3B30"
          size={36}
          style={styles.powerButton}
        />
      </View>

      <View style={styles.controlRow}>
        <View style={styles.verticalControl}>
          <RemoteButton
            icon={ChevronUp}
            command={TV_CODES.KEY_VOL_UP}
            color="#444"
          />
          <Text style={styles.controlLabel}>VOL</Text>
          <RemoteButton
            icon={ChevronDown}
            command={TV_CODES.KEY_VOL_DOWN}
            color="#444"
          />
        </View>

        <View style={styles.verticalControl}>
          <RemoteButton
            icon={ChevronUp}
            command={TV_CODES.KEY_CH_UP}
            color="#444"
          />
          <Text style={styles.controlLabel}>CH</Text>
          <RemoteButton
            icon={ChevronDown}
            command={TV_CODES.KEY_CH_DOWN}
            color="#444"
          />
        </View>
      </View>

      <View style={styles.dpadContainer}>
        <RemoteButton
          icon={ChevronUp}
          command={TV_CODES.KEY_UP}
          color="#222"
          style={styles.dpadUp}
          size={30}
        />
        <View style={styles.dpadRow}>
          <RemoteButton
            icon={ChevronLeft}
            command={TV_CODES.KEY_LEFT}
            color="#222"
            style={styles.dpadLeft}
            size={30}
          />
          <RemoteButton
            icon={Circle}
            command={TV_CODES.KEY_ENTER}
            color="#007AFF"
            style={styles.dpadCenter}
            size={40}
            iconColor="white"
          />
          <RemoteButton
            icon={ChevronRight}
            command={TV_CODES.KEY_RIGHT}
            color="#222"
            style={styles.dpadRight}
            size={30}
          />
        </View>
        <RemoteButton
          icon={ChevronDown}
          command={TV_CODES.KEY_DOWN}
          color="#222"
          style={styles.dpadDown}
          size={30}
        />
      </View>

      <View style={styles.bottomButtons}>
        <RemoteButton
          icon={Home}
          command={TV_CODES.KEY_HOME}
          label="HOME"
          color="#4CAF50"
          size={24}
          style={styles.roundButton}
        />
        <RemoteButton
          icon={MicOff}
          command={TV_CODES.KEY_MUTE}
          label="MUTE"
          color="#8E8E93"
          size={24}
          style={styles.roundButton}
        />
        <RemoteButton
          icon={CornerDownLeft}
          command={TV_CODES.KEY_BACK}
          label="RETOUR"
          color="#FF9500"
          size={24}
          style={styles.roundButton}
        />
        <RemoteButton
          icon={Settings}
          command={TV_CODES.KEY_MENU}
          label="MENU"
          color="#5856D6"
          size={24}
          style={styles.roundButton}
        />
      </View>

      <Modal
        visible={isConfigModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configuration TV</Text>
            <Text style={styles.modalSubTitle}>
              Entrez l'adresse IP de votre Smart TV :
            </Text>
            <TextInput
              style={styles.ipInput}
              value={tvIp}
              onChangeText={setTvIp}
              placeholder="192.168.x.x"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfigModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveConfiguration}
              >
                <Text style={styles.modalButtonText}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Les styles restent identiques à votre version originale
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: { color: "white", fontSize: 26, fontWeight: "bold" },
  statusIndicator: { flexDirection: "row", alignItems: "center", gap: 8 },
  statusText: { fontSize: 14, fontWeight: "500" },
  topSection: { alignItems: "center", marginBottom: 20 },
  powerButton: { padding: 25, borderRadius: 50 },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  verticalControl: {
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 80,
  },
  controlLabel: {
    color: "#AAA",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
  dpadContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    position: "relative",
    width: 220,
    height: 220,
    alignSelf: "center",
  },
  dpadRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  dpadUp: { position: "absolute", top: 0, padding: 20, zIndex: 2 },
  dpadDown: { position: "absolute", bottom: 0, padding: 20, zIndex: 2 },
  dpadLeft: { padding: 20 },
  dpadRight: { padding: 20 },
  dpadCenter: { padding: 30, borderRadius: 60 },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "auto",
    marginBottom: 30,
  },
  roundButton: { width: 70, height: 70, borderRadius: 35, padding: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalSubTitle: {
    color: "#CCC",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  ipInput: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    color: "white",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 25,
    textAlign: "center",
    borderColor: "#444",
    borderWidth: 1,
  },
  modalButtons: { flexDirection: "row", gap: 15 },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    minWidth: 120,
    alignItems: "center",
  },
  modalButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  cancelButton: { backgroundColor: "#444" },
  saveButton: { backgroundColor: "#007AFF" },
});
