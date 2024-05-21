import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="dashboard"/>
            <Tabs.Screen name="user"/>
            <Tabs.Screen name="create"/>
        </Tabs>
    )
}