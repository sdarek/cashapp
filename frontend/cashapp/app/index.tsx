import { Link } from 'expo-router';
import { Button, Surface } from 'react-native-paper';

export default function Index() {
  return (
    <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/auth/register" asChild>
        <Button mode="contained">Ogien</Button>
      </Link>
    </Surface>
  );
}
