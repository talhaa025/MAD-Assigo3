import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import { COLORS, Header, SongRow, MiniPlayer } from '../components';
import { songs, currentTrack } from '../data/dummyData';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Library Screen (Screen 3 bonus — song list)
function LibraryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingBottom: 140 }}>
        <Header title="Your Library" />
        <Text style={{ color: COLORS.text, fontSize: 22, fontWeight: '800', paddingHorizontal: 16, marginTop: 16, marginBottom: 4 }}>
          Liked Songs
        </Text>
        <Text style={{ color: COLORS.textSecondary, fontSize: 13, paddingHorizontal: 16, marginBottom: 20 }}>
          {songs.length} songs
        </Text>
        {songs.map((item, idx) => (
          <SongRow
            key={item.id}
            item={item}
            index={idx}
            onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })}
          />
        ))}
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 60, left: 0, right: 0 }}>
        <MiniPlayer track={currentTrack} onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })} />
      </View>
    </View>
  );
}

// Tab icon component
function TabIcon({ label, active }) {
  const icons = { Home: active ? '🏠' : '🏚', Search: active ? '🔍' : '🔎', Library: active ? '📚' : '📖' };
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{icons[label]}</Text>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#282828', borderTopWidth: 0.5, height: 62, paddingBottom: 8, paddingTop: 6 },
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} active={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="NowPlaying"
          component={NowPlayingScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}