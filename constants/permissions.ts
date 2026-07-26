// Permission constants.
//
// The approved documentation states that permissions are role-based and
// enforced via Firebase Authentication + Firestore Security Rules + Custom
// Claims (see AUTHORIZATION section), but does not define specific
// permission identifiers (e.g. "products:write").
//
// Per the "do not invent undocumented values" rule, no permission keys are
// defined here. This file only documents which admin roles exist as the
// basis for future, explicitly approved permission definitions.

import { ADMIN_ROLES } from "@/constants/roles";

export const PERMISSION_ROLES = Object.values(ADMIN_ROLES);
