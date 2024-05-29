import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditUser from "@/components/EditUser";
import { Appbar } from 'react-native-paper';

export default function Home() {
  return (
    <View style={styles.container}>
      <EditUser />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
