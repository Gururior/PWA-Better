import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Link } from "expo-router";
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


interface Note {
  id: string;
  title: string;
  description: string;
}

export function NotesView() {

  

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Notes" });
  }, [navigation]);
  // Especifica el tipo de estado como un arreglo de Notes
  const [notes, setNotes] = useState<Note[]>([]); 
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  
  // Obtener la información desde Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "notes"));
          const notesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Note[]; // Asegura que los datos se convierten en el tipo Notes
          setNotes(notesData);
        } catch (error) {
          console.error("Error getting notes:", error);
        }
      } else {
        alert("Sign in to see your notes.");
      }
    };

    fetchNotes();
  }, [user, db]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDescription}>{item.description}</Text>
          </View>
        )}
      />      
      <TouchableOpacity style={styles.btn}>
        <Link href={"/features/notes/application/screens/components/createView"} style={styles.btnText}>
          Add
        </Link>
      </TouchableOpacity>
    </View>
  );
}

export default NotesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  noteItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 18,
    color: '#fff',
  },
  noteDescription: {
    fontSize: 14,
    color: '#b3b3b3',
    marginTop: 5,
  },
  btn: {
    backgroundColor: '#6a00f4',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});