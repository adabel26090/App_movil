import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable, Text, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Personajes',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={"black"} />,
        }}
      />
       {/* Aquí es donde colocamos el botón "Regresar" */}
       {() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable style={styles.button} onPress={() => router.back()}>
              <Text style={styles.text}>Regresar</Text>
            </Pressable>
          </View>
        )}

      <Tabs.Screen
        name="scroll"
        options={{
          title: 'Scroll',
          tabBarIcon: () => <IconSymbol size={28} name="paperplane.fill" color={"black"} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1F2326',
    width: 200,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#00FF88',
    marginTop: 20,
    alignSelf: 'center', // Centra el botón
  },
  text: {
    color: '#00FF88',
    fontSize: 20,
    fontWeight: 'bold',
  },
});