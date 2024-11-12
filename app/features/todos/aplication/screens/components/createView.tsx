import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export function CreateView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Edition To-Dos" });
  }, [navigation]);

  const [description, setDescription] = useState('');

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const DESCRIPTION_MAX_LENGTH = 200;

  const onCreateToDo = async () => {
    if (user) {
      if (description.trim() === "") {
        alert("All fields must be completed.");
        return;
      }    
      try {
        await addDoc(collection(db, "todos"), {
          uid: user.uid,
          description: description,
          createdAt: new Date(),
        });
        setDescription('');
        alert("To-Do successfully created");
      } catch (error) {
        console.error("Error creating To-Do:", error);
        alert("An error occurred while creating the To-Do.");
      }
    } else {
      alert("Sign in to save the To-Do.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create To-Do</Text>

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

      <TouchableOpacity onPress={onCreateToDo} style={styles.btn}>
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
    padding: Platform.OS === "web" ? 40 : 20,
    width: Platform.OS === "web" ? '80%' : '100%',
    maxWidth: Platform.OS === "web" ? 800 : '100%', // Limitar el ancho en web
    borderRadius: Platform.OS === "web" ? 10 : 0,
    marginHorizontal: 'auto', // Centrado en pantalla
  },
  title: {
    fontSize: Platform.OS === "web" ? 28 : 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    color: '#fff',
    fontSize: 16,
  },
  descriptionInput: {
    height: 120, // Mayor altura para la descripción
    textAlignVertical: 'top',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#6a00f4',
    borderRadius: 5,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  charCount: {
    color: '#b3b3b3',
    fontSize: 12,
    textAlign: 'right',
    width: '100%',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: Platform.OS === "web" ? 18 : 16,
    textDecorationLine: 'underline',
  },
});
