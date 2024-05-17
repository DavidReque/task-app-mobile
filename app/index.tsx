import LoginForm from '@/components/LoginForm';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <LoginForm />
    </PaperProvider>
  );
}
