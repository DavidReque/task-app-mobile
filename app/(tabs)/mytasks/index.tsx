import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyTasks from "@/components/MyTasks";

export default function Home() {
  return (
    <View style={styles.container}>
      <MyTasks />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
