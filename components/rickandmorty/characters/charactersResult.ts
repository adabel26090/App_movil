// characterResult.ts  
import { Character } from "./characterType";

// Tipo que define la estructura de la respuesta al obtener personajes
export type CharacterResult = {
    info: {
        count: number;  // Número total de personajes disponibles en la API
        pages: number;  // Total de páginas disponibles para la consulta de personajes
        next: string | null;  // URL de la siguiente página de resultados, o null si no hay más páginas
        prev: string | null;// URL de la página anterior de personajes (opcional)
    },
    results: Character[];  // Arreglo de personajes obtenidos en la respuesta, de tipo 'Character'
};
