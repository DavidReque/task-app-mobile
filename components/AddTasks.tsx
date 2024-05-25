import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addTask, getUsers, getCurrentUserRole, assignTaskToUser } from '../app/firebase/helper';

export default function AddTasks() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToEmail, setAssignedToEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddTask = async () => {
    if (role === 'admin') {
      try {
        // Crear la tarea y obtener el ID de la tarea
        const taskId = await addTask(title, description, assignedToEmail);
        
        // Encontrar el usuario asignado por correo electrónico
        const assignedUser = users.find(user => user.email === assignedToEmail);
        
        if (assignedUser) {
          // Asignar la tarea al usuario
          await assignTaskToUser(assignedUser.email, taskId);
          setMessage("Tarea asignada correctamente");
        } else {
          setMessage("Usuario no encontrado");
        }
      } catch (error) {
        console.error(error);
        setMessage("Error asignando la tarea");
      }
    } else {
      setMessage("No tienes permisos para agregar tareas");
    }
  };

  useEffect(() => {
    const fetchUsersAndRole = async () => {
      try {
        const usersList = await getUsers();
        setUsers(usersList);
        const userRole = await getCurrentUserRole();
        setRole(userRole);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndRole();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (role !== 'admin') {
    return <Text style={styles.errorText}>No tienes permisos para agregar tareas.</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Picker
        selectedValue={assignedToEmail}
        onValueChange={(itemValue) => setAssignedToEmail(itemValue)}
      >
        <Picker.Item label="Select user" value="" />
        {users.map((user) => (
          <Picker.Item key={user.email} label={user.email} value={user.email} />
        ))}
      </Picker>
      <Button title="Agregar Tarea" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
