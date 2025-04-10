import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase_db } from '@/lib/firebase';

interface Location {
    id: string;
    latitude: number;
    longitude: number;
    timestamp: Date;
}

export function HistoryMarketView() {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const q = query(
            collection(firebase_db, 'locations'),
            orderBy('timestamp', 'desc'),
            limit(15)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const locationData = snapshot.docs.map(doc => {
                const data = doc.data();
                let timestamp: Date;
                
                try {
                    if (data.timestamp instanceof Date) {
                        timestamp = data.timestamp;
                    } else if (data.timestamp && typeof data.timestamp === 'object' && 'seconds' in data.timestamp) {
                        // Si es un Timestamp de Firestore
                        timestamp = new Date(data.timestamp.seconds * 1000);
                    } else if (typeof data.timestamp === 'string') {
                        // Si es una cadena de fecha
                        timestamp = new Date(data.timestamp);
                    } else {
                        // Si no hay timestamp válido, usar la fecha actual
                        timestamp = new Date();
                    }
                } catch (error) {
                    console.error('Error al procesar timestamp:', error);
                    timestamp = new Date();
                }

                return {
                    id: doc.id,
                    ...data,
                    timestamp
                };
            }) as Location[];
            setLocations(locationData);
        });

        return () => unsubscribe();
    }, []);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <View style={styles.container}>
          
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: locations[0]?.latitude || 18.5955557,
                        longitude: locations[0]?.longitude || -98.4907685,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title={formatDate(location.timestamp)}
                            pinColor="#2ecc71"  // Verde
                        />
                    ))}
                </MapView>
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.locationItem}
                        onPress={()=>console.log("Soy un botòn")
                        }>
                            <MaterialIcons name="location-on" size={24} color="#2ecc71" /> {/* Verde */}
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationDate}>
                                    {formatDate(item.timestamp)}
                                </Text>
                                <Text style={styles.locationCoordinates}>
                                    {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2ecc71',  // Verde
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
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    mapContainer: {
        height: 280,
        margin: 15,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
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
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    listContent: {
        padding: 10,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 18,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#2ecc71',  // Verde
    },
    locationInfo: {
        marginLeft: 15,
        flex: 1,
    },
    locationDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 5,
    },
    locationCoordinates: {
        fontSize: 14,
        color: '#95a5a6',
    },
});
