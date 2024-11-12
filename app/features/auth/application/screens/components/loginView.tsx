import { FC, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useSessionState } from "../../providers/index"; 
import { router } from "expo-router";

export const LoginView: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar el montaje
  const { loading, user, message, login } = useSessionState();

  // Manejar el evento de inicio de sesión y llamar a la función de inicio de sesión desde el proveedor
  const onLogin = () => {
    login(email, password); 
  };

  // Cambiar el estado a montado después de la primera carga del componente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirigir a la pantalla de perfil cuando el usuario esté autenticado y el componente esté montado
  useEffect(() => {
    if (user && isMounted) {
      router.push('/profile'); 
    }
  }, [user, isMounted]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Keep it all together and you'll be fine</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#b3b3b3"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor="#b3b3b3"
      />

      <TouchableOpacity onPress={onLogin} disabled={loading} style={styles.btn}>
        <Text style={styles.btnText}>{loading ? "Loading..." : "Sign In"}</Text>
      </TouchableOpacity>

      {message && <Text style={styles.errorMessage}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#b3b3b3',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    color: '#fff',
  },
  btn: {
    width: '100%',
    padding: 10,
    backgroundColor: '#6a00f4',
    borderRadius: 5,
    marginVertical: 20,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginView;



