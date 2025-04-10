import { Ionicons } from "@expo/vector-icons"; 
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"; 
type Props = { 
icon: any, 
title: string, 
granted: boolean, 
requestPermission: () => void; 
} 
export function PermissionLayout( 
{ icon, title, granted, requestPermission }: Props) { 
    return ( 
        <View style={styles.container}> 
            <Ionicons name={icon} size={32} color={"#4b0082"} /> 
            <Text style={styles.title}>{title}</Text> 
            {granted ? ( 
                <Ionicons 
                    name="checkmark-sharp" 
                    size={32} 
                    color="green" 
                    style={styles.checkIcon} 
                /> 
            ) : ( 
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={requestPermission} 
                > 
                    <Text style={styles.buttonText}>Autorizar</Text> 
                </TouchableOpacity> 
            )} 
        </View> 
    ); 
} 

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",  // Muestra los elementos en una fila
      alignItems: "center",  // Alinea los elementos al centro
      marginVertical: 10,    // Espaciado vertical entre cada elemento
      padding: 10,           // Espaciado interno
      backgroundColor: "#f0f0f0", // Fondo gris claro
      borderRadius: 10,      // Bordes redondeados
      shadowColor: "#000",   // Sombra para dar un poco de profundidad
      shadowOpacity: 0.1,    // Opacidad de la sombra
      shadowRadius: 10,      // Radio de la sombra
      elevation: 5,          // Sombra en Android
    },
    title: {
      flex: 1,               // Toma el espacio restante
      fontSize: 18,          // Tamaño de la fuente
      fontWeight: "500",     // Negrita ligera
      color: "#333",         // Color de texto oscuro
    },
    checkIcon: {
      marginLeft: 10,        // Margen entre los iconos
    },
    button: {
        backgroundColor: "rgba(150, 15, 223, 0.5)", // Color morado con 50% de opacidad
        paddingVertical: 8,          // Espaciado vertical del botón
        paddingHorizontal: 16,       // Espaciado horizontal
        borderRadius: 5,             // Bordes redondeados
      },      
    buttonText: {
      color: "#fff",              // Texto blanco
      fontSize: 16,                // Tamaño del texto
      fontWeight: "600",           // Negrita media
      textAlign: "center",         // Centrado del texto
    },
  });