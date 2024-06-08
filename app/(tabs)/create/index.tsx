import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddTasks from "@/components/AddTasks";
//todo (optional): mejorar el select

export default function Home() {
  return (
    <View style={styles.container}>
      <AddTasks />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
