import { z } from "zod";

import type { Address } from "@/types/common";

// The approved schema only documents "addresses : array" for User,
// without defining the shape of each entry. No sub-fields are invented —
// each entry is validated as a generic record until the schema is extended.
export const addressEntrySchema = z.record(z.string(), z.unknown()) satisfies z.ZodType<Address>;

export type AddressEntryInput = z.infer<typeof addressEntrySchema>;
