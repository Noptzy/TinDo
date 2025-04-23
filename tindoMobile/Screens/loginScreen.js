import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Animated } from 'react-native';
import { API } from '../utils/api';
import Icon from 'react-native-vector-icons/Feather';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = new Animated.Value(1);
  const slideAnim = new Animated.Value(0); 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false, 
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false, 
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true, 
      }).start(() => {
        Alert.alert('Berhasil Login', `Selamat datang ${res.data.data.name}`);
        navigation.navigate('Home', { userName: res.data.data.name });
      });
    } catch (err) {
      Alert.alert('Gagal Login', err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }],
          width: '100%',
          alignItems: 'center' 
        }}
      >
        <Image source={require('../assets/tindoNoBg.png')} style={styles.logo} />

        <Text style={styles.title}>Selamat Datang di TinDo</Text>
        <Text style={styles.subtitle}>Fokus. Tertata. Tumbuh tiap hari.</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Kata Sandi"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}  // Menentukan apakah password tersembunyi
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerText}>
            Belum punya akun? <Text style={{ color: '#1F6FEB' }}>Daftar akun</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#9AA5B1',
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E293B',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#22C55E',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#9AA5B1',
    marginTop: 10,
  },
});
