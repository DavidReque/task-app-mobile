import { Tabs } from "expo-router"
import { View, Text } from "react-native"
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';

interface TabIconProps {
    focused: boolean;
    color: string;
    size: number;
  }

interface ScreenOptions {
    tabBarShowLabel: boolean
    headerShow: boolean
    tabBarStyle: object
}

export default () => {
    const screenOptions: ScreenOptions = {
        tabBarShowLabel: false,
        headerShow: false,
        tabBarStyle: {
            position: 'absolute',
            botton: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60,
            background: '#fff'
        }
    }

    return (
        <Tabs screenOptions={screenOptions}>
            <Tabs.Screen name="dashboard" options={{
                headerShown: false, 
                tabBarIcon: () => {
                    return (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Entypo name="home" size={22} color="#111" />
                            <Text style={{fontSize: 11, }}>INICIO</Text>
                        </View>
                    )
                }
            }
                }/>
            <Tabs.Screen name="user" options={{
                headerShown: false, 
                tabBarIcon: ({}) => {
                    return (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FontAwesome5 name="user-alt" size={22} color="#111" />                            
                            <Text style={{fontSize: 11, color: "#16247d"}}>USUARIOS</Text>
                        </View>
                    )
                }
            }
                }/>
            <Tabs.Screen name="create" options={{
                headerShown: false, 
                tabBarIcon: ({}) => {
                    return (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="create" size={22} color="#111" />                            
                            <Text style={{fontSize: 11, color: "#16247d"}}>CREAR</Text>
                        </View>
                    )
                }
            }
                }/>
            <Tabs.Screen name="mytasks" options={{
                headerShown: false, 
                tabBarIcon: ({}) => {
                    return (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FontAwesome5 name="tasks" size={22} color="#111" />                            
                            <Text style={{fontSize: 11, color: "#16247d"}}>Tareas</Text>
                        </View>
                    )
                }
            }
                }/>
            {/**options={{headerTitle: 'Mis tareas', headerStyle: {backgroundColor: '#E17BF5'}}} */}
        </Tabs>
    )
}