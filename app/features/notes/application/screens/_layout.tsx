import { Stack } from "expo-router";

export default function AuthLayout(){
    return (
      <Stack>
        <Stack.Screen name="NotesScreen" options={{title: "Notes"}}/>
      </Stack> 
    )
}