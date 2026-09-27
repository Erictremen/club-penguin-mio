import { SettingsManager } from "@server/settings";
import { GlobalSettings } from "@common/utils";

let multiplayerWindow: any = null;

export function getSiteUrl(settings: GlobalSettings, serverSettings: SettingsManager): string {
    // Reemplaza esta URL de ejemplo por la tuya exacta de Render para fijar el mapa visual
    return "https://club-penguin-backend-4q56.onrender.com"; 
}

export function createMultiplayerSettings(globalSettings: GlobalSettings, serverSettings: SettingsManager, mainWindow: any) {
    console.log("Modo Web Activo");
    return null;
}
