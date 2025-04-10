import { router } from "expo-router";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react'
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";

export function LoginView() {
  const [email, setEmail] = useState('daliaortiz2609@gmail.com')
  const [password, setPassword] = useState('12345678')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      if (!user) {
        Alert.alert("Error No se pudo autenticar el usuario.");
        return;
      }

      Alert.alert("Bienvenid@ a la aplicación")
      setEmail("");
      setPassword("");
      router.replace("/")

    } catch (error) {
      console.log(`Error ${error}`);
      Alert.alert("Error", "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={{uri:'https://i.pinimg.com/736x/b2/97/17/b29717b5f2df9d26a81d12cb0f532de1.jpg'}}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.contendButtons}>
        <View style={styles.spaceContent}>
          <View style={styles.apartado}>
            <Text style={styles.textLabel}>Correo:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
            <Text style={styles.textLabel}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          
        </View>
          <TouchableOpacity style={styles.botonSesion} disabled={loading} onPress={() => signInWithEmail()}>
            <Text style={styles.botonText} >Iniciar sesión</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  textLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: 'Black',
    fontWeight: 'bold'
  },
  contendButtons: {
    width: "70%",
    height: "60%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  input: {
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 16,
    padding: 4,
    paddingLeft: 7,
    width: "100%",
    height: 45,
    color: "black",
    backgroundColor: "rgba(216, 223, 255, 0.64)"
  },
  spaceContent: {
    gap: 10,
    width: "80%",
  },
  apartado: {
    gap: 7,
    flexDirection: "column"
  },
  botonSesion: {
    width: 200,
    height: 50,
    backgroundColor: "orange",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  botonText: {
    fontSize: 16,
  },
});