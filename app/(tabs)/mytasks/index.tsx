import AddTasks from "@/components/AddTasks";
import MyTasks from "@/components/MyTasks";
import { View, Text } from "react-native";

export default function home() {
  return (
    <View>
        <Text>
          <MyTasks/>
        </Text>
    </View>
  )
}
