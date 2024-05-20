import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addTask, getUsers } from '../app/firebase/helper'; 
export default function AddTasks() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToEmail, setAssignedToEmail] = useState('');
  const [users, setUsers] = useState([]);

  const handleAddTask = () => {
    addTask(title, description, assignedToEmail);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} style={styles.input} />
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
});
