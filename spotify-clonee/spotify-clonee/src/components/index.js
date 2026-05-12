import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  Image, StyleSheet,
} from 'react-native';

export const COLORS = {
  background: '#121212',
  surface: '#181818',
  surfaceLight: '#282828',
  primary: '#1DB954',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textMuted: '#535353',
  border: '#282828',
};

// ── Header ──────────────────────────────────────────────────
export const Header = ({ title }) => (
  <View style={headerStyles.container}>
    <Text style={headerStyles.title}>{title}</Text>
  </View>
);
const headerStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
});

// ── Section Header ───────────────────────────────────────────
export const SectionHeader = ({ title, onSeeAll }) => (
  <View style={secStyles.container}>
    <Text style={secStyles.title}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={secStyles.seeAll}>See all</Text>
      </TouchableOpacity>
    )}
  </View>
);
const secStyles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 20, marginBottom: 10 },
  title: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  seeAll: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
});

// ── Playlist Card ────────────────────────────────────────────
export const PlaylistCard = ({ item, onPress, size = 140 }) => (
  <TouchableOpacity onPress={onPress} style={{ width: size, marginRight: 12 }}>
    <Image source={{ uri: item.image }} style={{ width: size, height: size, borderRadius: 6, backgroundColor: COLORS.surfaceLight }} />
    <Text style={{ color: COLORS.text, fontSize: 13, fontWeight: '600', marginTop: 8 }} numberOfLines={2}>{item.title}</Text>
    {item.description ? <Text style={{ color: COLORS.textSecondary, fontSize: 11, marginTop: 2 }} numberOfLines={1}>{item.description}</Text> : null}
  </TouchableOpacity>
);

// ── Recent Tile ──────────────────────────────────────────────
export const RecentTile = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={tileStyles.container}>
    <Image source={{ uri: item.image }} style={tileStyles.image} />
    <Text style={tileStyles.title} numberOfLines={1}>{item.title}</Text>
  </TouchableOpacity>
);
const tileStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderRadius: 6, flex: 1, minWidth: '45%', margin: 4, overflow: 'hidden' },
  image: { width: 52, height: 52, backgroundColor: COLORS.border },
  title: { flex: 1, color: COLORS.text, fontSize: 13, fontWeight: '700', paddingHorizontal: 10 },
});

// ── Song Row ─────────────────────────────────────────────────
export const SongRow = ({ item, onPress }) => {
  const [liked, setLiked] = useState(item.isLiked);
  return (
    <TouchableOpacity onPress={onPress} style={songStyles.container}>
      <Image source={{ uri: item.image }} style={songStyles.image} />
      <View style={songStyles.info}>
        <Text style={songStyles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={songStyles.artist} numberOfLines={1}>{item.artist}</Text>
      </View>
      <TouchableOpacity onPress={() => setLiked(!liked)} style={{ padding: 8 }}>
        <Text style={{ color: liked ? COLORS.primary : COLORS.textSecondary, fontSize: 16 }}>{liked ? '♥' : '♡'}</Text>
      </TouchableOpacity>
      <Text style={songStyles.duration}>{item.duration}</Text>
    </TouchableOpacity>
  );
};
const songStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16 },
  image: { width: 44, height: 44, borderRadius: 4, backgroundColor: COLORS.surfaceLight },
  info: { flex: 1, marginLeft: 12 },
  title: { color: COLORS.text, fontSize: 14, fontWeight: '500' },
  artist: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  duration: { color: COLORS.textSecondary, fontSize: 12, marginLeft: 8 },
});

// ── Category Card ────────────────────────────────────────────
export const CategoryCard = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[catStyles.container, { backgroundColor: item.color }]}>
    <Text style={catStyles.title}>{item.title}</Text>
    <Image source={{ uri: item.image }} style={catStyles.image} />
  </TouchableOpacity>
);
const catStyles = StyleSheet.create({
  container: { flex: 1, borderRadius: 8, height: 100, margin: 4, overflow: 'hidden', justifyContent: 'flex-end', padding: 12 },
  title: { color: COLORS.text, fontSize: 14, fontWeight: '800', zIndex: 1 },
  image: { position: 'absolute', right: -10, bottom: -10, width: 70, height: 70, borderRadius: 6, transform: [{ rotate: '25deg' }] },
});

// ── Mini Player ───────────────────────────────────────────────
export const MiniPlayer = ({ track, onPress }) => {
  const [playing, setPlaying] = useState(true);
  return (
    <TouchableOpacity onPress={onPress} style={miniStyles.container} activeOpacity={0.95}>
      <View style={[miniStyles.progress, { width: `${(track.progress / track.duration) * 100}%` }]} />
      <Image source={{ uri: track.image }} style={miniStyles.image} />
      <View style={miniStyles.info}>
        <Text style={miniStyles.title} numberOfLines={1}>{track.title}</Text>
        <Text style={miniStyles.artist} numberOfLines={1}>{track.artist}</Text>
      </View>
      <TouchableOpacity style={{ padding: 6 }}>
        <Text style={{ color: COLORS.primary, fontSize: 18 }}>♥</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPlaying(!playing)} style={{ padding: 6 }}>
        <Text style={{ color: COLORS.text, fontSize: 22 }}>{playing ? '⏸' : '▶'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 6 }}>
        <Text style={{ color: COLORS.text, fontSize: 18 }}>⏭</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const miniStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#282828', borderRadius: 10, marginHorizontal: 8, marginBottom: 8, padding: 8, overflow: 'hidden' },
  progress: { position: 'absolute', bottom: 0, left: 0, height: 2, backgroundColor: COLORS.primary, zIndex: 1 },
  image: { width: 40, height: 40, borderRadius: 4, backgroundColor: COLORS.border },
  info: { flex: 1, marginLeft: 10 },
  title: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  artist: { color: COLORS.textSecondary, fontSize: 11, marginTop: 1 },
});