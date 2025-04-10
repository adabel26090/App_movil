import { useCalendarPermissions } from "expo-calendar";
import { PermissionLayout } from "./permissionLayout";


export function CalendarioPermission() {
    const [permission, requestPermission] = useCalendarPermissions();

    return (
        <PermissionLayout
            icon="calendar-sharp"
            title="calendario"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    );
}