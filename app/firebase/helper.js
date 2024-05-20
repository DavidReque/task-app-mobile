import { db } from "./firebase.config";
import { collection, addDoc, updateDoc } from "firebase/firestore";

// Añadir un Usuario
async function addUser(name, email, role) {
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

async function addTask(title, description, assignedTo) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      assignedTo: assignedTo,
      status: "pending",
    });
    console.log("Tarea añadida con ID: ", docRef.id);
  } catch (error) {
    console.error("Error añadiendo tarea: ", e);
  }
}

//Actualizar la Asignación de Tareas para un Usuario
async function assignTaskToUser(userId, taskId) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      assignedTasks: arrayUnion(taskId),
    });
    console.log("Tarea asignada al usuario");
  } catch (error) {
    console.error("Error asignando tarea al usuario: ", e);
  }
}
