import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Snackbar, HelperText, ActivityIndicator } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { addTask, getUsers, getCurrentUserRole, assignTaskToUser } from '../app/firebase/helper';
import { Button } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserUidEmail } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';
import TaskList from './TaskList';

export default function AddTasks() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToEmail, setAssignedToEmail] = useState('');
  const [assignedToName, setAssignedToName] = useState('');
  const [users, setUsers] = useState<UserUidEmail[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<UserUidEmail[]>([]);

  const handleAddTask = async () => {
    if (role === 'admin') {
      if (title.trim() === '' || description.trim() === '' || assignedToEmail.trim() === '') {
        setMessage('Todos los campos son obligatorios');
        setVisible(true);
        return;
      }

      try {
        const taskId = await addTask(title, description, assignedToEmail);
        const assignedUser = users.find(user => user.email === assignedToEmail);
        
        if (assignedUser) {
          await assignTaskToUser(assignedUser.email, taskId);
          setMessage('Tarea agregada correctamente');
        } else {
          setMessage('Usuario no encontrado');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error asignando la tarea');
      } finally {
        setVisible(true);
      }
    } else {
      setMessage('No tienes permisos para agregar tareas');
      setVisible(true);
    }
  };

  useEffect(() => {
    const fetchUsersAndRole = async () => {
      try {
        const usersList: UserUidEmail[] = await getUsers();
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

  useEffect(() => {
    if (assignedToName.trim() !== '') {
      const user = users.find(u => u.name === assignedToName);
      if (user) {
        setAssignedToEmail(user.email);
      } else {
        setAssignedToEmail('');
      }

      // Filtrar usuarios por nombre
      setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(assignedToName.toLowerCase())));
    } else {
      setFilteredUsers([]);
    }
  }, [assignedToName, users])

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  if (role !== 'admin') {
    return <Text style={styles.errorText}>No tienes permisos para agregar tareas.</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Agregar tarea</Text>
        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <HelperText type="error" visible={title.trim() === ''}>
          El título es obligatorio.
        </HelperText>
        <TextInput
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          multiline
        />
        <HelperText type="error" visible={description.trim() === ''}>
          La descripción es obligatoria.
        </HelperText>
        <TextInput
          label="Nombre del usuario"
          value={assignedToName}
          onChangeText={setAssignedToName}
          mode="outlined"
          style={styles.input}
        />
        {filteredUsers.length > 0 && (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.email}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                setAssignedToName(item.name);
                setAssignedToEmail(item.email);
                setFilteredUsers([]);
              }}>
                <Text style={styles.suggestionItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}
        <HelperText type="error" visible={assignedToName.trim() !== '' && assignedToEmail === ''}>
          Usuario no encontrado.
        </HelperText>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={assignedToEmail}
            onValueChange={(itemValue) => setAssignedToEmail(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccionar usuario" value="" />
            {users.map((user) => (
              <Picker.Item key={user.email} label={user.email} value={user.email} />
            ))}
          </Picker>
        </View>
        <HelperText type="error" visible={assignedToEmail.trim() === ''}>
          Selecciona un usuario.
        </HelperText>
        <Button backgroundColor={'#E17BF5'} hoverStyle={{backgroundColor: '#E89BF7'}} onPress={handleAddTask} style={styles.button}>
          Agregar Tarea
        </Button>
        <TaskList/>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          {message}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Espacio para el desplazamiento
  },
  input: {
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 150,
  },
});
