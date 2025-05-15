import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnim = React.useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
    Animated.spring(menuAnim, {
      toValue,
      useNativeDriver: true,
      tension: 65,
      friction: 11
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

  const menuItems = [
    { name: 'Home', screen: 'Home' },
    { name: 'Marketplace', screen: 'Marketplace' },
    { name: 'Media', screen: 'Media' },
    { name: 'E-Sport', screen: 'Esport' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/img/Icon/Icon.jpg')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>KitchenGame</Text>
        </View>
        
        <TouchableOpacity
          onPress={toggleMenu}
          style={styles.menuButton}
        >
          <Icon name="menu" size={24} color="#273d4e" />
        </TouchableOpacity>
      </View>

      <Animated.View 
        style={[
          styles.mobileMenu,
          {
            transform: [{
              translateY: menuAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-300, 0]
              })
            }],
            opacity: menuAnim
          }
        ]}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigateTo(item.screen)}
          >
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'rgba(21, 34, 43, 0.85)',
  },
  header: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 4,
  },
  logoText: {
    fontFamily: 'Raleway',
    fontSize: 20,
    color: '#455a6f',
    fontWeight: '700',
  },
  menuButton: {
    padding: 5,
  },
  mobileMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#ffffff',
  },
});

export default Header;
