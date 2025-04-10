import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onClose: () => void;
  onTakePicture: (uri: string) => void
}

export function TakePictureView({onClose, onTakePicture} : Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      onTakePicture(photo?.uri);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView 
        ref={ref} 
        style={styles.camera} 
        facing={facing} 
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]} 
            onPress={() => onClose()}
          >
            <Ionicons name="close" size={35} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.captureButton]} 
            onPress={takePicture}
          >
            <Ionicons name="camera-outline" size={45} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.flipButton]} 
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse-outline" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#FFF',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  captureButton: {
    backgroundColor: '#ff5722', // Color vibrante para capturar
  },
  flipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
