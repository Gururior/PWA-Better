import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export function HomeView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Better-me</Text>

      <View style={styles.cardContainer}>
        <Pressable style={[styles.card, styles.habitsCard, Platform.OS === "web" && { cursor: "pointer" }]}>
          <Ionicons name="leaf" size={50} color="#FFFFFF" style={styles.icon} />
          <Link href="/features/habits/aplication/screens/components/habitsView" style={styles.link}>
            <Text style={styles.cardText}>Habits</Text>
          </Link>
        </Pressable>

        <Pressable style={[styles.card, styles.notesCard, Platform.OS === "web" && { cursor: "pointer" }]}>
          <Ionicons name="pencil" size={50} color="#FFFFFF" style={styles.icon} />
          <Link href="/features/notes/application/screens/components/notesView" style={styles.link}>
            <Text style={styles.cardText}>Notes</Text>
          </Link>
        </Pressable>

        <Pressable style={[styles.card, styles.todosCard, Platform.OS === "web" && { cursor: "pointer" }]}>
          <Ionicons name="checkbox" size={50} color="#FFFFFF" style={styles.icon} />
          <Link href="/features/todos/aplication/screens/components/todosView" style={styles.link}>
            <Text style={styles.cardText}>To-Dos</Text>
          </Link>
        </Pressable>

        <Pressable style={[styles.card, styles.quotesCard, Platform.OS === "web" && { cursor: "pointer" }]}>
          <Ionicons name="list" size={50} color="#FFFFFF" style={styles.icon} />
          <Link href="/features/queotes/application/screens/components/queotesView" style={styles.link}>
            <View style={styles.quoteContent}>
              <Text style={styles.quoteTitle}>Quotes</Text>
              <Text style={styles.quoteSubtitle}>Get inspired daily</Text>
            </View>
          </Link>
        </Pressable>

        <Pressable style={[styles.card, styles.profileCard, Platform.OS === "web" && { cursor: "pointer" }]}>
          <Link href="/profile" style={styles.link}>
            <Ionicons name="person" size={25} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.cardText}>Profile</Text>
          </Link>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: Platform.OS === "web" ? 60 : 48,
    color: "#FFFFFF",
    marginBottom: 40,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: Platform.OS === "web" ? "row" : "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  card: {
    width: Platform.OS === "web" ? "20%" : screenWidth * 0.4,
    height: Platform.OS === "web" ? screenWidth * 0.2 : screenWidth * 0.4,
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 15,
    flexDirection: "column",
  },
  habitsCard: {
    backgroundColor: "#34C759",
  },
  notesCard: {
    backgroundColor: "#007AFF",
  },
  todosCard: {
    backgroundColor: "#AF52DE",
  },
  quotesCard: {
    backgroundColor: "#FF9500",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  profileCard: {
    backgroundColor: "#0055FF",
    width: Platform.OS === "web" ? "90%" : screenWidth * 0.9,
    height: Platform.OS === "web" ? screenWidth * 0.1 : screenWidth * 0.25,
    borderRadius: 15,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
  },
  quoteContent: {
    alignItems: "center",
  },
  quoteTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  quoteSubtitle: {
    fontSize: 12,
    color: "#CCCCCC",
  },
  link: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    marginBottom: 0.5,
    marginTop: 30,
  },
});

export default HomeView;


