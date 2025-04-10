// characterType.ts  
// Definir el tipo de personaje. Este tipo describe la estructura de un objeto de tipo 'Character'.
export type Character = {
    id: number;  // Identificador único del personaje.
    name: string;  // Nombre del personaje.
    status: "Alive" | "Dead" | "unknown";  // Estado del personaje. Puede ser "Alive" (Vivo), "Dead" (Muerto) o "unknown" (Desconocido).
    location: {
        name: string;  // Nombre de la ubicación en la que se encuentra el personaje.
    };
    origin: {
        name: string;  // Nombre del lugar de origen del personaje.
    };
    species: string;  // Especie del personaje, por ejemplo: "Humano", "Alienígena", etc.
    image: string;  // URL de la imagen que representa al personaje (imagen de perfil).
};
