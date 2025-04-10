//implementar clase datsuorce 
//metodo:getNotes => Promesa con Note[] 

import { supabase } from "@/lib/supabase";
import { Note } from "./note";

export class DataSource {
    constructor() { }

    async getNotes(): Promise<Note[]> {
        //desde supebase toma todas las notas 
        let { data: notes, error } = await supabase
            .from('notas')
            .select('*');

             // Si hay error, mostramos el mensaje y devolvemos un array vacío
        if (error) {
            console.error('Error al obtener las notas:', error);
            return [];
        }
        //retornanr los datos y la fecha (date)convertir de string a date 

        return notes?.map((item) => ({
            ...item,
            date: new Date(item.date)
        })) || [];
    }

    //funcion para guardar 
    async saveNote(note: Note): Promise<Note | null> {
        const { data, error } = await supabase
            //upsert:si ya existe se actualiza 
            //si no existe se inserta 
            .from('notas')
            .upsert(note)
            .select()

        //si data tiene valor,tomar el primer elemneto, sino retornar null 
console.log(data);

        if (data) {
            const saved = data[0];
            return {
                ...saved,
                date: new Date(saved.date)
            }
        }
        return null;
    }
    
    async deleteNote(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('notas')
            .delete()
            .eq('id', id);
        return !error;
    }
} 
