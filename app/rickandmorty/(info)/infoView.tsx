import { router } from "expo-router";
import { ImageBackground, Text, View, StyleSheet, Image, Pressable } from "react-native";

// Componente InfoView que contiene la información de la persona
export default function InfoView() {
  return (
    // Imagen de fondo con el estilo ajustado
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/e6/70/79/e670790a410de3d478caf17b17af2dfe.jpg' }}
      style={styles.container} // Aplica los estilos definidos en el objeto styles
    >
      {/* Contenedor de texto que contiene la información de la persona */}
      <View style={styles.textContainer}>

        {/* Botón "Regresar" estilizado en la esquina superior derecha */}
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Regresar</Text>
        </Pressable>

        {/* Título con el nombre de la persona */}
        <Text style={styles.title}>Dalia Adabella Ortiz Quiroz</Text>

        {/* Imagen de perfil circular */}
        <Image
          source={{ uri: 'https://i.pinimg.com/236x/01/fe/38/01fe38ab345b215d300ce9bd34467a0c.jpg' }}
          style={styles.profileImage}
        />

        {/* Descripción personal */}
        <Text style={styles.description}>
          Hola, soy estudiante en la Universidad Tecnológica de Izucar de Matamoros, cursando el 5to cuatrimestre de la carrera en Desarrollo de Software Multiplataforma. A lo largo de mi trayectoria académica, he adquirido una amplia variedad de conocimientos que me han permitido desarrollar esta interfaz móvil. En el proceso, he aprendido de mis errores, corrigiéndolos y aplicando buenas prácticas para mejorar mis habilidades.
          Mis pasatiempos favoritos son dibujar y escuchar música, actividades que disfruto especialmente cuando necesito desconectarme o relajarme.
        </Text>

        {/* Contenedor con la información personal */}
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>Fecha de nacimiento</Text>
          <Text style={styles.description}>26 de septiembre del 2005</Text>

          <Text style={styles.subtitle}>Número de teléfono</Text>
          <Text style={styles.description}>243-121-27-38</Text>

          <Text style={styles.subtitle}>Correo electrónico</Text>
          <Text style={styles.description}>adaort0905@gmail.com</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  // Estilos para el fondo de la pantalla
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    backgroundColor: 'rgba(28, 2261, 248, 0.4)', // Fondo con transparencia sutil
  },

  // Contenedor de texto principal
  textContainer: {
    width: '90%', // Ajusta el contenedor para no ocupar toda la pantalla
    height: "90%", // Altura ajustada al 90% de la pantalla
    padding: 20, // Añade espacio alrededor
    backgroundColor: 'rgba(97, 93, 93, 0.7)', // Fondo oscuro y sutil para mejorar la legibilidad
    borderRadius: 50, // Bordes redondeados para el contenedor
    alignItems: 'center', // Centra el contenido dentro del contenedor
  },

  // Estilos para el título (nombre)
  title: {
    fontSize: 19,
    color: 'white',
    marginTop: 40,  // Aquí se agrega el espacio superior
    fontWeight: 'bold',
    marginBottom: 10, // Añade espacio debajo del título
    textAlign: 'center', // Alinea el texto al centro
  },

  // Estilos para los subtítulos
  subtitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    marginBottom: 1, // Reduce el espacio debajo de los subtítulos
    textAlign: 'left', // Alineación izquierda para los subtítulos
    width: '100%', // Asegura que el subtítulo ocupe todo el ancho del contenedor
  },

  // Estilos para las descripciones (información de contacto y detalles)
  description: {
    fontSize: 13,
    color: 'white',
    justifyContent:"center",
    marginBottom: 5, // Espacio más pequeño entre descripciones
    textAlign: 'justify', // Alineación izquierda para las descripciones
    width: '100%', // Asegura que la descripción ocupe todo el ancho
  },

  // Estilos para la imagen de perfil (circular)
  profileImage: {
    width: 120, // Establece el tamaño de la imagen
    height: 130, // Establece la altura de la imagen
    borderRadius: 75, // Hace que la imagen tenga bordes redondeados y sea circular
    marginVertical: 10, // Añade espacio vertical arriba y abajo de la imagen
  },

  // Contenedor para la sección de información de contacto
  infoContainer: {
    width: '100%', // Ocupa todo el ancho disponible
    marginTop: 20, // Espacio entre la descripción y la sección de contacto
  },

  // Estilos para el botón "Regresar"
  backButton: {
    position: 'absolute', // Lo posicionamos de forma absoluta en la parte superior
    top: 5, // Distancia desde la parte superior
    right: 10, // Distancia desde la parte derecha
    backgroundColor: '#1F2326', // Color de fondo oscuro
    paddingHorizontal: 15, // Espacio horizontal dentro del botón
    paddingVertical: 10, // Espacio vertical dentro del botón
    borderRadius: 10, // Bordes redondeados para el botón
    shadowColor: '#00FF88', // Sombra verde para el botón
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Sombra para Android
  },

  // Estilos para el texto del botón "Regresar"
  backText: {
    color: '#00FF88', // Color del texto en verde brillante
    fontSize: 18, // Tamaño de la fuente
    fontWeight: 'bold', // Peso del texto 
  },
});
