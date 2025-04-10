import {
    ActivityIndicator, Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text,
    TouchableOpacity, View
} from "react-native";
import { Navigator, router } from "expo-router";
import { useEffect, useState } from "react";
import { DataSource } from "./datasource";
import { EpisodesCard } from "./episodesCard";
import { EpisodesResult } from "./episodesResult";

export function EpisodesView() {
    // Definir el estado para el cargado de datos, la página actual y los datos de personajes
    const [loading, setLoading] = useState(false);  // Estado de carga
    const [page, setPage] = useState(1);  // Página actual, inicializada en la página 1
    const [data, setData] = useState<EpisodesResult>({
        info: {
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },
        results: [],
    });  // Estado para almacenar los resultados de la consulta a la API

    // Instancia de la clase DataSource que maneja las peticiones de datos
    const dataSource = new DataSource();

    // useEffect para cargar los personajes de la API al cambiar la página
    useEffect(() => {
        setLoading(true);  // Iniciar el estado de carga
        dataSource.getCharacters(page)
            .then((response) => {
                setData(response);  // Actualizar los datos con los resultados obtenidos
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);  // Mostrar alerta en caso de error
            })
            .finally(() => {
                setLoading(false);  // Detener el estado de carga
            });
    }, [page]);  // Se ejecuta cada vez que cambia la página

    return (
        <SafeAreaView style={styles.content}>
            {/* Barra de navegación para cambiar entre páginas */}
            <Pressable style={styles.button} onPress={() => router.back()}>
                <Text>Regresar</Text>
            </Pressable>
            <View style={styles.nav}>
                {/* Botón de "Anterior" */}
                <TouchableOpacity
                    style={[styles.button, data.info.prev === null ? styles.disabled : undefined]}
                    onPress={() => setPage(page - 1)}  // Disminuir la página
                    disabled={data.info.prev === null}  // Deshabilitar si no hay página anterior
                >
                    <Text style={styles.textButton}>Anterior</Text>
                </TouchableOpacity>

                {/* Texto que muestra la página actual */}
                <View>
                    <Text style={styles.textvalue}>Página {page} de {data.info.pages}</Text>
                </View>

                {/* Botón de "Siguiente" */}
                <TouchableOpacity
                    style={[styles.button, data.info.next === null ? styles.disabled : undefined]}
                    onPress={() => setPage(page + 1)}  // Aumentar la página
                    disabled={data.info.next === null}  // Deshabilitar si no hay página siguiente
                >
                    <Text style={styles.textButton}>Siguiente</Text>
                </TouchableOpacity>
            </View>

            {/* Indicador de carga si los datos están siendo obtenidos */}
            {loading ? (
                <ActivityIndicator size="large" />
            ) : null}

            {/* Mostrar lista de personajes obtenidos */}
            <FlatList
                data={data.results}  // Datos de personajes
                renderItem={({ item }) => (
                    <EpisodesCard episodes={item} />  // Renderizar cada personaje con su tarjeta
                )}
                keyExtractor={item => item.id.toString()}  // Usar el ID del personaje como key
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: 1,
        padding: 8,
        width: "100%",
        height: "100%",
        backgroundColor: "#ff1493",  // Color de fondo
    },
    nav: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",  // Distribuir botones de forma equidistante
        alignItems: "center",
        marginBottom: 3,
        backgroundColor: "#ff69b4",  // Color de fondo de la barra de navegación
        height: 80,
    },
    textvalue: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        letterSpacing: 1,
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: "white",  // Color de fondo del botón
        borderRadius: 8,
    },
    textButton: {
        color: "black",
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        letterSpacing: 1,
    },
    disabled: {
        opacity: 0.5,  // Reducir opacidad cuando el botón está deshabilitado
    },
});
