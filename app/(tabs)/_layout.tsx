import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{headerShown: false}}/>
            <Tabs.Screen name="login"/>
            <Tabs.Screen name="user"/>
            <Tabs.Screen name="create"/>
        </Tabs>
    )
}