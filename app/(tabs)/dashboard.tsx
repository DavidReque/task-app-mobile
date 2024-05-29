import Dashboard from "@/components/Dashboard";
import LogoutButton from "@/components/LogoutButton";
import { View, Button } from "react-native";

export default function dashboard() {

  return (
    <View>
      <Dashboard/>
      <LogoutButton/>
    </View>
  )
}
