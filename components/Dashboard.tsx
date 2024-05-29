import { getCurrentUserRole, getTasks } from '@/app/firebase/helper';
import { Task } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Button, ActivityIndicator } from 'react-native-paper';
import LogoutButton from './LogoutButton';


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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Dashboard de Tareas" />
        <LogoutButton />
      </Appbar.Header>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskStatus}>Estado: {item.status}</Text>
              <Text style={styles.taskDate}>Fecha: {new Date(item.createdAt).toLocaleString()}</Text>
            </Card.Content>
          </Card>
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
  taskCard: {
    margin: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
