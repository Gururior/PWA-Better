import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider, useSessionState } from './features/auth/application/providers';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <RootNavigator />
      </SessionProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { user } = useSessionState();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <>
        <Stack.Screen name="profile" />
        <Stack.Screen name="features/habits/application/screens/components/HabitsView" />
        <Stack.Screen name="features/notes/application/screens/NotesScreen" />
        <Stack.Screen name="features/todos/application/screens/TodosScreen" />
        <Stack.Screen name="features/quotes/application/screens/components/QuotesView" />
      </>
    ) : (
      <Stack.Screen name="features/auth/application/screens/loginScreens" />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}