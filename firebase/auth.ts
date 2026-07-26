import { getAuth, type Auth } from "firebase/auth";

import { firebaseApp } from "@/firebase/config";

// Firebase Auth SDK instance only.
// No sign-in, sign-up, or session logic belongs here.
// Auth business logic lives in repositories/ once approved.
export const auth: Auth = getAuth(firebaseApp);
