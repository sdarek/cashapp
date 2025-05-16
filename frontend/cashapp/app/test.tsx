import { useState } from 'react';
import { ping } from '@/services/api';
import { Button, Text } from 'react-native-paper';
import { View } from 'react-native';

export default function TestScreen() {
  const [pong, setPong] = useState('');

  const handlePing = async () => {
    try {
      const res = await ping();
      setPong(res);
    } catch {
      setPong('Błąd połączenia');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button mode="contained" onPress={handlePing}>
        Wyślij ping
      </Button>
      <Text style={{ marginTop: 20, fontSize: 18, color: 'black' }}>{pong}</Text>
    </View>
  );
}
