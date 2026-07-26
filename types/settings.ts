// Matches DATABASE SCHEMA → COLLECTION: settings
// Document ID: general

import type { Currency, Timestamp, UnstructuredRecord } from "@/types/common";

export interface Settings {
  storeName: string;
  storeLogo: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  supportedCurrencies: Currency[];
  defaultCurrency: Currency;
  country: string;
  timezone: string;
  workingHours: UnstructuredRecord;
  bankAccounts: UnstructuredRecord[];
  shippingMethods: UnstructuredRecord[];
  socialLinks: UnstructuredRecord;
  maintenanceMode: boolean;
  version: string;
  updatedAt: Timestamp;
}
