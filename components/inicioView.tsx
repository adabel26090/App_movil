import { Link } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 👈 Asegúrate de tener esto instalado

export default function InicioView() {
  return (
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/736x/e6/75/ba/e675bac9d467bef0cae29731f4698295.jpg" }}
      style={styles.background}
    >
      <Text style={styles.title}>Bienvenido</Text>
      <View style={styles.nav}>

        <Link href="/(permissions)" asChild>
          <Pressable style={styles.button}>
            <Ionicons name="lock-closed-outline" size={24} color="#ffd700" style={styles.icon} />
            <Text style={styles.text}>Permisos</Text>
          </Pressable>
        </Link>

        <Link href="/(note)" asChild>
          <Pressable style={styles.button}>
            <Ionicons name="document-text-outline" size={24} color="#ffd700" style={styles.icon} />
            <Text style={styles.text}>Notas</Text>
          </Pressable>
        </Link>

        <Link href="/history" asChild>
          <Pressable style={styles.button}>
          <Ionicons name="location-outline" size={24} color="#ffd700" style={styles.icon}/>
          <Text style={styles.text}>Historial</Text>
          </Pressable>
        </Link>

        <Link href="/rickandmorty" asChild>
          <Pressable style={styles.button}>
            <Ionicons name="planet-outline" size={24} color="#ffd700" style={styles.icon} />
            <Text style={styles.text}>Rick and Morty</Text>
          </Pressable>
        </Link>

        <Link href="/camara" asChild>
          <Pressable style={styles.button}>
          <Ionicons name="camera" size={24} color="#ffd700" style={styles.icon} />
            <Text style={styles.text}>camara</Text>
          </Pressable>
        </Link>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffff00",
    textShadowColor: "rgba(254, 11, 11, 0.48)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  nav: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#1F2326",
    width: 250,
    height: 60,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff0000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ff4500",
    gap: 10,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "#ffd700",
    fontSize: 20,
    fontWeight: "bold",
  },
});
