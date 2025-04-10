import { Link, router } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

export default function Inicio() {
  return (
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/474x/1c/a4/68/1ca468fb767e838e1cebf8904d15053f.jpg" }}
      style={styles.background}
    >
      <Text style={styles.title}> Bienvenido</Text>
      <View style={styles.nav}>
      
        <Link href="/rickandmorty/(characters)"  asChild >
          <Pressable style={styles.button}>
            <Text style={styles.text}>Personajes</Text>
          </Pressable>
        </Link>

        <Link href="/rickandmorty/(episodes)"  asChild >
          <Pressable style={styles.button}>
            <Text style={styles.text}>Episodios</Text>
          </Pressable>
        </Link>

        <Link href="/rickandmorty/(locations)"  asChild >
          <Pressable style={styles.button}>
            <Text style={styles.text}>Ubicacion</Text>
          </Pressable>
        </Link>

        <Link href="/rickandmorty/(info)" asChild >
          <Pressable style={styles.button}>
            <Text style={styles.text}>Acerca de</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.button} onPress={() => router.back()}>
              <Text style={styles.text}>Regresar</Text>
            </Pressable>

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
    fontSize: 26,
    fontWeight: "bold",
    color: "#00FF88",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
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
    backgroundColor: "#1F2326",
    width: 200,
    height: 60,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#00FF88",
  },
  text: {
    color: "#00FF88",
    fontSize: 20,
    fontWeight: "bold",
  },
});