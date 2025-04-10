import { Image, Text, View, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Episodes } from "./episodesType";

// Tipo para especificar las propiedades de characterCard
type Props = {
  episodes: Episodes;
};

// Tarjeta de episodio
export function EpisodesCard({ episodes }: Props) {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Estructura de la tarjeta
  return (
    <TouchableOpacity style={styles.card} onPress={() => setShowModal(true)}>
      {/* LinearGradient para darle un fondo de color degradado a la tarjeta */}
      <LinearGradient colors={['#90ee90', '#4169e1', '#00ff00']} style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://i.pinimg.com/236x/71/4c/de/714cde1442b1fcda9d79f0e029007af5.jpg',
          }}
          resizeMode="cover" // Ajuste adecuado de la imagen
        />
        <View style={styles.content}>
          {/* Nombre del episodio */}
          <View>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.textvalue}>{episodes.name}</Text>
          </View>

          {/* Fecha de estreno */}
          <View>
            <Text style={styles.label}>Fecha de estreno:</Text>
            <Text style={styles.textvalue}>{episodes.air_date}</Text>
          </View>

          {/* Episodio */}
          <View>
            <Text style={styles.label}>Episodio:</Text>
            <Text style={[styles.textvalue, episodes.episode.length > 20 ? styles.smallText : undefined]}>
              {episodes.episode}
            </Text>
          </View>

          {/* Fecha de creación */}
          <View>
            <Text style={styles.label}>Creación:</Text>
            <Text style={[styles.textvalue, episodes.created.length > 20 ? styles.smallText : undefined]}>
              {episodes.created}
            </Text>
          </View>

          {/* Número de personajes */}
          <View>
            <Text style={styles.label}>N° de Personajes:</Text>
            <Text style={[styles.textvalue, episodes.characters.length > 20 ? styles.smallText : undefined]}>
              {episodes.characters.length}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Modal para mostrar detalles del episodio */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)} // Cierra el modal al presionar el botón de retroceso (Android)
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              style={styles.imagemodal}
              source={{
                uri: 'https://i.pinimg.com/474x/32/62/05/326205f1d6efa16e1f58a2857cbad918.jpg',
              }}
              resizeMode="cover" // Ajuste adecuado de la imagen
            />
            <Text style={styles.modalTitle}>Detalles del Episodio</Text>

            {/* Detalles del episodio en el modal */}
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.textvalue}>{episodes.name}</Text>

            <Text style={styles.label}>Fecha de estreno:</Text>
            <Text style={styles.textvalue}>{episodes.air_date}</Text>

            <Text style={styles.label}>Episodio:</Text>
            <Text style={styles.textvalue}>{episodes.episode}</Text>

            <Text style={styles.label}>Creación:</Text>
            <Text style={styles.textvalue}>{episodes.created}</Text>

            <Text style={styles.label}>N° de Personajes:</Text>
            <Text style={styles.textvalue}>{episodes.characters.length}</Text>

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

// Estilos para los componentes
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    borderRadius: 8,
    marginVertical: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 15,
    width: "25%",
    height: "auto",
    resizeMode: "cover", // Asegura que la imagen se ajuste correctamente
  },
  imagemodal: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 15,
    width: "50%",
    height: "30%",
    resizeMode: "cover", // Ajuste adecuado para la imagen en el modal
  },
  content: {
    width: "55%",
    flexDirection: "column",
    marginLeft: 10,
  },
  label: {
    color: "#000000",
    fontSize: 18,
  },
  textvalue: {
    color: "#0000ff",
    fontSize: 15,
    fontWeight: "700",
  },
  smallText: {
    fontSize: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para el modal
  },
  modalContent: {
    width: "50%",
    height: "65%",
    padding: 20,
    backgroundColor: '#98fb98',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#dc143c",
  },
  closeButton: {
    marginTop: 20,
    color: '#ff0000',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

