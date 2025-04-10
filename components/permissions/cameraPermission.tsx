import { PermissionLayout } from "./permissionLayout";
import { CameraView, useCameraPermissions } from 'expo-camera';


export function CameraPermission(){
const [permission,requestPermission ] = useCameraPermissions();

    return(
        <PermissionLayout
        icon="camera-reverse"
        title="camara"
        granted = {permission?.granted || false }
        requestPermission={requestPermission}
        />
    );
}