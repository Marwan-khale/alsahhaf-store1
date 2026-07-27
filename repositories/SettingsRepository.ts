import type { UpdateData, WithFieldValue } from "firebase/firestore";

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

  /** Overwrites the whole settings document. */
  setGeneral(data: WithFieldValue<Settings>) {
    return this.setById(SETTINGS_DOCUMENT_ID, data);
  }

  /** Partially updates the settings document. */
  updateGeneral(data: UpdateData<Settings>) {
    return this.update(SETTINGS_DOCUMENT_ID, data);
  }
}
