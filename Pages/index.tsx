import Icon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  Animated,
  Easing
} from 'react-native';
import { colors, fonts } from '../config/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  desc: string;
  price: string;
  image: any;
}

interface Publication {
  id: string;
  author: string;
  content: string;
  avatar: any;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const [likedPosts, setLikedPosts] = React.useState<{[key: string]: boolean}>({});
  const [likeCounts, setLikeCounts] = React.useState<{[key: string]: number}>({});
  const likeAnims = React.useRef<{[key: string]: Animated.Value}>({});

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();
  }, []);

  const handleLike = (postId: string) => {
    if (!likeAnims.current[postId]) {
      likeAnims.current[postId] = new Animated.Value(1);
    }

    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));

    setLikeCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] || 10) + (likedPosts[postId] ? -1 : 1)
    }));

    Animated.sequence([
      Animated.timing(likeAnims.current[postId], {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnims.current[postId], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const products: Product[] = [
    { 
      id: '1', 
      name: 'Elden Ring', 
      desc: 'PC, PS4, PS5, Xbox', 
      price: '$59.99',
      image: require('../assets/img/Marketplaceimg/Eldenring.jpg')
    },
    { 
      id: '2', 
      name: 'God of War', 
      desc: 'PS4, PS5', 
      price: '$69.99',
      image: require('../assets/img/Marketplaceimg/God_of_War_Ragnarök_cover.jpg')
    },
    { 
      id: '3', 
      name: 'Spider-Man 2', 
      desc: 'PS5', 
      price: '$69.99',
      image: require('../assets/img/Marketplaceimg/spider man.jpg')
    },
  ];

  const publications: Publication[] = [
    { 
      id: '1', 
      author: 'gamer1', 
      content: 'Nintendo Quietly Confirms Cost...',
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    { 
      id: '2', 
      author: 'gamer2', 
      content: 'Bethesda has gifted...',
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    { 
      id: '3', 
      author: 'gamer3', 
      content: 'Kids today will never know...',
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <Animated.View 
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.cardImageContainer}>
        <Image source={item.image} style={styles.cardImage} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.btnBuy}>
          <Text style={styles.btnBuyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderPublication = ({ item }: { item: Publication }) => (
    <Animated.View 
      style={[
        styles.publicationItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.pubHeader}>
        <Image source={item.avatar} style={styles.pubAvatar} />
        <View style={styles.pubMeta}>
          <Text style={styles.pubAuthor}>{item.author}</Text>
          <View style={styles.pubDetails}>
            <Text style={styles.pubDate}>2023-10-01</Text>
            <Text style={styles.pubCategory}>Gaming</Text>
          </View>
        </View>
      </View>
      <Text style={styles.pubContent}>{item.content}</Text>
      <View style={styles.pubActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Animated.View style={{ 
            transform: [{ 
              scale: likeAnims.current[item.id] || new Animated.Value(1) 
            }] 
          }}>
            <Icon 
              name="thumb-up" 
              size={16} 
              color={likedPosts[item.id] ? '#ff4a17' : '#444444'} 
            />
          </Animated.View>
          <Text style={[
            styles.actionText,
            likedPosts[item.id] && styles.actionTextActive
          ]}>
            {likeCounts[item.id] || 10}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chat" size={16} color="#444444" />
          <Text style={styles.actionText}>5</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderHeroSection = () => (
    <View style={styles.hero}>
      <Image 
        source={require('../assets/img/Main.jpg')} 
        style={styles.heroBackground}
      />
      <View style={styles.heroOverlay}>
        <Animated.View 
          style={[
            styles.heroContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.heroTitle}>PLAY. CONQUER. HAVEFUN.</Text>
          <Text style={styles.heroText}>
            We are a team of passionate Gamer creating web site for Gaming Community.
          </Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login' as never)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );

  const renderAboutSection = () => (
    <View style={styles.section}>
      <View style={styles.aboutContent}>
        <Text style={styles.sectionTitle}>Welcome to KitchenGame</Text>
        {[
      'Video game marketplace...',
      'Social network for gamers...',
      'E-sports tournaments and competitions...'
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Icon name="games" size={24} color={colors.accent} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMarketplaceSection = () => (
    <View style={styles.sectionDark}>
      <Text style={[styles.sectionTitle, { color: colors.contrast }]}>Marketplace</Text>
      <FlatList
        horizontal
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderPublicationsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Publications</Text>
      <FlatList
        data={publications}
        renderItem={renderPublication}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.publicationsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderItem = ({ item }: { item: string }) => {
    switch (item) {
      case 'hero':
        return renderHeroSection();
      case 'about':
        return renderAboutSection();
      case 'marketplace':
        return renderMarketplaceSection();
      case 'publications':
        return renderPublicationsSection();
      default:
        return null;
    }
  };

  const sections = ['hero', 'about', 'marketplace', 'publications'];

  return (
    <View style={styles.mainContainer}>
      <Header />
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hero: {
    height: 400,
    position: 'relative',
  },
  heroBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Raleway',
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroText: {
    fontFamily: 'Roboto',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 16,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#ff4a17',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  sectionDark: {
    padding: 20,
    backgroundColor: '#000910',
  },
  sectionTitle: {
    fontFamily: 'Raleway',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#444444',
  },
  aboutContent: {
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  listText: {
    fontFamily: 'Roboto',
    marginLeft: 10,
    fontSize: 16,
    color: '#444444',
  },
  card: {
    width: width * 0.8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginRight: 15,
    overflow: 'hidden',
    elevation: 5,
    boxShadow: '0px 0 30px rgba(0, 0, 0, 0.1)',
  },
  cardImageContainer: {
    height: 200,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontFamily: 'Raleway',
    fontSize: 18,
    marginBottom: 5,
    color: '#273d4e',
    fontWeight: '700',
  },
  cardDesc: {
    fontFamily: 'Roboto',
    color: '#444444',
    marginBottom: 10,
    fontSize: 14,
  },
  price: {
    fontFamily: 'Raleway',
    color: '#ff4a17',
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '700',
  },
  btnBuy: {
    backgroundColor: '#ff4a17',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  btnBuyText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardContainer: {
    paddingVertical: 10,
  },
  publicationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    boxShadow: '0px 0 30px rgba(0, 0, 0, 0.1)',
  },
  pubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pubAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  pubMeta: {
    flex: 1,
  },
  pubAuthor: {
    fontFamily: 'Raleway',
    fontSize: 16,
    color: '#273d4e',
    fontWeight: '700',
  },
  pubDetails: {
    flexDirection: 'row',
    marginTop: 2,
  },
  pubDate: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#444444',
    marginRight: 10,
  },
  pubCategory: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#ff4a17',
  },
  pubContent: {
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 10,
    color: '#444444',
    lineHeight: 20,
  },
  pubActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  actionText: {
    fontFamily: 'Roboto',
    marginLeft: 5,
    fontSize: 14,
    color: '#444444',
  },
  actionTextActive: {
    color: '#ff4a17',
    fontWeight: '600',
  },
  publicationsContainer: {
    paddingVertical: 10,
  },
});
