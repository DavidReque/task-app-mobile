export interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    status: string;
    createdAt: string;
  }
  
  export interface User {
    uid: string;
    name: string;
    email: string;
    role: string;
    assignedTasks: string[];
  }
  
  export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
  };
  