import { db, firebaseConfig } from "./firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getFirestore,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const dbFirestore = getFirestore();

// Añadir un Usuario
export async function addUser(name, email, role) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      role: role,
      assignedTasks: [],
    });
    console.log("Usuario añadido con ID: ", docRef.id);
  } catch (error) {
    console.error("Error añadiendo usuario: ", e);
  }
}

//crear tarea
export async function addTask(title, description, assignedToEmail) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      assignedTo: assignedToEmail,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    return docRef.id; // Devolver el ID de la tarea
  } catch (e) {
    console.error("Error añadiendo tarea: ", e);
    throw e;
  }
}

//Actualizar la Asignación de Tareas para un Usuario
export async function assignTaskToUser(email, taskId) {
  try {
    const userSnapshot = await getDocs(collection(db, "users"));
    const user = userSnapshot.docs.find((doc) => doc.data().email === email);
    if (user) {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        assignedTasks: arrayUnion(taskId), // Usar arrayUnion para agregar sin sobreescribir
      });
      console.log("Tarea asignada al usuario");
    } else {
      console.error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error asignando tarea al usuario: ", error);
    throw error;
  }
}

// Actualizar usuario
export async function updateUser({ name, email, role }) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userRef, {
        name,
        email,
        role,
      });
      console.log("Usuario actualizado");
    } catch (e) {
      console.error("Error actualizando usuario: ", e);
    }
  }
}

export async function updateName({ name }) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userRef, {
        name,
      });
      console.log("Usuario actualizado");
    } catch (e) {
      console.error("Error actualizando usuario: ", e);
    }
  }
}

export const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const userSnapshot = await getDocs(usersCollection);
  const userList = userSnapshot.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id, // Incluir el UID del documento
  }));

  return userList;
};

// Obtener el rol del usuario
export const getCurrentUserRole = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      console.error("No such document!");
      return null;
    }
  } else {
    console.error("No user is signed in!");
    return null;
  }
};

// obtener las tareas
export const getTasks = async () => {
  const tasksCollection = collection(db, "tasks");
  const tasksSnapshot = await getDocs(tasksCollection);
  const tasksList = tasksSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return tasksList;
};
