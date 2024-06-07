import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="dashboard" options={{headerTitle: 'Inicio', headerStyle: {backgroundColor: '#E17BF5'}}}/>
            <Tabs.Screen name="user" options={{headerTitle: 'Editar usuario', headerStyle: {backgroundColor: '#E17BF5'}}}/>
            <Tabs.Screen name="create" options={{headerTitle: 'Crear tareas', headerStyle: {backgroundColor: '#E17BF5'}}}/>
            <Tabs.Screen name="mytasks" options={{headerTitle: 'Mis tareas', headerStyle: {backgroundColor: '#E17BF5'}}}/>
        </Tabs>
    )
}