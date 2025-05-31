import { DarkTheme, LightTheme } from '@/constants/Theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={statusBarStyle} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
