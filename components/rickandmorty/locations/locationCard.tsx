import { Image, Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native"; 
import { LinearGradient } from "expo-linear-gradient"; 
import { useState } from "react"; 
import { Locations } from "./locationType";

// Tipo para especificar las propiedades de LocationsCard
type Props = { 
    locations: Locations; 
};

// Componente principal para la tarjeta de locación
export function LocationsCard({ locations }: Props) { 
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    return ( 
        <TouchableOpacity style={styles.card} onPress={() => setShowModal(true)}> 
            {/* LinearGradient para agregar fondo con un degradado */}
            <LinearGradient 
                colors={['#bc8f8f', '#f4a460', '#c0c0c0']} 
                style={styles.card} 
            > 
                {/* Imagen de la tarjeta */}
                <Image 
                    style={styles.image} 
                    source={{ 
                        uri: 'https://i.pinimg.com/236x/22/2f/3f/222f3f5b7e7732289deb93de74b472be.jpg', 
                    }} 
                /> 

                {/* Contenedor para los datos de la locación */}
                <View style={styles.content}> 
                    <View> 
                        <Text style={styles.label}>Nombre</Text> 
                        <Text style={styles.textvalue}>{locations.name}</Text> 
                    </View>

                    <View> 
                        <Text style={styles.label}>Tipo</Text> 
                        <View style={styles.row}> 
                            <Text style={styles.textvalue}>{locations.type}</Text> 
                        </View> 
                    </View> 

                    <View> 
                        <Text style={styles.label}>Dimensión</Text> 
                        {/* Aquí se verifica si la longitud de 'dimension' es mayor a 20 para aplicar una clase con un tamaño más pequeño */}
                        <Text 
                            style={[
                                styles.textvalue, 
                                locations.dimension.length > 20 ? styles.smallText : undefined, 
                            ]}
                        >
                            {locations.dimension}
                        </Text> 
                    </View> 
                </View> 
            </LinearGradient> 

            {/* Modal para mostrar detalles de la locación */}
            <Modal 
                visible={showModal} 
                transparent={true} 
                animationType="slide" 
                onRequestClose={() => setShowModal(false)} // Cierra el modal al presionar el botón de retroceso (Android)
            > 
                <View style={styles.modalOverlay}> 
                    <View style={styles.modalContent}> 
                        {/* Imagen dentro del modal */}
                        <Image 
                            style={styles.imagemodal} 
                            source={{ 
                                uri: 'https://i.pinimg.com/236x/7f/d3/0e/7fd30ef3823ed642263a7fc6c52cf96f.jpg', 
                            }} 
                        /> 
                        <Text style={styles.modalTitle}>Detalles de la Locación</Text>

                        {/* Mostramos los detalles de la locación dentro del modal */}
                        <Text style={styles.label}>Nombre:</Text> 
                        <Text style={styles.textvalue}>{locations.name}</Text> 

                        <Text style={styles.label}>Tipo:</Text> 
                        <Text style={styles.textvalue}>{locations.type}</Text> 

                        <Text style={styles.label}>Dimensión:</Text> 
                        <Text style={styles.textvalue}>{locations.dimension}</Text> 

                        {/* Botón para cerrar el modal */}
                        <TouchableOpacity onPress={() => setShowModal(false)}> 
                            <Text style={styles.closeButton}>Cerrar</Text> 
                        </TouchableOpacity> 
                    </View> 
                </View> 
            </Modal> 
        </TouchableOpacity> 
    ); 
}

const styles = StyleSheet.create({ 
    // Estilo de la tarjeta principal
    card: { 
        flexDirection: "row", // Alineación horizontal de la tarjeta
        width: "100%", 
        height: "auto", 
        borderRadius: 8, 
        marginVertical: 5, 
        marginBottom: 10, 
        overflow: 'hidden', 
    }, 

    // Estilo para la imagen en la tarjeta
    image: { 
        borderTopLeftRadius: 20,  // Redondear borde superior izquierdo 
        borderBottomLeftRadius: 15,  // Redondear borde inferior izquierdo 
        width: "50%", // 50% de ancho
        height: "100%", // 100% de altura
        objectFit: "cover", // Ajustar imagen sin deformarla
    }, 

    // Estilo para la imagen del modal
    imagemodal: { 
        borderTopLeftRadius: 20, 
        borderBottomLeftRadius: 15, 
        width: "50%", 
        height: "30%", 
        objectFit: "cover", 
    }, 

    // Contenedor de la información dentro de la tarjeta
    content: { 
        display: "flex", 
        flexDirection: "column", // Columna para alinear verticalmente
        marginLeft: 10, 
    }, 

    // Estilo para las etiquetas de texto (Nombre, Tipo, Dimensión)
    label: { 
        color: "#2d7096", 
        fontSize: 22, 
    }, 

    // Estilo para los valores de texto en la tarjeta
    textvalue: { 
        color: "black", 
        fontSize: 20, 
        fontWeight: "700", 
    }, 

    // Estilo para cuando el texto es más largo y se necesita reducir el tamaño
    smallText: { 
        fontSize: 12, 
    }, 

    // Estilo para organizar los elementos en fila
    row: { 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 5, 
    }, 

    // Estilo para el overlay del modal (fondo oscuro)
    modalOverlay: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
    }, 

    // Contenido dentro del modal
    modalContent: { 
        width: "60%",  // Hacemos que el modal ocupe el 60% del ancho de la pantalla
        height: "60%", 
        padding: 20, 
        backgroundColor: '#f5deb3', 
        borderRadius: 10, 
        alignItems: 'center', 
    }, 

    // Título del modal
    modalTitle: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: "#dc143c" 
    }, 

    // Estilo para el botón de cerrar
    closeButton: { 
        marginTop: 20, 
        color: '#ff0000', 
        fontSize: 18, 
        textDecorationLine: 'underline', 
    }, 
});
