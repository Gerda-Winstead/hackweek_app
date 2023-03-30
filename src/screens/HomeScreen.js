import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Image, FlatList } from 'react-native';

export function HomeScreen({ navigation }) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#282828', // Spotify's background color
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      margin: 5,
    },
    text: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      margin: 10,
    }
  });

  return (
    <View style={styles.container}>
      <Image source={require('./logos/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Roe V. Wade playlist"
        onPress={() => navigation.navigate('RoeVWadePlaylist')}
        titleStyle={{ fontWeight: 'bold'}}
      />
      <Button
        title="TikTok Ban Playlist"
        onPress={() => navigation.navigate('TikTokBanPlaylist')}
        titleStyle={{ fontWeight: 'bold'}}
      />
    </View>
  );
}