import { Link } from 'expo-router';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/test" asChild>
        <Button mode="contained">Ogien</Button>
      </Link>
    </View>
  );
}
