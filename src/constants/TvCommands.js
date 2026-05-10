// src/constants/TvCommands.js

// Définition des commandes standard (Exemple générique IP)
export const TV_CODES = {
  KEY_POWER: "KEY_POWER",
  KEY_UP: "KEY_UP",
  KEY_DOWN: "KEY_DOWN",
  KEY_LEFT: "KEY_LEFT",
  KEY_RIGHT: "KEY_RIGHT",
  KEY_ENTER: "KEY_ENTER",
  KEY_VOL_UP: "KEY_VOLUP",
  KEY_VOL_DOWN: "KEY_VOLDOWN",
  KEY_CH_UP: "KEY_CHUP",
  KEY_CH_DOWN: "KEY_CHDOWN",
  KEY_HOME: "KEY_HOME",
  KEY_BACK: "KEY_BACK",
  KEY_MENU: "KEY_MENU",
  KEY_MUTE: "KEY_MUTE",
};

// Exemple de configuration d'URL pour une TV générique
export const getTvUrl = (ipAddress, command) => {
  // Remplacez ceci par le format d'URL spécifique à votre TV
  // Exemple Samsung: `http://${ipAddress}:8001/api/v2/channels/samsung.remote.control/keys/${command}`
  return `http://${ipAddress}/api/command?key=${command}`;
};
