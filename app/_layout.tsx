import { auth } from '@/lib/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const noRegistrado = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
    });
    return noRegistrado;
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  useEffect(() => {
    if (loaded && user === null) {
      router.replace('/auth/login');
    }
  }, [loaded, user]);

  if (!loaded) return null;

  if (!user) {
    return (

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#222222' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="auth/login" options={{ title: 'Iniciar sesión' }} />
      </Stack>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home-outline" size={size} color="#4169e1" />
            ),
          }}
        />
        <Drawer.Screen
          name="(note)"
          options={{
            drawerLabel: 'Notas',
            title: 'Notas',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="document-text-outline" size={size} color="#00bfff" />
            ),
          }}
        />
        <Drawer.Screen
          name="(permissions)"
          options={{
            drawerLabel: 'Permisos',
            title: 'Permisos',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="lock-closed-outline" size={size} color="#ff1493" />
            ),
          }}
        />
        <Drawer.Screen
          name="history"
          options={{
            drawerLabel: 'GPS',
            title: 'GPS',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="location-outline" size={size} color="#808080" />
            ),
          }}
        />
        <Drawer.Screen
          name="rickandmorty"
          options={{
            drawerLabel: 'Rick & Morty',
            title: 'Rick & Morty',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="planet-outline" size={size} color="#ff00ff" />
            ),
          }}
        />

        {/* Drawer screen for the Camera page */}
        <Drawer.Screen
          name="camara/index"
          options={{
            drawerLabel: 'Galería',
            title: 'Galería',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="camera" size={size} color="#ff00ff" />
            ),
          }}
        />


        <Drawer.Screen
          name="auth/login"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'iniciar',
          }}
        />

        <Drawer.Screen
          name="auth/logOut"
          options={{
            drawerLabel: 'Cerrar  sesión',
            title: 'Cerrar',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="exit-outline" size={size} color="#ff00ff" />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
