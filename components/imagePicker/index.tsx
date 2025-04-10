import React, { useState } from "react";
import { Alert, Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TakePictureView } from "./takePictureView";
import { PhotoPreview } from "./photoPreview";
import * as PhotoPicker from 'expo-image-picker';

type Props = {
    photo: (uri: string) => void;
};

export function ImagePicker({ photo }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const { width } = Dimensions.get('window');

    const onPictureTaked = (uri?: string) => {
        setImage(uri);
        setCameraOpen(false);
    };

    const onNewPhoto = () => {
        setImage(undefined);
        setCameraOpen(true);
    };

    const onSavePhoto = (uri: string) => {
        photo(uri);
        setModalVisible(false); // Resetear los estados
        setImage(undefined); // Limpiar la imagen
        Alert.alert("¡Foto guardada!");
    };

    const pickImage = async () => {
        let result = await PhotoPicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const menuItems = (
        <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { width: width * 0.7 }]}>
                <Text style={styles.modalTitle}>Selecciona el origen de la imagen</Text>
                <TouchableOpacity
                    onPress={() => setCameraOpen(true)}
                    style={[styles.button, { backgroundColor: "#1E88E5" }]}
                >
                    <Text style={styles.buttonText}>Cámara</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={pickImage}
                    style={[styles.button, { backgroundColor: "#FF4081" }]}
                >
                    <Text style={styles.buttonText}>Galería</Text>
                </TouchableOpacity>
                <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={styles.textWhite}>Cerrar</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>¡Captura una Foto!</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
                    <Ionicons name="camera-sharp" size={60} color="#FF4081" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {!cameraOpen && !image ? menuItems : null}

                {cameraOpen ? (
                    <TakePictureView
                        onClose={() => setCameraOpen(false)}
                        onTakePicture={onPictureTaked}
                    />
                ) : null}

                {image ? (
                    <PhotoPreview
                        uri={image}
                        onCancel={() => setImage(undefined)}
                        onSave={onSavePhoto}
                        onNewPhoto={onNewPhoto}
                    />
                ) : null}
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
        color: '#f8f8ff',
        textTransform: 'uppercase',
    },
    iconContainer: {
        backgroundColor: '#FF4081', // Color vibrante para el icono
        padding: 20,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 30,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    button: {
        borderRadius: 10,
        width: 200,
        marginVertical: 10,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#1E88E5",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    textWhite: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
