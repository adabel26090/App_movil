


export type Episodes = {
  id: number;
  name: string;
  air_date: string;
  episode: string; // Asegurándote de que 'episode' siempre sea una cadena
  created: string;
  characters: string[]; // Asegurándote de que 'characters' sea un arreglo de cadenas
}
