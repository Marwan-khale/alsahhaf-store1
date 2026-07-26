// Feature flag constants.
//
// "Feature Flags" is listed as a documented configuration category
// (see CONFIGURATION section), and DATABASE SCHEMA → COLLECTION: settings
// defines "maintenanceMode" as a concrete flag field. No other feature
// flags are documented, so none are invented here.

export const FEATURE_FLAGS = {
  MAINTENANCE_MODE: "maintenanceMode",
} as const;
