import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [imagePicker, setImagePicker] = useState('');

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    // console.log(cameraRef.current);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate('Information', { photoUri: photo.uri });
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result.assets[0].uri);
    const photo = result.assets[0];
    // if (photo) {
    // const photo = await cameraRef.current.takePictureAsync();
    navigation.navigate('Information', { photoUri: photo.uri });
    // }
    // if (!result.cancelled) {
    //   setImagePicker(result.uri);
    // }
  };

  // return (
  //   <View style={styles.container}>
  //     <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
  //       <View style={styles.buttonContainer}>
  //         <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
  //           <Text style={styles.text}>Flip Camera</Text>
  //           {/* <Text style={styles.text}>Take Picture</Text> */}
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.button} onPress={takePicture}>
  //           <Text style={styles.text}>Take Picture</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
  //           <Text style={styles.text}>Upload Picture</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </CameraView>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      {/* Camera Overlay */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

        {/* Overlay with upload button */}
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImagePicker}
          >
            <Image
              source={require('../assets/image.svg')} // Replace with your upload icon path
              style={styles.uploadIcon}
            />

            {/* <Text style={styles.uploadText}>upload</Text> */}
          </TouchableOpacity>
          <Text style={styles.uploadText}>take a picture</Text>
        </View>

        {/* Capture Button */}
        <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
      </View>

      {/* {uploadedImage && (
        <Image source={{ uri: uploadedImage }} style={styles.preview} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   // backgroundColor: '#C7FF8E',
  // },
  // cameraContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // message: {
  //   textAlign: 'center',
  //   paddingBottom: 10,
  // },
  // camera: {
  //   flex: 1,
  // },
  // buttonContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   backgroundColor: 'transparent',
  //   margin: 64,
  // },
  // button: {
  //   flex: 1,
  //   alignSelf: 'flex-end',
  //   alignItems: 'center',
  //   backgroundColor: 'black',
  // },
  // text: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
  container: {
    flex: 1,
    // backgroundColor: '#C7FF8E',
    backgroundColor: 'rgb(199, 255, 142)',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '80%',
    height: '70%',
    // borderRadius: 10,
    // overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 10,
    width: '80%',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  uploadText: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'black',
  },
  preview: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
});
