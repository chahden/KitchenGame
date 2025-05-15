import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../config/styles';
import Header from '../components/Header';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
}

export default function AddUser() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    handleChange('dob', currentDate.toISOString().split('T')[0]);
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas!');
      return;
    }
    // Handle form submission
    Alert.alert('Succès', 'Inscription réussie!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login' as never),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <ImageBackground 
        source={require('../assets/img/Main.jpg')} 
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Créer un compte</Text>

              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre prénom"
                value={formData.firstName}
                onChangeText={text => handleChange('firstName', text)}
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom"
                value={formData.lastName}
                onChangeText={text => handleChange('lastName', text)}
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Nom d'utilisateur</Text>
              <TextInput
                style={styles.input}
                placeholder="Choisissez un nom d'utilisateur"
                value={formData.username}
                onChangeText={text => handleChange('username', text)}
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Adresse email</Text>
              <TextInput
                style={styles.input}
                placeholder="exemple@mail.com"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Numéro de téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="+216 99 999 999"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={text => handleChange('phone', text)}
                maxLength={15}
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Date de naissance</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}>
                <Text>{formData.dob || 'Sélectionnez une date'}</Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Text style={styles.label}>Genre</Text>
              <View style={styles.genderContainer}>
                {['male', 'female'].map(gender => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderButton,
                      formData.gender === gender && styles.selectedGender,
                    ]}
                    onPress={() => handleChange('gender', gender)}>
                    <Text style={{ color: formData.gender === gender ? '#ff4a17' : '#333' }}>
                      {gender === 'male' ? 'Homme' : 'Femme'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Pays</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.country}
                  onValueChange={value => handleChange('country', value)}>
                  <Picker.Item label="-- Choisissez votre pays --" value="" />
                  <Picker.Item label="France" value="fr" />
                  <Picker.Item label="Tunisie" value="tn" />
                  <Picker.Item label="États-Unis" value="us" />
                  <Picker.Item label="Canada" value="ca" />
                  <Picker.Item label="Royaume-Uni" value="uk" />
                </Picker>
              </View>

              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Créez un mot de passe"
                secureTextEntry
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Confirmez le mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Répétez le mot de passe"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
                placeholderTextColor="#999"
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#273d4e',
    fontWeight: '700',
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    marginBottom: 8,
    color: '#273d4e',
  },
  input: {
    fontFamily: 'Roboto',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  selectedGender: {
    backgroundColor: 'rgba(255, 74, 23, 0.1)',
    borderColor: '#ff4a17',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#ff4a17',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
