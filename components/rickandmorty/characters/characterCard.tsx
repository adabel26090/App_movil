import { Image, Text, View, StyleSheet } from "react-native"; 
import { Character } from "./characterType";  

// Definimos el tipo de las propiedades (Props) que espera el componente CharacterCard.
type Props = {     
  character: Character;  // Propiedad de tipo 'Character' que representa al personaje.
};  

// Componente CharacterCard
export function CharacterCard({ character }: Props) {   

  // Función para determinar el estilo según el estado del personaje
  const getStatus = () => {         
    switch (character.status) {             
      case "Alive":
        return styles.alive; // Si el estado es "Alive", devuelve el estilo 'alive'
      case "Dead":
        return styles.dead;  // Si el estado es "Dead", devuelve el estilo 'dead'
      case "unknown":
        return styles.unknown;  // Si el estado es "unknown", devuelve el estilo 'unknown'
      default:
        return styles.unknown;  // Valor por defecto en caso de que el estado no coincida con los anteriores.
    }  
  };

  // Estructura de la tarjeta de personaje
  return (  
    <View style={styles.card}>  {/* Contenedor principal de la tarjeta */}
      <Image  
        style={styles.image}  // Estilo para la imagen del personaje
        source={{ uri: character.image }}  // Fuente de la imagen obtenida de la URL del personaje
      />

      <View style={styles.content}>  {/* Contenedor de los detalles del personaje */}  

        {/* Nombre del personaje */}
        <View style={styles.content}>
          <Text style={styles.label}>Nombre:</Text>  
          <Text style={styles.textValue}>{character.name}</Text>  {/* Mostrar el nombre del personaje */}
        </View>  

        {/* Estado y Especie */}
        <View>
          <Text style={styles.label}>Status and Species:</Text>   
          <View style={styles.row}>  
            <View style={[styles.status, getStatus()]}> </View>  {/* Indicador de estado del personaje */}
            <Text style={styles.textValue}>
              {character.status} - {character.species}  {/* Mostrar estado y especie */}
            </Text>  
          </View>  
        </View>  

        {/* Ubicación */}
        <View>
          <Text style={styles.label}>Ubicación:</Text>  
          <Text 
            style={[styles.textValue, 
              character.location.name.length > 20 ? styles.smallText : undefined,  
            ]}
          >
            {character.location.name}  
          </Text>  
        </View>  

        {/* Origen */}
        <View>
          <Text style={styles.label}>Origen:</Text>  
          <Text 
            style={[styles.textValue, 
              character.origin.name.length > 20 ? styles.smallText : undefined,  // Ajustar tamaño del texto si el nombre del origen es largo
            ]}
          >
            {character.origin.name}  {/* Mostrar nombre del origen */}
          </Text>  
        </View>  
      </View>  
    </View>  
  );  
}  

// Estilos para la tarjeta de personaje
const styles = StyleSheet.create({     
  card: {         
    display: "flex",         
    flexDirection: "row",  // Dirección en fila para que la imagen esté a la izquierda y el texto a la derecha
    width: "100%",         
    height: 250,  // Altura de la tarjeta
    borderRadius: 8,  // Bordes redondeados
    borderWidth: 1,  // Borde de 1px
    borderColor: "black",  // Color del borde
    marginVertical: 5,  // Espaciado vertical
    marginBottom: 20,  // Espaciado en la parte inferior
    backgroundColor: "#ffc0cb",  // Fondo color rosa claro
  },     
  image: {  
    // Bordes redondeados en la parte izquierda
    borderTopLeftRadius: 20,  
    borderBottomLeftRadius: 15,  
    // 40% de ancho y 100% de altura
    width: "50%",         
    height: "100%",         
  },     
  content: {         
    display: "flex",         
    flexDirection: "column",  // Dirección en columna para los detalles
    marginLeft: 10,  // Espaciado entre la imagen y el contenido
  },     
  label: {         
    color: "#2d7096",  // Color del texto de las etiquetas
    fontSize: 18,  // Tamaño de la fuente
  },     
  textValue: {         
    color: "black",  // Color del texto de los valores
    fontSize: 15,  // Tamaño de la fuente
    fontWeight: "700",  // Peso de la fuente (negrita)
  },     
  smallText: {         
    fontSize: 12,  // Tamaño de la fuente más pequeño
  },     
  status: {         
    width: 15,  // Tamaño del círculo del estado
    height: 15,         
    borderRadius: 50,  // Hacerlo circular
    backgroundColor: "grey",  // Color de fondo por defecto
  },     
  alive: {         
    backgroundColor: "green",  // Color verde para estado "Alive"
  },     
  dead: {         
    backgroundColor: "red",  // Color rojo para estado "Dead"
  },     
  unknown: {         
    backgroundColor: "orange",  // Color naranja para estado "unknown"
  },     
  row: {         
    display: "flex",         
    flexDirection: "row",  // Dirección en fila para los elementos dentro de la fila
    alignItems: "center",  // Alineación vertical centrada
    gap: 5,  // Espaciado entre los elementos
  },  
});
