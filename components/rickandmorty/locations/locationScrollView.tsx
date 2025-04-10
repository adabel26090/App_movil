import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text,  
    TouchableOpacity, View } from "react-native"; 
import { Navigator } from "expo-router"; 
import { useEffect, useRef, useState } from "react"; 
import { DataSource } from "./datasource";  
import { LocationsResult } from "./locationResult";
import { LocationsCard } from "./locationCard";

export function LocationsScrollView() {  
    // Definir los estados del componente
    const [loading, setLoading] = useState(false);  // Estado que indica si los datos están cargando
    const [page, setPage] = useState(1);  // Página actual para la carga de los personajes
    const [data, setData] = useState<LocationsResult>({  // Datos de los personajes y la información adicional
        info: {
            pages:0,
            count: 0,  // Total de personajes disponibles
            next: null,  // URL para la siguiente página de resultados (si existe)
            prev: null,  // URL para la página anterior de resultados (si existe)
        },
        results: [],  // Arreglo que contiene los personajes cargados
    });

    // Instancia de la fuente de datos (DataSource) para obtener los personajes
    const dataSource = new DataSource();  

    // Referencia para la FlatList (permite acceder a métodos de la lista como desplazamiento)
    const flatListRef = useRef(null);  

    // Función que se llama cuando se llega al final de la lista
    const handleEndReached = () => {  
        // Si hay una página siguiente y no se está cargando, incrementamos la página
        if (data.info.next && !loading) {  
            setPage(page + 1);  // Aumenta la página para cargar más personajes
        }  
    };

    // useEffect que se ejecuta cuando cambia la página (se cargan más personajes)
    useEffect(() => {  
        setLoading(true);  // Indicamos que se está cargando
        // Llamada a la función que obtiene los personajes de la página actual
        dataSource.getCharacters(page)
            .then((response) => {  
                // Se actualizan los datos manteniendo los personajes previos y agregando los nuevos
                setData((prevData) => ({
                    results: [...prevData.results, ...response.results],  // Concatenamos los personajes anteriores con los nuevos
                    info: response.info,  // Actualizamos la información de la paginación
                }));
            })  
            .catch((error) => {  
                // En caso de error, mostramos una alerta
                Alert.alert(`Error: ${error.mensaje}`);
            })  
            .finally(() => {  
                setLoading(false);  // Ya no se está cargando
            });  
    }, [page]);  // Se vuelve a ejecutar cuando cambia la página

    return (  
        <SafeAreaView style={styles.content}>  {/* Contenedor principal */}
            <View style={styles.nav}>  
                <Text style={styles.textvalue}>  
                    Personajes {data.results.length} de {data.info.count}  
                </Text>  
            </View>  

            {/* Si está cargando, muestra el indicador de carga */}
            {loading ? (  
                <ActivityIndicator size="large" />  
            ) : null}  

            {/* FlatList muestra la lista de personajes */}
            <FlatList  
                data={data.results}  // Los personajes a mostrar
                renderItem={({ item }) => (  
                    <LocationsCard locations={item} />  // Renderiza una tarjeta para cada personaje
                )}  
                keyExtractor={item => item.id.toString()}  // La clave única para cada elemento es el ID del personaje
                ref={flatListRef}  // Referencia para la lista
                onEndReached={handleEndReached}  // Función que se ejecuta al llegar al final de la lista
                onEndReachedThreshold={0.5}  // Umbral para considerar que se llegó al final (50% de la lista)
                refreshing={loading}  // Muestra el indicador de carga cuando está refrescando
                ListFooterComponent={loading  // Muestra el indicador de carga al final si está cargando
                    ? <ActivityIndicator size="large" />  
                    : undefined
                }  
            />  
        </SafeAreaView>  
    );  
}  

// Estilos para los elementos en la pantalla
const styles = StyleSheet.create({     
    content: {         
        marginTop:1,  // Espaciado en la parte superior
        padding: 8,  // Padding general
        width: "100%",  // Ancho completo de la pantalla
        height: "100%",  // Altura completa de la pantalla
        backgroundColor: "#ffe4c4",  // Fondo color durazno claro
    },     
    nav: {         
        display: "flex",  // Usar un contenedor flexible
        flexDirection: "row",  // Disposición de los elementos en fila
        justifyContent: "center",  // Centrar los elementos horizontalmente
        alignItems: "center",  // Centrar los elementos verticalmente
        marginBottom: 2,  // Espaciado en la parte inferior
        backgroundColor: "#40e0d0",  // Fondo azul verdoso
        height: 60,  // Altura de la barra de navegación
    },     
    textvalue: {         
        fontSize: 16,  // Tamaño de la fuente
        color: '#000000',  // Color del texto (negro)
        fontWeight: 'bold',  // Negrita
        fontStyle: 'italic',  // Estilo en cursiva
        textAlign: 'center',  // Alineación centrada
        letterSpacing: 1,  // Espaciado entre letras
    },  
    button: {         
        paddingVertical: 16,  // Espaciado vertical
        paddingHorizontal: 8,  // Espaciado horizontal
        backgroundColor: "orange",  // Fondo naranja
        borderRadius: 8,  // Bordes redondeados
    },     
    textButton: {         
        color: "#fff",  // Color del texto (blanco)
        fontSize: 14,  // Tamaño de la fuente
        fontWeight: 900,  // Peso de la fuente (muy gruesa)
    },     
    disabled: {         
        opacity: 0.6,  // Opacidad reducida para botones deshabilitados
    }  
});
