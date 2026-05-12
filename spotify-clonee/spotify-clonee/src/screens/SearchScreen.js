import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, StyleSheet, StatusBar, FlatList,
} from 'react-native';
import { COLORS, CategoryCard, SongRow, MiniPlayer } from '../components';
import { categories, songs, currentTrack } from '../data/dummyData';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 0
    ? songs.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const renderCatRow = ({ item, index }) => {
    if (index % 2 === 1) return null;
    const next = categories[index + 1];
    return (
      <View style={{ flexDirection: 'row' }}>
        <CategoryCard item={item} onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })} />
        {next && <CategoryCard item={next} onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })} />}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 140 }}>

        <Text style={styles.heading}>Search</Text>

        {/* Search Bar */}
        <View style={[styles.searchBar, focused && styles.searchBarFocused]}>
          <Text style={{ fontSize: 16, marginRight: 8, color: focused ? '#fff' : COLORS.textMuted }}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="What do you want to listen to?"
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={{ color: COLORS.textSecondary, fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Results or Categories */}
        {query.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Songs</Text>
            {filtered.length === 0 ? (
              <View style={styles.noResults}>
                <Text style={{ fontSize: 40 }}>🎵</Text>
                <Text style={styles.noResultsText}>No results for "{query}"</Text>
                <Text style={styles.noResultsSub}>Check the spelling or try different keywords.</Text>
              </View>
            ) : (
              filtered.map((item, index) => (
                <SongRow
                  key={item.id}
                  item={item}
                  index={index}
                  onPress={() => navigation.navigate('NowPlaying', { track: currentTrack })}
                />
              ))
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Browse all</Text>
            <FlatList
              data={categories}
              keyExtractor={i => i.id}
              renderItem={renderCatRow}
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
            />
          </View>
        )}
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
  heading: { color: COLORS.text, fontSize: 26, fontWeight: '800', paddingHorizontal: 16, paddingTop: 50, marginBottom: 14 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderRadius: 8, marginHorizontal: 16, paddingHorizontal: 14, paddingVertical: 11, marginBottom: 20, borderWidth: 2, borderColor: 'transparent' },
  searchBarFocused: { borderColor: COLORS.text },
  input: { flex: 1, color: COLORS.text, fontSize: 14 },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800', paddingHorizontal: 16, marginBottom: 12 },
  noResults: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32 },
  noResultsText: { color: COLORS.text, fontSize: 18, fontWeight: '800', textAlign: 'center', marginTop: 16 },
  noResultsSub: { color: COLORS.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 8 },
  miniWrap: { position: 'absolute', bottom: 60, left: 0, right: 0 },
});