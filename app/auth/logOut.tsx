import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

export default function LogOut(){
    useEffect(() => {
        const LogOut = async () => {
            try {
                await signOut(auth);
                Alert.alert("Sesión cerrada");
                router.replace("/auth/login");
            }catch (error){
                console.error("Error al cerrar sesión", error);
            }
        };
        LogOut();
    }, [])
}