import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="dashboard" options={{headerShown: false}}/>
            <Tabs.Screen name="user" options={{headerShown: false}}/>
            <Tabs.Screen name="create" options={{headerShown: false}}/>
            <Tabs.Screen name="mytasks" options={{headerShown: false}}/>
            {/**options={{headerTitle: 'Mis tareas', headerStyle: {backgroundColor: '#E17BF5'}}} */}
        </Tabs>
    )
}