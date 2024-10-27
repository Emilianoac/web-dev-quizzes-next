import admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);
 
  // Return the existing app if it exists
  if (admin.apps.length > 0) return admin.app();
  
  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });
 
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}
 
export async function initAdmin() {
  const params = {
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
  };
 
  return createFirebaseAdminApp(params);
}