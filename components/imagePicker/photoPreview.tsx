import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";

//este componente debe guardar, mostrar o calcelr la foto
type Props = {
    uri: string;
    onSave: (uri: string) => void;
    onCancel: () => void;
    onNewPhoto: () => void;
}
export function PhotoPreview({ uri, onSave, onCancel, onNewPhoto }: Props) {
    const { width, height } = Dimensions.get('window');
    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onCancel}
                >
                    <Ionicons
                        name="close"
                        size={30}
                        color="#FFF"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSave(uri)}>
                    <Ionicons
                        name="save-outline"
                        size={30}
                        color="#FFF"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onNewPhoto}>
                    <Ionicons
                        name="image-outline"
                        size={30}
                        color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flex: 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        
    }
});