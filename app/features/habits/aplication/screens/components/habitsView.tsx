import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Link } from "expo-router";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface Habit {
  id: string;
  title: string;
  description: string;
  createdAt: { toDate: () => Date };
}

export function HabitsView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Habits" });
  }, [navigation]);

  const [habits, setHabits] = useState<Habit[]>([]);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        try {
          const q = query(collection(db, "habits"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const habitsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Habit[];
          setHabits(habitsData);
        } catch (error) {
          console.error("Error getting habits:", error);
        }
      } else {
        alert("Sign in to see your habits.");
      }
    };

    fetchHabits();
  }, [user, db]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitTitle}>{item.title}</Text>
            <Text style={styles.habitText}>{item.description}</Text>
            <Text style={styles.habitDate}>{item.createdAt?.toDate().toLocaleDateString()}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.btn}>
        <Link href="/features/habits/aplication/screens/components/createView" style={styles.btnText}>
          Add
        </Link>
      </TouchableOpacity>
    </View>
  );
}

export default HabitsView;

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
  habitItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  habitTitle: {
    fontSize: 18,
    color: '#fff',
  },
  habitText: {
    fontSize: 14,
    color: '#b3b3b3',
    marginTop: 5,
  },
  habitDate: {
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

