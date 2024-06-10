import { getCurrentUserRole, getTasks } from '@/app/firebase/helper';
import { Task } from '@/types/types';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Appbar, Card, ActivityIndicator } from 'react-native-paper';
import LogoutButton from './LogoutButton';


export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasksAndRole = async () => {
    try {
      setLoading(true)
      const tasksList = await getTasks();
      const userRole = await getCurrentUserRole();
      setRole(userRole);
      setTasks(tasksList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false)
    }
  };

  useEffect(() => {
    fetchTasksAndRole();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasksAndRole();
    }, 300000); // 300000 ms = 5 minutes
    return () => clearInterval(interval);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
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
        <Appbar.Content title="Inicio" />
        <LogoutButton />
      </Appbar.Header>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskStatus}>Estado: {item.status}</Text>
              <Text style={styles.taskAssignedTo}>Asignado a: {item.assignedTo}</Text>
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
  taskCard: {
    margin: 10,
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
  taskAssignedTo: {
    marginTop: 4,
    fontSize: 14,
    fontStyle: 'italic',
  },
  taskDate: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
