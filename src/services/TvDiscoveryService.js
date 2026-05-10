// src/services/TvDiscoveryService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTvUrl } from "../constants/TvCommands";

const TV_IP_KEY = "@tv_ip_address";

export const TvDiscoveryService = {
  // Sauvegarder l'IP de la TV
  saveTvIp: async (ip) => {
    try {
      await AsyncStorage.setItem(TV_IP_KEY, ip);
      console.log(`IP TV sauvegardée : ${ip}`);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde de l'IP", e);
    }
  },

  // Récupérer l'IP sauvegardée
  getSavedTvIp: async () => {
    try {
      return await AsyncStorage.getItem(TV_IP_KEY);
    } catch (e) {
      console.error("Erreur lors de la récupération de l'IP", e);
      return null;
    }
  },

  // Envoyer la commande à la TV via HTTP
  sendCommand: async (command) => {
    const ipAddress = await TvDiscoveryService.getSavedTvIp();

    if (!ipAddress) {
      console.warn("Aucune IP TV configurée.");
      return false;
    }

    const url = getTvUrl(ipAddress, command);

    try {
      const response = await fetch(url, {
        method: "POST", // Ou 'GET' selon votre TV
        headers: {
          "Content-Type": "application/json",
        },
        // Parfois un body est requis : body: JSON.stringify({ key: command })
      });

      if (response.ok) {
        console.log(`Commande ${command} envoyée avec succès.`);
        return true;
      } else {
        console.error(
          `Échec de la commande ${command}. Statut: ${response.status}`,
        );
        return false;
      }
    } catch (error) {
      console.error(`Erreur réseau lors de l'envoi de ${command}:`, error);
      return false;
    }
  },
};
