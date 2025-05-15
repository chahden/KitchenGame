import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2; // 2 columns with 20px total padding

const games = [
  {
    id: 1,
    title: "Elden Ring",
    price: "$59.99",
    image: require('../assets/img/Marketplaceimg/Eldenring.jpg'),
    platforms: ["PC", "PS4", "PS5", "Xbox"]
  },
  {
    id: 2,
    title: "God of War Ragnarök",
    price: "$69.99",
    image: require('../assets/img/Marketplaceimg/God_of_War_Ragnarök_cover.jpg'),
    platforms: ["PS4", "PS5"]
  },
  {
    id: 3,
    title: "Hogwarts Legacy",
    price: "$54.99",
    image: require('../assets/img/Marketplaceimg/Hogwart Legacy.jpg'),
    platforms: ["PC", "PS4", "PS5", "Xbox", "Switch"]
  },
  {
    id: 4,
    title: "Cyberpunk 2077",
    price: "$49.99",
    image: require('../assets/img/Marketplaceimg/cyberpunk.jpg'),
    platforms: ["PC", "PS4", "PS5", "Xbox"]
  },
  {
    id: 5,
    title: "Starfield",
    price: "$69.99",
    image: require('../assets/img/Marketplaceimg/satarfield.jpg'),
    platforms: ["PC", "Xbox"]
  },
  {
    id: 6,
    title: "The Legend of Zelda",
    price: "$59.99",
    image: require('../assets/img/Marketplaceimg/the legend of zelda.jpg'),
    platforms: ["Switch"]
  },
  {
    id: 7,
    title: "Spider-Man",
    price: "$49.99",
    image: require('../assets/img/Marketplaceimg/spider man.jpg'),
    platforms: ["PS4", "PS5", "PC"]
  },
  {
    id: 8,
    title: "Resident Evil 4",
    price: "$39.99",
    image: require('../assets/img/Marketplaceimg/resident evil.jpg'),
    platforms: ["PC", "PS4", "PS5", "Xbox"]
  },
  {
    id: 9,
    title: "Baldur's Gate 3",
    price: "$59.99",
    image: require('../assets/img/Marketplaceimg/baldur gate 3.jpg'),
    platforms: ["PC", "PS5"]
  },
  {
    id: 10,
    title: "Call of Duty: Modern Warfare 3",
    price: "$69.99",
    image: require('../assets/img/Marketplaceimg/call of duty modern warfare3.jpg'),
    platforms: ["PC", "PS4", "PS5", "Xbox"]
  },
  {
    id: 11,
    title: "Final Fantasy XVI",
    price: "$59.99",
    image: require('../assets/img/Marketplaceimg/final fantasy.jpg'),
    platforms: ["PS5"]
  }
  // More games could be added here
];

const MarketplaceScreen = () => {
  const [visibleGames, setVisibleGames] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const loadMoreGames = () => setVisibleGames(prev => prev + 4);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || 
                          game.platforms.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const GameCard = ({ game }: { game: typeof games[0] }) => (
    <TouchableOpacity style={styles.gameCard}>
      <View style={styles.imageContainer}>
        <Image source={game.image} style={styles.gameImage} resizeMode="cover" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.gameTitle} numberOfLines={2}>{game.title}</Text>
        <Text style={styles.gamePrice}>{game.price}</Text>
        <Text style={styles.platforms} numberOfLines={2}>
          {game.platforms.join(", ")}
        </Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Game Marketplace</Text>
          
          <View style={styles.filterContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search games..."
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={setSelectedCategory}
                style={styles.picker}
                dropdownIconColor="#666"
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="All Categories" value="All Categories" />
                <Picker.Item label="PC" value="PC" />
                <Picker.Item label="PS4" value="PS4" />
                <Picker.Item label="PS5" value="PS5" />
                <Picker.Item label="Xbox" value="Xbox" />
                <Picker.Item label="Switch" value="Switch" />
              </Picker>
            </View>
          </View>
        </View>

        <FlatList
          data={filteredGames.slice(0, visibleGames)}
          renderItem={({ item }) => <GameCard game={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          scrollEnabled={false}
        />

        {visibleGames < filteredGames.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreGames}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  heroSection: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterContainer: {
    gap: 12,
    marginBottom: 20,
  },
  searchInput: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    height: 60,
    width: '100%',
    color: '#333',
    backgroundColor: 'white',
    fontSize: 18,
  },
  pickerItem: {
    fontSize: 20,
    height: 150,
    color: '#333',
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  gameCard: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.75, // 4:3 aspect ratio
    backgroundColor: '#f9f9f9',
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 12,
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    minHeight: 40, // Ensure consistent title height
  },
  gamePrice: {
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  platforms: {
    color: '#888',
    fontSize: 12,
    marginBottom: 12,
    flex: 1,
  },
  buyButton: {
    backgroundColor: '#ff5722',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  loadMoreButton: {
    backgroundColor: '#ff5722',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  loadMoreText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MarketplaceScreen;
