import Dashboard from "@/components/Dashboard";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/router";
import { View, Button } from "react-native";

export default function dashboard() {

  return (
    <View>
      <LogoutButton/>
      <Dashboard/>
    </View>
  )
}
