import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    iconButton: {
      backgroundColor: '#1DB954',
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      marginHorizontal: 20,
    },
    playButton: {
      backgroundColor: '#1DB954',
      height: 60,
      borderRadius: 40,
      justifyContent: 'center',
      width: 100,
    },
    playButtonContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButtonLabel: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      justifyContent: 'center',
    },
    albumCover: {
      backgroundColor: '#1DB954',
      width: 200,
      height: 200,
      marginBottom: 16,
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#191414',
    },
    songInfoContainer: {
      alignItems: 'center',
      marginTop: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 8,
    },
    artist: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
    },
  });

export function createPlaylistScreen(PlaylistContent) {
  return function Playlist({ navigation }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [artwork, setArtwork] = useState(PlaylistContent[0].artwork); // set initial artwork state
    const [title, setTitle] = useState(PlaylistContent[0].title); // set initial title state
    const [artist, setArtist] = useState(PlaylistContent[0].artist); // set initial artist state

    useEffect(() => {
      console.log('Setting up player...');
      const setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(PlaylistContent);
        // await TrackPlayer.play();
        TrackPlayer.addEventListener('playback-track-changed', async (data) => {
          const track = await TrackPlayer.getTrack(data.nextTrack);
          console.log('Artwork changed:', track.artwork);
          setArtwork(track.artwork); // update artwork state
          setTitle(track.title); // update title state
          setArtist(track.artist); // update artist state
        });
        TrackPlayer.addEventListener('playback-state', async (data) => {
          const state = data.state;
          const position = data.position;
          const duration = data.duration;
          console.log('Playback state:', state, position, duration);
        });
      };

      setupPlayer();
    }, []);

    const progress = async () => {
      TrackPlayer.useTrackPlayerProgress();
    };

    const togglePlayback = async () => {
      if (!isPlaying) {
        await TrackPlayer.play();
        setIsPlaying(true);
      } else {
        await TrackPlayer.pause();
        setIsPlaying(false);
      }
    };

    const skipToNext = async () => {
      await TrackPlayer.skipToNext();
    };

    const skipToPrevious = async () => {
      await TrackPlayer.skipToPrevious();
    };

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
      <View style={styles.background}></View>
        <Image
          source={{ uri: artwork }}
          style={styles.albumCover}
          resizeMode="contain"
        />
        <View style={styles.songInfoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
        <View style={styles.buttonContainer}>
        <IconButton
          icon={() => <Icon name="skip-previous" size={32} color="white" />}
          onPress={skipToPrevious}
          style={styles.iconButton}
        />
        <Button
          mode="contained"
          onPress={togglePlayback}
          style={styles.playButton}>
        <View style={styles.playButtonContent}>
          <Icon
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={30}
            color='white'
          />
        </View>
        </Button>
        <IconButton
          icon={() => <Icon name="skip-next" size={32} color="white" />}
          onPress={skipToNext}
          style={styles.iconButton}
        />
      </View>
    </View>
    </View>
    );
  };
}