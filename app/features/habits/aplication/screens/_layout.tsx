import { Stack } from "expo-router";

export default function AuthLayout(){
    return (
      <Stack>
        <Stack.Screen name="HabitsScreen" options={{title: "Habits"}}/>
      </Stack> 
    )
}