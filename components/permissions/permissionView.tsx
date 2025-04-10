import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native"; 
import { CameraPermission } from "./cameraPermission"; 
import { CalendarioPermission } from "./calendarPermission"; 
import { GaleriaPermission } from "./galeriaPermission"; 
import { LocationPermission } from "./locationPermission"; 
import { MicrofonoPermission } from "./microfonoPermission"; 
import { ContactosPermission } from "./contactosPermission"; 

// Usando una URL remota para la imagen de fondo
const backgroundImageUrl = 'https://i.pinimg.com/736x/d9/ff/2c/d9ff2c28381f56004d884e9ee6c53a9b.jpg';

export function PermissionView() {
  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.container}>
      <Text style={styles.title}>Permisos</Text>
      <View style={styles.permissionsContainer}>
        <CameraPermission />
        <CalendarioPermission />
        <ContactosPermission />
        <GaleriaPermission />
        <LocationPermission />
        <MicrofonoPermission />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                           // Toma todo el espacio disponible
    padding: 20,                       // Espaciado alrededor del contenido
    justifyContent: "flex-start",      // Alinea los elementos al principio
    paddingTop: 40,                    // Espaciado extra en la parte superior para más aire
    backgroundColor: "transparent",    // Fondo transparente para que se vea la imagen
  },
  title: {
    fontSize: 30,                      // Título más grande y llamativo
    fontWeight: "bold",                // Negrita
    color: "#FF6F61",                  // Color llamativo (naranja-rosado)
    textAlign: "center",               // Centra el texto
    marginBottom: 20,                  // Espaciado debajo del título
    textTransform: "uppercase",        // Mayúsculas para más impacto
    letterSpacing: 1.2,                // Espaciado entre letras
  },
  permissionsContainer: {
    marginTop: 20,                     // Espaciado entre el título y las tarjetas de permisos
  },
  permissionBox: {
    backgroundColor: "#333",           // Fondo oscuro de las cajas de permisos
    marginBottom: 15,                  // Espaciado entre las cajas
    padding: 15,                       // Padding dentro de las cajas
    borderRadius: 12,                  // Bordes redondeados
    flexDirection: "row",              // Para alinear íconos y texto horizontalmente
    alignItems: "center",              // Centra los elementos dentro de la caja
    shadowColor: "#000",               // Sombra para el efecto 3D
    shadowOpacity: 0.1,                // Transparencia de la sombra
    shadowOffset: { width: 0, height: 5 },  // Desplazamiento de la sombra
    shadowRadius: 5,                   // Radio de la sombra
  },
  permissionText: {
    color: "#FFF",                     // Texto blanco para el contraste
    fontSize: 18,                       // Tamaño de fuente adecuado
    marginLeft: 15,                     // Espaciado entre el icono y el texto
    flex: 1,                            // Hace que el texto ocupe el espacio restante
  },
  button: {
    backgroundColor: "#FF6F61",        // Color vibrante para los botones
    paddingVertical: 10,                // Padding vertical
    paddingHorizontal: 20,              // Padding horizontal
    borderRadius: 25,                  // Bordes redondeados en los botones
    marginTop: 10,                     // Margen superior para separación
  },
  buttonText: {
    color: "#FFF",                     // Texto blanco
    fontWeight: "bold",                 // Negrita
    textAlign: "center",               // Centrado
    fontSize: 16,                       // Tamaño adecuado para el texto
  }
});
