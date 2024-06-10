import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, Checkbox, ActivityIndicator } from 'react-native-paper';
import { getTasksByUser, updateTaskStatus } from '../app/firebase/helper';
import { Task } from '@/types/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksList = await getTasksByUser();
        setTasks(tasksList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId: string, newValue: boolean) => {
    try {
      await updateTaskStatus(taskId, newValue ? 'pending' : 'completed');
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newValue ? 'pending' : 'completed' } : task
        )
      );
    } catch (error) {
      console.error('Error actualizando el estado de la tarea:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.taskStatus}>Pendiente:</Text>
              <Checkbox
                status={item.status === 'pending' ? 'checked' : 'unchecked'}
                onPress={() => handleStatusChange(item.id, item.status !== 'pending')}
              />
            </View>
            <Text style={styles.taskDate}>
              Fecha: {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  taskContainer: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  taskStatus: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  taskDate: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
});
