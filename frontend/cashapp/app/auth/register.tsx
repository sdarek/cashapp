import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Surface,
  Divider,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { registerUser } from '@/services/api';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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
    if (password !== repeatPassword) {
      setError('Hasła nie są takie same.');
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await registerUser(email, password);
      setLoading(false);
      router.replace('/auth/login');
    } catch (e: any) {
      setLoading(false);
      setError(e?.response?.data?.message || 'Błąd rejestracji.');
    }
  };

  return (
    <Surface style={styles.container}>
      <Text variant="headlineLarge" style={styles.title} accessibilityRole="header">
        REJESTRACJA
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
        textContentType="newPassword"
        accessibilityLabel="Hasło"
        disabled={loading}
      />
      <TextInput
        label="Powtórz hasło"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        autoComplete="password"
        textContentType="newPassword"
        accessibilityLabel="Powtórz hasło"
        disabled={loading}
      />
      {error ? (
        <HelperText type="error" visible={!!error} accessibilityLiveRegion="polite">
          {error}
        </HelperText>
      ) : null}
      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.registerButton}
        loading={loading}
        disabled={loading}
        accessibilityLabel="Zarejestruj się"
      >
        Zarejestruj się
      </Button>
      <Text variant="bodyMedium" style={styles.loginText}>
        Masz już konto?{' '}
        <Text
          style={{ fontWeight: 'bold', color: colors.primary }}
          onPress={() => router.replace('/auth/login')}
          accessibilityRole="link"
        >
          Zaloguj się
        </Text>
      </Text>
      <Divider style={{ marginVertical: 8 }} />
      <Button
        mode="outlined"
        icon={() => <FontAwesome name="google" size={24} color={colors.primary} />}
        style={styles.oauthButton}
        disabled={loading}
        accessibilityLabel="Kontynuuj przez Google"
        onPress={() => {}}
      >
        Kontynuuj przez Google
      </Button>
      <Button
        mode="outlined"
        icon={() => <FontAwesome name="facebook" size={24} color={colors.primary} />}
        style={styles.oauthButton}
        disabled={loading}
        accessibilityLabel="Kontynuuj przez Facebook"
        onPress={() => {}}
      >
        Kontynuuj przez Facebook
      </Button>
      <Button
        mode="outlined"
        icon={() => <FontAwesome name="apple" size={24} color={colors.primary} />}
        style={styles.oauthButton}
        disabled={loading}
        accessibilityLabel="Kontynuuj przez Apple"
        onPress={() => {}}
      >
        Kontynuuj przez Apple
      </Button>
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
  registerButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  loginText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  oauthButton: {
    marginVertical: 4,
  },
});

export default RegisterScreen;
