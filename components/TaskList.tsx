import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
import { getTasks, deleteTask, editTask } from '../app/firebase/helper';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from 'tamagui';
import { Task } from '@/types/types';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksList = await getTasks();
        setTasks(tasksList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      setMessage('Tarea eliminada correctamente');
    } catch (error) {
      console.error(error);
      setMessage('Error eliminando la tarea');
    } finally {
      setVisible(true);
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      await editTask(task.id, task);
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      setMessage('Tarea actualizada correctamente');
    } catch (error) {
      console.error(error);
      setMessage('Error actualizando la tarea');
    } finally {
      setVisible(true);
      setSelectedTask(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            {selectedTask?.id === item.id ? (
              <>
                <TextInput
                  label="Título"
                  value={selectedTask.title}
                  onChangeText={(text) => setSelectedTask({ ...selectedTask, title: text })}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Descripción"
                  value={selectedTask.description}
                  onChangeText={(text) => setSelectedTask({ ...selectedTask, description: text })}
                  mode="outlined"
                  style={styles.input}
                  multiline
                />
                <Button onPress={() => handleEditTask(selectedTask)} style={styles.button}>
                  Guardar
                </Button>
                <Button onPress={() => setSelectedTask(null)} style={styles.button}>
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Button onPress={() => setSelectedTask(item)} style={styles.button}>
                  Editar
                </Button>
                <Button onPress={() => handleDeleteTask(item.id)} style={styles.button}>
                  Eliminar
                </Button>
              </>
            )}
          </View>
        )}
      />
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {message}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  taskItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
