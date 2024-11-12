import { Stack } from "expo-router";

export default function AuthLayout(){
    return (
      <Stack>
        <Stack.Screen name="homeScreens" options={{title: "Menu"}}/>
      </Stack> 
    )
}