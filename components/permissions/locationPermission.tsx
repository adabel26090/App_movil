import { PermissionLayout } from "./permissionLayout";
import * as Location from 'expo-location';

export function LocationPermission(){
const [permission,requestPermission ] = Location.useForegroundPermissions();

    return(
        <PermissionLayout
        icon="location"
        title="ubicacion"
        granted = {permission?.granted || false }
        requestPermission={requestPermission}
        />
    );
}