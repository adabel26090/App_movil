import { getCurrentPositionAsync, LocationObject, useForegroundPermissions } from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import MapView, { Camera, Marker } from "react-native-maps";
import { registerLocation } from "./historyRegister";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

export function LocationView() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [permission, requestPermisson] = useForegroundPermissions();
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        async function getCurrentLocation() {
            if (permission?.granted) {
                try {
                    const result = await getCurrentPositionAsync({});
                    setLocation(result);
                    await registerLocation(result);
                } catch (error) {
                    console.error('Error al obtener la ubicación:', error);
                }
            }
        }
        getCurrentLocation();
    }, [permission]);

    useEffect(() => {
        async function showLocation() {
            if (!location || !mapRef.current) return;

            const camera = await (mapRef.current as any)?.getCamera() as Camera;
            camera.center = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            camera.zoom = 15;
            (mapRef.current as any)?.animateCamera(camera, { duration: 1000 });
        }

        showLocation();
    }, [location]);

    if (!permission?.granted) {
        return (
            <View style={style.permissionContainer}>
                <MaterialIcons name="location-off" size={50} color="#E74C3C" />
                <Text style={style.permissionText}>Debes permitir el acceso a la ubicación</Text>
                <Button
                    onPress={requestPermisson}
                    title="Permitir ubicación"
                    color="#27AE60"
                />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <View style={style.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={style.map}
                    initialRegion={{
                        latitude: location?.coords.latitude || 18.5955557,
                        longitude: location?.coords.longitude || -98.4907685,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Ubicación actual"
                            description="Esta es tu ubicación"
                            pinColor="#27AE60" // Verde
                        ></Marker>
                    )}
                </MapView>
            </View>

            <View style={style.infoContainer}>
                <View style={style.coordinatesContainer}>
                    <MaterialIcons name="gps-fixed" size={24} color="#34495E" ></MaterialIcons>
                    <Text style={style.coordinates}>
                        {location ? 
                            `Latitud: ${location.coords.latitude.toFixed(6)}\nLongitud: ${location.coords.longitude.toFixed(6)}` : 
                            "Obteniendo ubicación..."}
                    </Text>
                </View>

                <TouchableOpacity
                    style={style.historyButton}
                    onPress={() => router.push('/history')} // Esto redirige al historial
                >
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#27AE60',  // Verde
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 10,
    },
    mapContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    infoContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    coordinatesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F6F3', // Light Green
        padding: 18,
        borderRadius: 15,
        marginBottom: 20,
    },
    coordinates: {
        fontSize: 18,
        color: '#34495E',
        marginLeft: 12,
        flex: 1,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    permissionText: {
        fontSize: 18,
        marginVertical: 25,
        textAlign: 'center',
        color: '#34495E',
        fontWeight: '500',
    },
    historyButton: {
        backgroundColor: '#27AE60',  // Verde
        padding: 15,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonIcon: {
        marginRight: 10,
    },
    historyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    }
});
