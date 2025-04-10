import { useEffect, useState } from "react";
import { PermissionLayout } from "./permissionLayout";
import { getPermissionsAsync, PermissionResponse, requestPermissionsAsync } from "expo-contacts";
import * as Contacts from 'expo-contacts';


export function ContactosPermission() {
    const [permission, setPermission] = useState<PermissionResponse | undefined>(undefined);

    const requestPermission = () => {
        requestPermissionsAsync()
            .then((result) => {
                setPermission(result);
            });

    }

    useEffect(() => {
        async function getPermissionStatus() {
            let result = await getPermissionsAsync();
            setPermission(result)
        }
        getPermissionStatus();
    }, []);

    return (
        <PermissionLayout
            icon="people-outline"
            title="Contactos"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    );
}