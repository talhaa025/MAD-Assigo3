import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, Dimensions, StatusBar, ScrollView,
} from 'react-native';
import { COLORS } from '../components';

const { width: W } = Dimensions.get('window');
const ART_SIZE = W - 64;

export default function NowPlayingScreen({ navigation, route }) {
  const track = route.params?.track ?? {
    id: '1', title: 'Blinding Lights', artist: 'The Weeknd',
    image: 'https://picsum.photos/seed/blinding/300/300',
    duration: 200, progress: 74, isLiked: true,
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(track.isLiked);
  const [progress, setProgress] = useState(track.progress);
  const [shuffled, setShuffled] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(() => {
        setProgress(p => (p >= track.duration ? 0 : p + 1));
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [isPlaying]);

  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const pct = Math.min(progress / track.duration, 1);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient effect */}
      <View style={styles.bgTop} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>⌄</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.topLabel}>PLAYING FROM PLAYLIST</Text>
            <Text style={styles.topPlaylist}>Chill Vibes</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.moreBtn}>•••</Text>
          </TouchableOpacity>
        </View>

        {/* Album Art */}
        <View style={styles.artWrap}>
          <Image source={{ uri: track.image }} style={styles.art} />
        </View>

        {/* Track Info */}
        <View style={styles.infoRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
            <Text style={styles.trackArtist}>{track.artist}</Text>
          </View>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Text style={[styles.heart, { color: liked ? COLORS.primary : COLORS.textSecondary }]}>
              {liked ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
            <View style={[styles.thumb, { left: `${pct * 100}%` }]} />
          </View>
          <View style={styles.timesRow}>
            <Text style={styles.timeText}>{fmt(progress)}</Text>
            <Text style={styles.timeText}>-{fmt(track.duration - progress)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => setShuffled(!shuffled)}>
            <Text style={[styles.ctrlIcon, { color: shuffled ? COLORS.primary : COLORS.textSecondary }]}>⇄</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.skipIcon}>⏮</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={styles.playBtn}>
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.skipIcon}>⏭</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRepeat((repeat + 1) % 3)}>
            <Text style={[styles.ctrlIcon, { color: repeat > 0 ? COLORS.primary : COLORS.textSecondary }]}>↻</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomRow}>
          <TouchableOpacity><Text style={styles.bottomIcon}>↗</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.bottomIcon}>🎤</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.bottomIcon}>☰</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.bottomIcon}>📱</Text></TouchableOpacity>
        </View>

        {/* Volume */}
        <View style={styles.volRow}>
          <Text style={styles.volIcon}>🔈</Text>
          <View style={styles.volTrack}>
            <View style={styles.volFill} />
          </View>
          <Text style={styles.volIcon}>🔊</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  bgTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 300, backgroundColor: '#2d1b4e', opacity: 0.8 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, marginBottom: 24 },
  backArrow: { color: COLORS.text, fontSize: 32, fontWeight: '300', lineHeight: 32 },
  topLabel: { color: COLORS.textSecondary, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  topPlaylist: { color: COLORS.text, fontSize: 13, fontWeight: '700', marginTop: 2 },
  moreBtn: { color: COLORS.text, fontSize: 18, letterSpacing: 2 },
  artWrap: { alignItems: 'center', marginBottom: 32, paddingHorizontal: 32 },
  art: { width: ART_SIZE, height: ART_SIZE, borderRadius: 10, backgroundColor: COLORS.surfaceLight },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 20 },
  trackTitle: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  trackArtist: { color: COLORS.textSecondary, fontSize: 15, marginTop: 4 },
  heart: { fontSize: 28, paddingLeft: 12 },
  progressWrap: { paddingHorizontal: 24, marginBottom: 24 },
  progressTrack: { height: 4, backgroundColor: COLORS.surfaceLight, borderRadius: 2, overflow: 'visible' },
  progressFill: { height: '100%', backgroundColor: COLORS.text, borderRadius: 2 },
  thumb: { position: 'absolute', top: -5, marginLeft: -6, width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.text },
  timesRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  timeText: { color: COLORS.textSecondary, fontSize: 12 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 32 },
  ctrlIcon: { fontSize: 22 },
  skipIcon: { color: COLORS.text, fontSize: 28 },
  playBtn: { width: 68, height: 68, borderRadius: 34, backgroundColor: COLORS.text, alignItems: 'center', justifyContent: 'center' },
  playIcon: { fontSize: 28, color: '#000' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginBottom: 28 },
  bottomIcon: { fontSize: 20, color: COLORS.textSecondary },
  volRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, gap: 10 },
  volIcon: { fontSize: 16 },
  volTrack: { flex: 1, height: 4, backgroundColor: COLORS.surfaceLight, borderRadius: 2, overflow: 'hidden' },
  volFill: { height: '100%', width: '65%', backgroundColor: COLORS.textSecondary, borderRadius: 2 },
});