import { useState, useEffect } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";
import { Note } from "./note";

// Propiedades para el modal 
type Props = {
    note: Note | null;
    open: boolean;
    onSave: (note: Note) => void;
    onClose: () => void;
};

export function NoteModal({
    note,
    open,
    onSave,
    onClose,
}: Props) {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleSave = () => {
        // Si no hay nota a editar, retorna 
        if (!note) return;

        // Mandar a llamar a la función onSave 
        onSave({
            ...note,
            title,
            text,
        });
    };

    //cada vez que cambie note cambiara  
    useEffect(() => {
        setTitle(note?.title || "");
        setText(note?.text || "");
    }, [note]);

    return (
        <View style={styles.modalContainer}>
            <Modal
                visible={open}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Title"
                            style={styles.input}
                        />
                        <TextInput
                            value={text}
                            onChangeText={setText}
                            placeholder="Note content"
                            style={[styles.input, styles.textArea]}
                            multiline
                        />
                        <Button title="Save" onPress={handleSave} />
                        <Button title="Close" onPress={onClose} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxWidth: 400,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

