import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

export default function OnboardingScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tomato-hand.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Pantau Tomatmu Menggunakan AI</Text>
      <Text style={styles.description}>
        Tingkatkan kualitas tanamanmu dengan mengatasi penyakit sejak dini
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.text}>Ambil Gambar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C7FF8E',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontFamily: 'Roboto-Bold',
    color: '#122300',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    margin: 64,
    width: '70%',
  },
  button: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7FFF00',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    width: '70%',
  },
  image: {
    width: '100%',
    height: 410,
    resizeMode: 'contain',
  },
});
