import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Surface,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { loginUser } from '@/services/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const router = useRouter();

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Podaj poprawny adres email.');
      return false;
    }
    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków.');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await loginUser(email, password);
      setLoading(false);
      // Po zalogowaniu przekieruj na stronę główną lub dashboard
      router.replace('/');
    } catch (e: any) {
      setLoading(false);
      setError(e?.response?.data?.message || 'Błędny email lub hasło.');
    }
  };

  return (
    <Surface style={styles.container}>
      <Text variant="headlineLarge" style={styles.title} accessibilityRole="header">
        LOGOWANIE
      </Text>
      <TextInput
        label="Adres email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
        autoComplete="email"
        textContentType="emailAddress"
        accessibilityLabel="Adres email"
        disabled={loading}
      />
      <TextInput
        label="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        autoComplete="password"
        textContentType="password"
        accessibilityLabel="Hasło"
        disabled={loading}
      />
      {error ? (
        <HelperText type="error" visible={!!error} accessibilityLiveRegion="polite">
          {error}
        </HelperText>
      ) : null}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.loginButton}
        loading={loading}
        disabled={loading}
        accessibilityLabel="Zaloguj się"
      >
        Zaloguj się
      </Button>
      <Text variant="bodyMedium" style={styles.registerText}>
        Nie masz konta?{' '}
        <Text
          style={{ fontWeight: 'bold', color: colors.primary }}
          onPress={() => router.replace('/auth/register')}
          accessibilityRole="link"
        >
          Zarejestruj się
        </Text>
      </Text>
      {loading && (
        <View style={{ marginTop: 16 }}>
          <ActivityIndicator animating size="large" color={colors.primary} />
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  registerText: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default LoginScreen;
