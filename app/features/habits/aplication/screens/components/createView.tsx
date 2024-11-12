import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';

export function CreateView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Edit Habits" });
  }, [navigation]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para mensajes de error

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const TITLE_MAX_LENGTH = 50;
  const DESCRIPTION_MAX_LENGTH = 200;

  const onCreateHabit = async () => {
    if (user) {
      if (title.trim() === "" || description.trim() === "") {
        alert("Todos los campos deben estar completos.");
        return;
      }

      setLoading(true);
      try {
        await addDoc(collection(db, "habits"), {
          uid: user.uid,
          title: title,
          description: description,
          createdAt: new Date(),
          frequency: frequency,
          completed: false,
        });
        setTitle('');
        setDescription('');
        setConfirmation("Hábito creado exitosamente");

        setTimeout(() => setConfirmation(''), 3000); // El mensaje desaparecerá después de 3 segundos
      } catch (error) {
        console.error("Error al crear el hábito:", error);
        setErrorMessage("Ocurrió un error al crear el hábito.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Inicia sesión para guardar el hábito.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Hábito</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#b3b3b3"
        maxLength={TITLE_MAX_LENGTH}
      />
      <Text style={styles.charCount}>{title.length}/{TITLE_MAX_LENGTH}</Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#b3b3b3"
        maxLength={DESCRIPTION_MAX_LENGTH}
        multiline
      />
      <Text style={styles.charCount}>{description.length}/{DESCRIPTION_MAX_LENGTH}</Text>

      <Text style={styles.label}>Frecuencia</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={frequency}
          style={styles.picker}
          onValueChange={(itemValue) => setFrequency(itemValue)}
        >
          <Picker.Item label="Diario" value="daily" />
          <Picker.Item label="Semanal" value="weekly" />
          <Picker.Item label="Mensual" value="monthly" />
        </Picker>
      </View>

      <TouchableOpacity onPress={onCreateHabit} style={styles.btn} disabled={loading}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#6a00f4" style={{ marginTop: 10 }} />}

      {confirmation ? <Text style={styles.confirmationText}>{confirmation}</Text> : null}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null} {/* Mensaje de error */}

      <Link href={"/features/home/application/screens/homeScreens"} style={styles.link}>
        <Text style={styles.linkText}>Volver al Inicio</Text>
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
  },
  title: {
    fontSize: Platform.OS === "web" ? 32 : 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: Platform.OS === "web" ? '60%' : '100%',
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
  pickerContainer: {
    width: Platform.OS === "web" ? '60%' : '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 10,
    borderRadius: 5,
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  charCount: {
    color: '#b3b3b3',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#6a00f4',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '60%',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmationText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: { // Estilo para el mensaje de error
    color: '#f44336',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: '#6a00f4',
  },
});

