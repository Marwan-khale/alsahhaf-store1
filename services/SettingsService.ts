import { SettingsRepository } from "@/repositories/SettingsRepository";
import type { Settings } from "@/types/settings";
import type { WithId } from "@/types/common";

/**
 * Orchestrates SettingsRepository only.
 * Per SETTINGS security section: "Customers Read only public settings
 * ... Sensitive configuration must never be readable publicly." Bank
 * account details are the documented sensitive field, so they are
 * excluded from getPublicSettings().
 */
type PublicSettings = Omit<Settings, "bankAccounts">;

export class SettingsService {
  constructor(
    private readonly settingsRepository: SettingsRepository = new SettingsRepository()
  ) {}

  /** Admin-facing: full settings document, including sensitive fields. */
  getFullSettings(): Promise<WithId<Settings> | null> {
    return this.settingsRepository.getGeneral();
  }

  /** Customer-facing: settings with sensitive fields removed. */
  async getPublicSettings(): Promise<WithId<PublicSettings> | null> {
    const settings = await this.settingsRepository.getGeneral();
    if (!settings) {
      return null;
    }
    const { bankAccounts: _bankAccounts, ...publicSettings } = settings;
    return publicSettings;
  }

  updateSettings(data: Partial<Settings>): Promise<void> {
    return this.settingsRepository.updateGeneral(data);
  }
}

export const settingsService = new SettingsService();
