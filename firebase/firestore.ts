import { getFirestore, type Firestore } from "firebase/firestore";

import { firebaseApp } from "@/firebase/config";

// Firestore SDK instance only.
// No collection references, queries, or reads/writes belong here.
// Data access lives in repositories/ once approved.
export const db: Firestore = getFirestore(firebaseApp);
