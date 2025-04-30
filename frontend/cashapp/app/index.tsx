import * as React from 'react'
import { Text, View } from "react-native";
import { PaperProvider, Button } from 'react-native-paper';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PaperProvider>
        <Text style={{ marginTop: 50, textAlign: 'center'}}>Hello wariaciku</Text>
        <Button
          mode="contained"
          onPress={() => console.log('Wariacie kliknales')}
          style={{ margin: 20 }}
        >
          Kliknij
        </Button>

        <Text>Edit app/index.tsx to edit this screen.</Text>
      </PaperProvider>
    </View>
  );
}
