import React, { useState, useRef, useEffect } from 'react';
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
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define the post type
type Post = {
  id: string;
  username: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  media: any | null;
  mediaType: 'image' | 'video' | null;
  avatar: any;
};

const MediaScreen = () => {
  const [postContent, setPostContent] = useState('');
  const { width } = Dimensions.get('window');

  const handlePost = () => {
    if (postContent.trim()) {
      console.log('New Post:', postContent);
      setPostContent('');
    } else {
      alert('Post content cannot be empty!');
    }
  };

  // Sample data
  const samplePosts = [
    {
      id: '0',
      username: 'Gamer1',
      time: '1 hours ago',
      content: 'Check out this awesome gameplay clip! 🎮🔥',
      likes: 245,
      comments: 42,
      media: require('../assets/img/Blasphemous - Official Launch Trailer.mp4'),
      mediaType: 'video' as const,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '1',
      username: 'Gamer2',
      time: '2 hours ago',
      content: 'Check out this awesome gameplay clip! 🎮🔥',
      likes: 246,
      comments: 43,
      media: require('../assets/img/images (1).jpg'),
      mediaType: 'image' as const,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '2',
      username: 'Gamer3',
      time: '3 hours ago',
      content: 'Check out this awesome gameplay clip! 🎮🔥',
      likes: 247,
      comments: 44,
      media: require('../assets/img/images (2).jpg'),
      mediaType: 'image' as const,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '3',
      username: 'Gamer4',
      time: '4 hours ago',
      content: 'Check out this awesome gameplay clip! 🎮🔥',
      likes: 248,
      comments: 45,
      media: require('../assets/img/12.jpg'),
      mediaType: 'image' as const,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '4',
      username: 'Gamer5',
      time: '5 hours ago',
      content: 'Check out this awesome gameplay clip! 🎮🔥',
      likes: 249,
      comments: 46,
      media: require('../assets/img/Esport.jpg'),
      mediaType: 'image' as const,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '5',
      username: 'Gamer6',
      time: '6 hours ago',
      content: 'Hollow Knight Silksong Trailer 🎥✨',
      likes: 250,
      comments: 47,
      media: require('../assets/img/Hollow Knight Silksong - Announcement Trailer - Nintendo Switch.mp4'),
      mediaType: 'video' as const,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '6',
      username: 'Gamer7',
      time: '7 hours ago',
      content: 'Check out this amazing photo! 📸✨',
      likes: 251,
      comments: 48,
      media: require('./assets/img/images.jpg'), // Using local image from Pages/assets
      mediaType: 'image' as const,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '7',
      username: 'Gamer8',
      time: '8 hours ago',
      content: 'Bethesda has gifted every member of Skyblivion Team...',
      likes: 252,
      comments: 49,
      media: null,
      mediaType: null,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '8',
      username: 'Gamer9',
      time: '9 hours ago',
      content: 'Nintendo Quietly Confirms Cost of Switch 2 Upgrades...',
      likes: 253,
      comments: 50,
      media: null,
      mediaType: null,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    },
    {
      id: '9',
      username: 'Gamer10',
      time: '10 hours ago',
      content: 'Kids today will never know the pain of downloading a game on PS3...',
      likes: 254,
      comments: 51,
      media: null,
      mediaType: null,
      avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
    }
  ].filter(post => post.content !== 'Check out this awesome gameplay clip! 🎮🔥') as Post[];

  const onlineFriends = [...Array(5)].map((_, i) => ({
    id: i.toString(),
    username: `Friend${i+1}`,
    avatar: require('../assets/img/user-profile-icon-vector-avatar-600nw-2220431045.webp')
  }));

  // Function to render media based on mediaType
  const renderMedia = (post: Post) => {
    if (!post.media) return null;

    if (post.mediaType === 'image') {
      return (
        <Image 
          source={post.media} 
          style={styles.mediaContent} 
          resizeMode="cover"
        />
      );
    } else if (post.mediaType === 'video') {
      // Define the correct type for the video ref
      const videoRef = useRef<Video>(null);
      
      useEffect(() => {
        // Cleanup function for when component unmounts or video is scrolled out of view
        return () => {
          if (videoRef.current) {
            // Stop audio when component unmounts
            const player = videoRef.current;
            player.pauseAsync && player.pauseAsync();
            player.unloadAsync && player.unloadAsync();
          }
        };
      }, []);

      return (
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={post.media}
            style={styles.mediaContent}
            useNativeControls={true}
            shouldPlay={false} // Changed to false to prevent auto-play
            isLooping={false}
            posterSource={{ uri: "https://via.placeholder.com/350x150" }}
            onError={(error) => console.log("Video playback error:", error)}
            positionMillis={0}
          />
        </View>
      );
    }
    return null;
  };

  const PostCard = ({ post }: { post: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={post.avatar} style={styles.userAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.content}</Text>
      
      {renderMedia(post)}
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="thumbs-up" size={18} color="#65676b" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble" size={18} color="#65676b" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-social" size={18} color="#65676b" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.mainContent}>
        <View style={styles.createPostCard}>
          <TextInput
            style={styles.postInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#666"
            multiline
            value={postContent}
            onChangeText={setPostContent}
          />
          <View style={styles.postControls}>
            <View style={styles.mediaOptions}>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons name="image" size={20} color="#1877f2" />
                <Text style={styles.mediaBtnText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons name="videocam" size={20} color="#1877f2" />
                <Text style={styles.mediaBtnText}>Video</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={samplePosts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />

        <View style={styles.friendsSection}>
          <Text style={styles.sidebarTitle}>Online Friends</Text>
          <FlatList
            data={onlineFriends}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.friendItem}>
                <Image source={item.avatar} style={styles.friendAvatar} />
                <View style={styles.onlineIndicator} />
                <Text style={styles.friendUsername}>{item.username}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.friendsList}
          />
        </View>
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
  mainContent: {
    flex: 1,
    padding: 16,
  },
  createPostCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postInput: {
    height: 100,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  postControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaOptions: {
    flexDirection: 'row',
    gap: 16,
  },
  mediaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  mediaBtnText: {
    color: '#1877f2',
    fontWeight: '500',
  },
  postButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  postButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  postUserInfo: {
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#050505',
  },
  postTime: {
    fontSize: 12,
    color: '#65676b',
  },
  postText: {
    fontSize: 14,
    color: '#050505',
    marginBottom: 12,
    lineHeight: 20,
  },
  mediaContent: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 200, 
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 6,
  },
  actionText: {
    color: '#65676b',
    fontSize: 14,
  },
  friendsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#050505',
    marginBottom: 16,
  },
  friendsList: {
    gap: 16,
  },
  friendItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  friendUsername: {
    fontSize: 12,
    color: '#050505',
    fontWeight: '500',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#31a24c',
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default MediaScreen;
