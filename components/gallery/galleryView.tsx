import React, { useState } from "react";
import { FlatList, Image, StyleSheet, View, ImageBackground } from "react-native";
import { ImagePicker } from "../imagePicker";

export function GaleryView() {
  const [images, setImages] = useState<string[]>([]);

  const newPhoto = (uri: string) => {
    setImages([...images, uri]);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/23/44/ff/2344ff68c03a2b12fc66f578ca986008.jpg' }} // Imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <ImagePicker
          // Pasar la función para recibir la imagen
          photo={newPhoto}
        />

        {/* Mostrar el grid o galería de imágenes */}
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Asegura que la imagen de fondo cubra toda la pantalla
    resizeMode: 'cover', // La imagen se ajustará para cubrir toda la pantalla sin distorsionar
    justifyContent: 'center', // Centra el contenido si es necesario
    opacity: 0.8, // Le damos un filtro sutil para que los elementos de la galería resalten más
  },
  container: {
    flex: 1, // Asegura que el contenedor se expanda para cubrir toda la pantalla
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fondo oscuro translúcido para que las imágenes resalten más
    margin: 10, // Espaciado en los bordes de la pantalla
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 15, // Bordes redondeados para las imágenes
    overflow: 'hidden', // Asegura que las imágenes se recorten bien
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Sombra en Android
  },
  image: {
    width: '100%',
    height: 150, // Ajusta el tamaño de las imágenes
    borderRadius: 10, // Bordes redondeados para las imágenes
    resizeMode: 'cover', // Asegura que las imágenes se ajusten bien sin distorsión
  },
});
