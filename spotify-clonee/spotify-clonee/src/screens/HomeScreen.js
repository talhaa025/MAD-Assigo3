import React, { useState } from 'react';
import {
  View, Text, ScrollView, FlatList,
  TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import { COLORS, PlaylistCard, RecentTile, SectionHeader, MiniPlayer } from '../components';
import { featuredPlaylists, recentlyPlayed, currentTrack } from '../data/dummyData';

const FILTERS = ['All', 'Music', 'Podcasts'];

export default function HomeScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.greeting}>{greeting()}</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity><Text style={styles.icon}>🔔</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.icon}>🕐</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.icon}>⚙️</Text></TouchableOpacity>
          </View>
        </View>

        {/* Filter Chips */}
        <View style={styles.filters}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recently Played */}
        <View style={styles.recentGrid}>
          {recentlyPlayed.slice(0, 6).map(item => (
            <RecentTile
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })}
            />
          ))}
        </View>

        {/* Featured Playlists */}
        <SectionHeader title="Featured Playlists" onSeeAll={() => navigation.navigate('Search')} />
        <FlatList
          data={featuredPlaylists}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <PlaylistCard item={item} onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })} />
          )}
        />

        {/* Jump Back In */}
        <SectionHeader title="Jump Back In" />
        <FlatList
          data={recentlyPlayed}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <PlaylistCard item={item} size={130} onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })} />
          )}
        />

        {/* Made For You */}
        <SectionHeader title="Made For You" />
        <FlatList
          data={featuredPlaylists.slice().reverse()}
          keyExtractor={i => i.id + '_mfy'}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <PlaylistCard item={item} onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })} />
          )}
        />
      </ScrollView>

      {/* Mini Player */}
      <View style={styles.miniWrap}>
        <MiniPlayer track={currentTrack} onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, marginBottom: 14 },
  greeting: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  icon: { fontSize: 20 },
  filters: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: COLORS.surfaceLight },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#000' },
  recentGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, marginBottom: 4 },
  miniWrap: { position: 'absolute', bottom: 60, left: 0, right: 0 },
});