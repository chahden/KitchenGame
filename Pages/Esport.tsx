// @ts-nocheck
import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

const newsItems = [
  {
    id: 1,
    title: 'The International 2023 Announces Record Prize Pool',
    category: 'dota2',
    date: '2023-08-20',
    excerpt: "Dota 2's premier tournament breaks prize pool records yet again with over $40 million in total prizes.",
    image: require('../assets/img/images (1).jpg'),
    featured: true
  },
  {
    id: 2,
    title: 'League World Championship Coming to Seoul',
    category: 'lol',
    date: '2023-09-05',
    excerpt: "Riot Games confirms Seoul as the host city for the next League of Legends World Championship.",
    image: require('../assets/img/images (2).jpg'),
    featured: false
  },
  {
    id: 3,
    title: 'CS:GO Major Sets New Viewership Record',
    category: 'csgo',
    date: '2023-08-15',
    excerpt: "The latest CS:GO Major tournament has broken all previous viewership records with over 2 million concurrent viewers.",
    image: require('../assets/img/12.jpg'),
    featured: false
  },
  {
    id: 4,
    title: 'Valorant Champions Tour Expands to New Regions',
    category: 'valorant',
    date: '2023-09-10',
    excerpt: "Riot Games announces expansion of the Valorant Champions Tour to include more regions in the upcoming season.",
    image: require('../assets/img/Esport.jpg'),
    featured: false
  },
  {
    id: 5,
    title: 'Team Liquid Dominates ESL Pro League',
    category: 'csgo',
    date: '2023-08-28',
    excerpt: "Team Liquid shows impressive performance, winning the ESL Pro League without dropping a single map.",
    image: require('../assets/img/images (1).jpg'),
    featured: false
  }
];

const tournaments = [
  {
    id: 1,
    name: "VCT Masters Tokyo",
    game: "valorant",
    date: "September 15-24, 2023",
    location: "Tokyo, Japan",
    prize: "$2,000,000"
  },
  {
    id: 2,
    name: "League World Championship",
    game: "lol",
    date: "October 10-November 15, 2023",
    location: "Seoul, South Korea",
    prize: "$3,500,000"
  },
  {
    id: 3,
    name: "The International 12",
    game: "dota2",
    date: "October 20-29, 2023",
    location: "Seattle, USA",
    prize: "$40,000,000+"
  }
];

const categoryIcons = {
  'all': 'globe-outline',
  'lol': 'shield-outline',
  'dota2': 'layers-outline',
  'csgo': 'aperture-outline',
  'valorant': 'diamond-outline'
};

const categories = [
  { id: 'all', name: 'All' },
  { id: 'lol', name: 'League of Legends' },
  { id: 'dota2', name: 'Dota 2' },
  { id: 'csgo', name: 'CS:GO' },
  { id: 'valorant', name: 'Valorant' },
];

const EsportScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredNews = newsItems
    .filter(item => 
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      (searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const featuredArticles = newsItems.filter(item => item.featured);
  const latestNews = filteredNews.filter(item => !item.featured).slice(0, 2);
  const otherNews = filteredNews.filter(item => !item.featured).slice(2);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search esports news..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.activeCategory
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={categoryIcons[category.id]} 
                size={16} 
                color={selectedCategory === category.id ? 'white' : '#ccc'} 
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Featured News */}
        <View style={styles.sectionHeader}>
          <Ionicons name="star" size={24} color="#7700ff" />
          <Text style={styles.sectionTitle}>Featured News</Text>
        </View>
        
        {featuredArticles.length > 0 && (
          <View style={styles.featuredContainer}>
            <ImageBackground 
              source={featuredArticles[0].image}
              style={styles.featuredImage}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
                style={styles.gradient}
              >
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>
                    {featuredArticles[0].title}
                  </Text>
                  <Text style={styles.featuredExcerpt}>
                    {featuredArticles[0].excerpt}
                  </Text>
                  <View style={styles.featuredFooter}>
                    <Text style={styles.featuredDate}>{featuredArticles[0].date}</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        )}

        {/* Latest News */}
        <View style={styles.sectionHeader}>
          <Ionicons name="newspaper" size={24} color="#7700ff" />
          <Text style={styles.sectionTitle}>Latest News</Text>
        </View>
        
        <View style={styles.newsGrid}>
          {latestNews.map(item => (
            <TouchableOpacity key={item.id} style={styles.newsCard}>
              <Image source={item.image} style={styles.newsImage} />
              <View style={styles.cardContent}>
                <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.newsExcerpt} numberOfLines={3}>{item.excerpt}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tournaments */}
        <View style={styles.sectionHeader}>
          <Ionicons name="trophy" size={24} color="#7700ff" />
          <Text style={styles.sectionTitle}>Upcoming Tournaments</Text>
        </View>
        
        <View style={styles.tournamentList}>
          {tournaments.map(tournament => (
            <TouchableOpacity key={tournament.id} style={styles.tournamentCard}>
              <Text style={styles.tournamentName}>{tournament.name}</Text>
              <Text style={styles.tournamentGame}>{tournament.game}</Text>
              <Text style={styles.tournamentDate}>{tournament.date}</Text>
              <Text style={styles.tournamentLocation}>{tournament.location}</Text>
              <Text style={styles.tournamentPrize}>{tournament.prize}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* More News */}
        {otherNews.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="newspaper" size={24} color="#7700ff" />
              <Text style={styles.sectionTitle}>More News</Text>
            </View>
            
            <View style={styles.newsGrid}>
              {otherNews.map(item => (
                <TouchableOpacity key={item.id} style={styles.newsCard}>
                  <Image source={item.image} style={styles.newsImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.newsExcerpt} numberOfLines={3}>{item.excerpt}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  searchContainer: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  categoryButton: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 6,
  },
  activeCategory: {
    backgroundColor: '#7700ff',
  },
  categoryText: {
    color: 'white',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  featuredContainer: {
    marginHorizontal: 16,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 24,
  },
  featuredImage: {
    height: 300,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  featuredContent: {
    maxWidth: 800,
  },
  featuredTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  featuredExcerpt: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredDate: {
    color: '#aaa',
    fontSize: 14,
  },
  newsGrid: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  newsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
  },
  newsExcerpt: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  dateText: {
    color: '#888',
    fontSize: 12,
  },
  tournamentList: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tournamentCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#7700ff',
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tournamentGame: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4, 
  },
  tournamentDate: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
  },
  tournamentLocation: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
  },
  tournamentPrize: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7700ff',
  }
});

export default EsportScreen;
