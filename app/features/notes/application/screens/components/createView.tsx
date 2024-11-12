import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export function CreateView(){

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Note edition" });
  }, [navigation]);

// Definimos los estados para almacenar los valores de entrada del título y la descripción de la nota
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');

// Inicializamos Firestore y Auth para acceder a la autenticación 
const db = getFirestore();
const auth = getAuth();

// Obtenemos el usuario actualmente autenticado
const user = auth.currentUser;

// Definimos constantes para limitar la longitud 
const TITLE_MAX_LENGTH = 40;        
const DESCRIPTION_MAX_LENGTH = 200; 

// Función asíncrona para crear una nueva nota en la base de datos
const onCreateNote = async () => {
  // Verificamos si el usuario está autenticado
  if (user) {
    // Verificamos si los campos de título y descripción no están vacíos
    if (title.trim() === "" || description.trim() === "") {
      alert("All fields must be completed"); // Muestra una alerta si algún campo está vacío
      return;
    }

    try {
      // Agregamos un nuevo documento en la colección "notes" con los datos del usuario, título y descripción
      await addDoc(collection(db, "notes"), {
        uid: user.uid,       
        title: title,       
        description: description, 
      });
      
      // Limpiamos los campos de entrada de título y descripción después de crear la nota
      setTitle('');
      setDescription('');

      alert("Note created successfully"); // Notificamos al usuario que la nota fue creada exitosamente

    } catch (error) {
      // Si ocurre algún error al crear la nota, lo mostramos en la consola y notificamos al usuario
      console.error("Error creating note", error);
      alert("An error occurred while creating the note.");
    }
  } else {
    // Si el usuario no está autenticado, mostramos una alerta indicando que debe iniciar sesión
    alert("Sign in to save the note.");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Note</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#b3b3b3"
        maxLength={TITLE_MAX_LENGTH}
      />
      <Text style={styles.charCount}>{title.length}/{TITLE_MAX_LENGTH}</Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#b3b3b3"
        maxLength={DESCRIPTION_MAX_LENGTH}
        multiline
      />
      <Text style={styles.charCount}>{description.length}/{DESCRIPTION_MAX_LENGTH}</Text>

      <TouchableOpacity onPress={onCreateNote} style={styles.btn}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>

      <Link href={"/features/home/application/screens/homeScreens"} style={styles.link}>
        <Text style={styles.linkText}>Go back to Home</Text>
      </Link>
    </View>
  );
}

export default CreateView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === "web" ? 40 : 20, // Más espacio en la web
  },
  title: {
    fontSize: Platform.OS === "web" ? 32 : 24, // Tamaño de texto más grande en la web
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: Platform.OS === "web" ? '60%' : '100%', // Ancho ajustado para la web
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    color: '#fff',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#6a00f4',
    borderRadius: 5,
    paddingVertical: 10,
    width: Platform.OS === "web" ? '60%' : '100%', // Ancho ajustado para la web
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  charCount: {
    color: '#b3b3b3',
    fontSize: 12,
    textAlign: 'right',
    width: Platform.OS === "web" ? '60%' : '100%', // Ajuste de ancho en la web
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: Platform.OS === "web" ? 18 : 16, // Tamaño de texto más grande en la web
  },
});
