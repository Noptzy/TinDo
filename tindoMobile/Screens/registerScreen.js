import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { API } from '../utils/api';
import Icon from 'react-native-vector-icons/Feather'; // Mengimport icon untuk mata

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Menyimpan status apakah password terlihat

  const handleRegister = async () => {
    try {
      const res = await API.post('/auth/register', { name, email, password });

      Alert.alert('Registrasi Berhasil', 'Silakan login untuk melanjutkan.');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Gagal Registrasi', err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/tindoNoBg.png')} style={styles.logo} />

      <Text style={styles.title}>Daftar Akun</Text>
      <Text style={styles.subtitle}>Fokus. Tertata. Tumbuh tiap hari.</Text>

      <TextInput
        placeholder="Nama"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Kata Sandi"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}  // Menentukan apakah password tersembunyi
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerText}>
          Sudah punya akun? <Text style={{ color: '#1F6FEB' }}>Masuk</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
