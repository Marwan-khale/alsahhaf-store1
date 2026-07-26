import { getStorage, type FirebaseStorage } from "firebase/storage";

import { firebaseApp } from "@/firebase/config";

// Storage SDK instance only.
// No upload, download, or file-path logic belongs here.
// File operations live in repositories/ once approved.
export const storage: FirebaseStorage = getStorage(firebaseApp);
