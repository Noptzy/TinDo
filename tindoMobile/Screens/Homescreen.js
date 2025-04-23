import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  LinearGradient,
} from "react-native";

const HomeScreen = ({ route, navigation }) => {
  const { userName } = route.params;

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => navigation.navigate("Login"));
  };

  const motivationalQuotes = [
    "Kamu lebih kuat dari yang kamu kira!",
    "Setiap hari adalah kesempatan untuk menjadi lebih baik.",
    "Kesuksesan dimulai dari diri sendiri.",
    "Jangan menyerah, hari-hari indah sudah menunggu.",
    "Cobalah hari ini lebih baik dari kemarin!",
  ];

  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      
      <Animated.View
        style={[
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          styles.contentContainer
        ]}
      >
        <Image
          source={require("../assets/tindoNoBg.png")}
          style={styles.logo}
        />

        <View style={styles.welcomeContainer}>
          <Text style={styles.greeting}>Halo, {userName}!</Text>
          {/* <Text style={styles.title}>{userName}!</Text> */}
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>{randomQuote}</Text>
        </View>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Keluar</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    overflow: 'hidden',
  },
  backgroundCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    top: -100,
    right: -100,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    bottom: -50,
    left: -50,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: "contain",
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#A1A1AA',
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#A1A1AA",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#22C55E",
    width: "100%",
    paddingHorizontal: 40,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
