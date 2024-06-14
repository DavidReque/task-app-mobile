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
  
  export interface TabIconProps {
    focused: boolean;
    color: string;
    size: number;
  }

 export interface ScreenOptions {
    tabBarShowLabel: boolean
    headerShow: boolean
    tabBarStyle: object
}

 export interface UserUidEmail {
  uid: string;
  email: string;
}