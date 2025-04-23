import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Homescreen';
import LoginScreen from './Screens/loginScreen';
import RegisterScreen from './Screens/registerScreen';

const Stack = createNativeStackNavigator();

function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('./assets/tindoNoBg.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>TinDo</Text>
      <Text style={styles.subtitle}>1% better every day</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Mulai</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E6F1E9',
  },
  subtitle: {
    fontSize: 16,
    color: '#9AA5B1',
    marginTop: 4,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
