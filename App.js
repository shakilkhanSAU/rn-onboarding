import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboading from './src/Onboarding/Onboading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Bakbak': require('./assets/fonts/BakbakOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Font is loading.. </Text>
      </View>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboading" component={Onboading} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

