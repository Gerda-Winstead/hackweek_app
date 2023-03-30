import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen.js';
import { createPlaylistScreen } from './components/PlaylistComponent.js'
import { RoeVWadePlaylistContent } from './screens/playlists/RoeVWadePlaylist.js'
import { TikTokBanPlaylistContent } from './screens/playlists/TikTokBanPlaylist.js'

import TrackPlayer from 'react-native-track-player';

const Stack = createNativeStackNavigator();

const App = () => {

  const RoeVWadePlaylist = createPlaylistScreen(RoeVWadePlaylistContent);
  const TikTokBanPlaylist = createPlaylistScreen(TikTokBanPlaylistContent);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="RoeVWadePlaylist" 
          component={RoeVWadePlaylist} 
          options={{
            headerStyle: {
              backgroundColor: '#1DB954',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
              height: 10,
            },
          }}
        />
        <Stack.Screen 
          name="TikTokBanPlaylist" 
          component={TikTokBanPlaylist} 
          options={{
            headerStyle: {
              backgroundColor: '#1DB954',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
              height: 10,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
