// Importación de los tipos necesarios para manejar los resultados y personajes

import { EpisodesResult } from "./episodesResult";

// Definición de la clase DataSource que maneja la obtención de datos de la API
export class DataSource {
    
    // Constructor vacío, no tiene parámetros de inicialización
    constructor() {}

    // Método asincrónico para obtener los personajes desde la API
    // Este método recibe un número de página y devuelve un objeto de tipo CharacterResult
    async getCharacters(page: number): Promise<EpisodesResult> {
        
        // Realizamos la solicitud GET a la API de Rick & Morty, pasamos la página en la URL
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page || 1}`);
        
        // Retornamos la respuesta de la API convertida a formato JSON
        return response.json();
    }
}
