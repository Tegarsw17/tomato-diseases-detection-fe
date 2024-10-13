import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import mime from 'mime';

export default function InformationScreen({ route }) {
  const { photoUri } = route.params;
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sendImageToAPI = async () => {
      try {
        console.log(photoUri);
        // const newImageUri = 'file:///' + photoUri.split('file://').join('');
        // console.log(newImageUri);
        const formData = new FormData();
        formData.append('image', {
          uri: photoUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await fetch('http://192.168.194.184:8000/predict/', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = await response.json();
        setPrediction(data.predicted_class);
        setConfidence(data.confidence);
      } catch (error) {
        console.error('Error sending image to API:', error);
        setPrediction('Error occurred');
      } finally {
        setLoading(false);
      }
    };

    sendImageToAPI();
  }, [photoUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Captured Image</Text>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>Prediction:</Text>
          <Text style={styles.predictionText}>{prediction}</Text>
          <Text style={styles.predictionText}>{confidence} %</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  predictionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  predictionText: {
    fontSize: 16,
  },
});
