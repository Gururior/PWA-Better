import { Stack } from "expo-router";

export default function AuthLayout(){
    return (
      <Stack>
        <Stack.Screen name="queotesScreen" options={{title: "Quotes"}}/>
      </Stack> 
    )
}