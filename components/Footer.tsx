import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const navigateTo = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.footerButton} 
        onPress={() => navigateTo('Home')}
      >
        <Ionicons name="home" size={24} color="#455a6f" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigateTo('Marketplace')}
      >
        <Ionicons name="cart" size={24} color="#455a6f" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigateTo('Media')}
      >
        <Ionicons name="play-circle" size={24} color="#1877f2" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigateTo('Esport')}
      >
        <Ionicons name="trophy" size={24} color="#455a6f" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#f5f6fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerButton: {
    padding: 10,
  },
});

export default Footer;
