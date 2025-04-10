import { useEffect, useState } from "react";
import { PermissionLayout } from "./permissionLayout";
import { PermissionResponse } from "expo-calendar";
import { getPermissionsAsync, requestPermissionsAsync } from "expo-contacts";

export function GaleriaPermission(){
const [permission,setPermission ] = useState<PermissionResponse | undefined> (undefined);

const requestPermission =() => {
    requestPermissionsAsync()
    .then((result)=>{
        setPermission(result);
    });

}

useEffect(()=>{
    async function getPermissionStatus() {
        let result = await getPermissionsAsync ();
      setPermission(result)    
    }
    getPermissionStatus();
},[]);

    return(
        <PermissionLayout
        icon="image-outline"
        title="Galeria"
        granted = {permission?.granted || false }
        requestPermission={requestPermission}
        />
    );
}