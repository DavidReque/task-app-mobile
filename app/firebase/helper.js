import { db, firebaseConfig } from "./firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

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

export async function addTask(title, description, assignedToEmail) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      assignedTo: assignedToEmail,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    console.log("Tarea añadida con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo tarea: ", e);
  }
}

//Actualizar la Asignación de Tareas para un Usuario
export async function assignTaskToUser(uid, taskId) {
  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, {
      assignedTasks: arrayUnion(taskId),
    });
    console.log("Tarea asignada al usuario");
  } catch (error) {
    console.error("Error asignando tarea al usuario: ", e);
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

export const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const userSnapshot = await getDocs(usersCollection);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
};
