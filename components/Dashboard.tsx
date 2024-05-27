// Dashboard.tsx
import { getCurrentUserRole, getTasks } from '@/app/firebase/helper';
import { Task } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasksAndRole = async () => {
      try {
        const tasksList = await getTasks();
        const userRole = await getCurrentUserRole();
        setRole(userRole);
        setTasks(tasksList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksAndRole();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskStatus}>Estado: {item.status}</Text>
            <Text style={styles.taskDate}>Fecha: {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  taskStatus: {
    marginTop: 4,
    fontSize: 14,
    fontStyle: 'italic',
  },
  taskDate: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
});
