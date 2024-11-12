import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


interface Quote {
  id: string;
  text: string;
  author: string;
}

export function QuotesView() {
  const navigation = useNavigation();

  // Establecer el título de la pantalla
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Quotes" });
  }, [navigation]);

  const [quote, setQuote] = useState<Quote | null>(null);
  const db = getFirestore();

  const fetchRandomQuote = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'quotes'));
      const quotesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Quote[];

      if (quotesData.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        setQuote(quotesData[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <View style={styles.container}>
      {quote ? (
        <>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.quoteAuthor}>- {quote.author}</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading quote...</Text>
      )}

      <TouchableOpacity onPress={fetchRandomQuote} style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Show Another Quote</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Link href={"/features/home/application/screens/homeScreens"} style={styles.btnText}>
          Go back Home
        </Link>
      </TouchableOpacity>
    </View>
  );
}

export default QuotesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  quoteText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 16,
    color: '#b3b3b3',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#b3b3b3',
  },
  refreshButton: {
    backgroundColor: '#6a00f4',
    padding: 10,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
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