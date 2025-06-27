import admin, { ServiceAccount } from "firebase-admin";

const adminConfig = {
  type: process.env.FIREBASE_SERVICE_KEY_TYPE,
  project_id: process.env.FIREBASE_SERVICE_KEY_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_KEY,
  client_email: process.env.FIREBASE_SERVICE_KEY_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SERVICE_KEY_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SERVICE_KEY_AUTH_URI,
  token_uri: process.env.FIREBASE_SERVICE_KEY_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_SERVICE_KEY_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_SERVICE_KEY_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_SERVICE_KEY_UNIVERSE_DOMAIN,
};

export const initializeFirebaseAdmin = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig as ServiceAccount),
    });
    admin.firestore().settings({ ignoreUndefinedProperties: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/.test(error.message)) {
      console.error("Firebase admin initialization error", error.stack);
    }
  }
};

export const getFirebaseAdminInstance = () => {
  const isInitialized = admin.apps.length > 0;

  if (!isInitialized) {
    initializeFirebaseAdmin();
  }

  return admin;
};
