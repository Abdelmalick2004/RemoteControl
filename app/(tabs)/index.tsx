import React, { useState } from "react";
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
// On importe les icônes pour le look "télécommande"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Power,
  Tv
} from "lucide-react-native";

export default function HomeScreen() {
  const [tvIp, setTvIp] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  // Ta fonction de commande améliorée
  const sendCommand = async (command: string) => {
    console.log("Commande envoyée :", command);

    if (!tvIp) {
      Alert.alert(
        "IP manquante",
        "Appuie sur l'icône TV en haut pour configurer l'IP.",
      );
      return;
    }

    try {
      // C'est ici qu'on fera le lien réel avec la TV plus tard
      // fetch(`http://${tvIp}/api/v1/remote?key=${command}`, { method: 'POST' });
    } catch (e) {
      console.log("Erreur réseau");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec configuration IP */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Remote</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Tv color={tvIp ? "#4CAF50" : "#F44336"} size={28} />
        </TouchableOpacity>
      </View>

      {/* Bouton Power */}
      <View style={styles.powerSection}>
        <TouchableOpacity
          style={styles.powerButton}
          onPress={() => sendCommand("POWER")}
        >
          <Power color="white" size={40} />
        </TouchableOpacity>
      </View>

      {/* Volume et Chaînes */}
      <View style={styles.controlRow}>
        <View style={styles.verticalBar}>
          <TouchableOpacity onPress={() => sendCommand("VOL_UP")}>
            <ChevronUp color="white" size={30} />
          </TouchableOpacity>
          <Text style={styles.barLabel}>VOL</Text>
          <TouchableOpacity onPress={() => sendCommand("VOL_DOWN")}>
            <ChevronDown color="white" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.verticalBar}>
          <TouchableOpacity onPress={() => sendCommand("CH_UP")}>
            <ChevronUp color="white" size={30} />
          </TouchableOpacity>
          <Text style={styles.barLabel}>CH</Text>
          <TouchableOpacity onPress={() => sendCommand("CH_DOWN")}>
            <ChevronDown color="white" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Pavé Directionnel (DPAD) */}
      <View style={styles.dpadContainer}>
        <TouchableOpacity
          style={styles.dpadBtn}
          onPress={() => sendCommand("UP")}
        >
          <ChevronUp color="white" size={35} />
        </TouchableOpacity>
        <View style={styles.dpadRow}>
          <TouchableOpacity
            style={styles.dpadBtn}
            onPress={() => sendCommand("LEFT")}
          >
            <ChevronLeft color="white" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.okBtn}
            onPress={() => sendCommand("ENTER")}
          >
            <Circle color="white" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dpadBtn}
            onPress={() => sendCommand("RIGHT")}
          >
            <ChevronRight color="white" size={35} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.dpadBtn}
          onPress={() => sendCommand("DOWN")}
        >
          <ChevronDown color="white" size={35} />
        </TouchableOpacity>
      </View>

      {/* Fenêtre de configuration (Modal) */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adresse IP de la TV</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 192.168.1.50"
              placeholderTextColor="#888"
              value={tvIp}
              onChangeText={setTvIp}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveBtnText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  powerSection: { alignItems: "center", marginBottom: 30 },
  powerButton: {
    backgroundColor: "#FF3B30",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  verticalBar: {
    backgroundColor: "#1A1A1A",
    padding: 15,
    borderRadius: 35,
    alignItems: "center",
    width: 70,
  },
  barLabel: { color: "#666", fontWeight: "bold", marginVertical: 10 },
  dpadContainer: { alignItems: "center" },
  dpadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginVertical: 15,
  },
  dpadBtn: { backgroundColor: "#1A1A1A", padding: 15, borderRadius: 20 },
  okBtn: { backgroundColor: "#007AFF", padding: 25, borderRadius: 50 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 30,
  },
  modalContent: { backgroundColor: "#222", padding: 25, borderRadius: 20 },
  modalTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#000",
    color: "white",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  saveBtnText: { color: "white", fontWeight: "bold" },
});
