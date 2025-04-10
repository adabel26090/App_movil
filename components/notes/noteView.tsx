import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ImageBackground, Pressable } from 'react-native';
import { Note } from './note';
import { NoteModal } from './noteModal';
import { DataSource } from './datasource';
import { router } from 'expo-router';

export default function NotesView() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editNote, setEditNote] = useState<Note | null>(null);
    const dataSource = new DataSource();

    useEffect(() => {
        dataSource.getNotes()
            .then((results) => {
                setNotes(results);
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);
            });
    }, []);

    const handleAddNote = () => {
        setEditNote({
            title: '',
            text: '',
            date: new Date(),
        });
    };

    const handleSaveNote = (note: Note) => {
        console.log('Guardar nota: ', note);

        dataSource.saveNote(note)
            .then((result) => {
                if (result === null) {
                    Alert.alert("No se agregó la nota.");
                    return;
                }

                if (!note.id) {
                    setNotes([...notes, result]);
                } else {
                    setNotes(
                        notes.map((item) =>
                            item.id === result.id ? result : item
                        )
                    );
                }
                setEditNote(null);
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);
            });
        setEditNote(null)
    }

    const handleDelete = useCallback((id: number) => {
        dataSource.deleteNote(id)
            .then((deleted) => {
                if (deleted) {
                    setNotes(notes.filter((item) => item.id !== id));
                } else {
                    Alert.alert("No se pudo eliminar la nota.");
                }
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);
            });
    }, [notes, dataSource]);

    const renderNote = ({ item }: { item: Note }) => (
        <TouchableOpacity
            onPress={() => setEditNote(item)}
            onLongPress={() => handleDelete(item.id || 0)}
        >
            <View style={styles.noteContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.text}</Text>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/474x/68/63/ec/6863ec6ad78a927dcaa0b773550c42a5.jpg' }}
            style={styles.background}
            onError={() => alert('Imagen de fondo no disponible.')}
        >
            <View style={styles.container}>
                 {/* Botón "Regresar" estilizado en la esquina superior derecha */}
                        <Pressable style={styles.backButton} onPress={() => router.back()}>
                          <Text style={styles.backText}>Regresar</Text>
                        </Pressable>
                <FlatList
                    data={notes}
                    renderItem={renderNote}
                    keyExtractor={(item) => item.id?.toString() || ""}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddNote}>
                    <Text style={styles.label}>Agregar Nota</Text>
                </TouchableOpacity>
                <NoteModal
                    note={editNote}
                    open={!!editNote}
                    onClose={() => setEditNote(null)}
                    onSave={handleSaveNote}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        width: '100%',
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    description: {
        fontSize: 14,
        marginVertical: 5,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20, // Espacio horizontal dentro del botón
        paddingVertical: 20, // Espacio vertical dentro del botón
        borderRadius: 10, // Bordes redondeados para el botón
        shadowColor: '#008080', // Sombra verde para el botón
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8, // Sombra para Android
    },
    label: {
        color: '#fffafa',
        fontSize: 20,
        textAlign: 'center', // Alinear el texto al centro

    },
    backButton: {
        position: 'absolute', // Lo posicionamos de forma absoluta en la parte superior
        top: 5, // Distancia desde la parte superior
        left: "40%", // Distancia desde la parte derecha
        backgroundColor: '#32cd32', // Color de fondo oscuro
        paddingHorizontal: 10, // Espacio horizontal dentro del botón
        paddingVertical: 5, // Espacio vertical dentro del botón
        borderRadius: 10, // Bordes redondeados para el botón
        shadowColor: '#3cb371', // Sombra verde para el botón
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Sombra para Android
      },
    
      // Estilos para el texto del botón "Regresar"
      backText: {
        color: '#fffafa', // Color del texto en verde brillante
        fontSize: 18, // Tamaño de la fuente
        fontWeight: 'bold', // Peso del texto 
      },
});
