import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { useSessionState } from "../app/features/auth/application/providers";
import { Link, useRouter } from "expo-router";
import logo from '../assets/images/Designer.png'; 

export default function Profile() {
  const { user, message, logout } = useSessionState();
  const router = useRouter(); // Inicializar el router

  const handleLogout = async () => {
    console.log("Attempting to log out...");
    await logout(); // Esperar a que el cierre de sesión se complete
    router.push("/features/auth/application/screens/components/loginView"); // Redirigir a la pantalla de inicio de sesión
  };

  if (!user) {
    return (
      <View style={styles.root}>
        <Text style={styles.message}>User not authenticated</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Sección del encabezado */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Better.me</Text>
        <Image source={logo} style={styles.logo} />
      </View>

      {/* Sección de información del usuario */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Botón de inicio */}
      <TouchableOpacity style={styles.homeLink}>
        <Link href="/features/home/application/screens/homeScreens" style={styles.homeLinkText}>
          Home
        </Link>
      </TouchableOpacity>

      {/* Botón de cierre de sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Sección de mensajes */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    padding: Platform.OS === "web" ? 40 : 20, // Más espacio en la web
  },
  header: {
    alignItems: 'center',
    marginBottom: Platform.OS === "web" ? 50 : 30, // Más espacio en la web
  },
  welcomeText: {
    fontSize: Platform.OS === "web" ? 40 : 30, // Más grande en la web
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  logo: {
    width: Platform.OS === "web" ? 150 : 100, // Más grande en la web
    height: Platform.OS === "web" ? 150 : 100,
    marginBottom: 10,
    marginTop: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: Platform.OS === "web" ? 60 : 50,
  },
  userEmail: {
    fontSize: Platform.OS === "web" ? 22 : 18, // Texto más grande en la web
    color: '#333',
  },
  message: {
    color: "red",
    fontSize: Platform.OS === "web" ? 18 : 14, // Texto más grande en la web
  },
  homeLink: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: Platform.OS === "web" ? '60%' : '80%', // Ancho más pequeño en la web
    marginBottom: 10,
  },
  homeLinkText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === "web" ? 20 : 18, // Texto más grande en la web
  },
  logoutButton: {
    backgroundColor: '#FF3D00',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: Platform.OS === "web" ? '60%' : '80%',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === "web" ? 20 : 18,
  },
});


