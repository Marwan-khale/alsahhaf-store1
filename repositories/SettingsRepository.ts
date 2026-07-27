import type { WithFieldValue } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Settings } from "@/types/settings";

const SETTINGS_DOCUMENT_ID = "general";

/** COLLECTION: settings — Document ID: general (singleton). */
export class SettingsRepository extends BaseRepository<Settings> {
  constructor() {
    super("settings");
  }

  getGeneral() {
    return this.findById(SETTINGS_DOCUMENT_ID);
  }

  setGeneral(data: WithFieldValue<Settings>) {
    return this.setById(SETTINGS_DOCUMENT_ID, data);
  }
}
