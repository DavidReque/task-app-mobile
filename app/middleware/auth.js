import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase.config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const checkUserRole = async (requiredRole) => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === requiredRole;
    } else {
      console.error("No se encontró el usuario");
      return false;
    }
  } else {
    console.error("Usuario no autenticado");
    return false;
  }
};
