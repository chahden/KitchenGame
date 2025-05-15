import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import { colors, fonts } from '../config/styles';
import Header from '../components/Header';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login:', { email, password });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <ImageBackground 
        source={require('../assets/img/Main.jpg')} 
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.container as StyleProp<ViewStyle>}>
            <View style={styles.formContainer as StyleProp<ViewStyle>}>
              <Text style={styles.title as StyleProp<TextStyle>}>Connexion</Text>
              
              <TextInput
                style={styles.input as StyleProp<TextStyle>}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              
              <TextInput
                style={styles.input as StyleProp<TextStyle>}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
              />
              
              <TouchableOpacity 
                style={styles.button as StyleProp<ViewStyle>}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText as StyleProp<TextStyle>}>Se connecter</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkButton as StyleProp<ViewStyle>}
                onPress={() => navigation.navigate('AddUser' as never)}
              >
                <Text style={styles.linkText as StyleProp<TextStyle>}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 25,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#273d4e',
    fontWeight: '700',
  },
  input: {
    fontFamily: 'Roboto',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#ff4a17',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'Roboto',
    color: '#ff4a17',
    fontSize: 14,
    fontWeight: '600',
  },
});
