import { firebase_db } from "@/lib/firebase";
import { LocationObject } from "expo-location";
import { collection, addDoc } from "firebase/firestore";

export async function registerLocation(location: LocationObject) {
    try {
        const docRef = await addDoc(collection(firebase_db, "locations"), {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: new Date(),
            accuracy: location.coords.accuracy,
            altitude: location.coords.altitude,
            altitudeAccuracy: location.coords.altitudeAccuracy,
            heading: location.coords.heading,
            speed: location.coords.speed,
        });
        console.log("Ubicación registrada con ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al registrar la ubicación: ", error);
        throw error;
    }
}
