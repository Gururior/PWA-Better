import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Link } from "expo-router";
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface ToDo {
  id: string;
  description: string;
}

export function TodosView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "To-Do" });
  }, [navigation]);

  const [toDos, setToDos] = useState<ToDo[]>([]); // Especifica el tipo de estado como un arreglo de Habit
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchToDos = async () => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "todos"));
          const habitsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ToDo[]; // Asegura que los datos se convierten en el tipo Habit
          setToDos(habitsData);
        } catch (error) {
          console.error("Error getting your To-Dos:", error);
        }
      } else {
        alert("Sign in to see your To-Dos.");
      }
    };

    fetchToDos();
  }, [user, db]);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Your To-Dos</Text>

        <FlatList
        data={toDos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.toDoItem}>
            <Text style={styles.toDoText}>{item.description}</Text>
          
          </View>
        )}
      />
    
      <TouchableOpacity style={styles.btn}>
        <Link href={"/features/todos/aplication/screens/components/createView"} style={styles.btnText}>
          Add
        </Link>
      </TouchableOpacity>
    </View>
  );
}

export default TodosView;

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
  toDoItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  toDoTitle: {
    fontSize: 18,
    color: '#fff',
  },
  toDoText: {
    fontSize: 14,
    color: '#b3b3b3',
    marginTop: 5,
  },
  toDoDate: {
    fontSize: 12,
    color: '#b3b3b3',
    marginTop: 5,
    textAlign: 'right',
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
