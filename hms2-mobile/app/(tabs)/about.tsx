import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://placehold.co/1600x800/333333/FFFFFF?text=Our+Hotel' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Experience Unparalleled Luxury</Text>
          <Text style={styles.heroSubtitle}>
            Discover a sanctuary of elegance and serenity in the heart of the city.
          </Text>
        </View>
      </View>

      {/* Our Story Section */}
      <View style={styles.section}>
        <View style={styles.storyRow}>
          <View style={styles.storyTextCol}>
            <Text style={styles.sectionTitle}>Our Story: A Legacy of Excellence</Text>
            <Text style={styles.sectionText}>
              Established in 1998, The Grand Hotel has been a beacon of luxury and refinement for over two decades. Our founder, envisioned a place where every guest is treated like royalty, a philosophy that continues to guide us today.
            </Text>
            <Text style={styles.sectionText}>
              Nestled in the vibrant heart of the city, our hotel is more than just a place to stay—it's an experience. From our meticulously designed suites to our world-class dining, every detail is crafted to ensure your utmost comfort and satisfaction.
            </Text>
          </View>
          <Image
            source={{ uri: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Lobby' }}
            style={styles.storyImage}
          />
        </View>
      </View>

      {/* Amenities Section */}
      <View style={[styles.section, { backgroundColor: '#fff' }]}> 
        <Text style={styles.sectionTitle}>World-Class Amenities</Text>
        <View style={styles.amenitiesRow}>
          <View style={styles.amenityCol}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#6366F1" />
            <Text style={styles.amenityLabel}>Gourmet Dining</Text>
          </View>
          <View style={styles.amenityCol}>
            <FontAwesome5 name="dumbbell" size={40} color="#6366F1" />
            <Text style={styles.amenityLabel}>Fitness Center</Text>
          </View>
          <View style={styles.amenityCol}>
            <Ionicons name="wifi" size={40} color="#6366F1" />
            <Text style={styles.amenityLabel}>High-Speed Wi-Fi</Text>
          </View>
          <View style={styles.amenityCol}>
            <MaterialCommunityIcons name="spa" size={40} color="#6366F1" />
            <Text style={styles.amenityLabel}>Spa & Wellness</Text>
          </View>
        </View>
      </View>

      {/* Gallery Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>A Glimpse of Paradise</Text>
        <View style={styles.galleryRow}>
          {["https://placehold.co/600x400/BFDBFE/1E3A8A?text=Poolside","https://placehold.co/600x400/C7D2FE/1E40AF?text=Suite+View","https://placehold.co/600x400/DDD6FE/3730A3?text=Restaurant"].map((src, idx) => (
            <Image key={idx} source={{ uri: src }} style={styles.galleryImage} />
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={[styles.section, styles.ctaSection]}>
        <Text style={styles.ctaTitle}>Your Unforgettable Stay Awaits</Text>
        <Text style={styles.ctaText}>
          Contact us to book your reservation and experience the pinnacle of luxury.
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  heroSection: {
    height: 220,
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    paddingHorizontal: 16,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'left',
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  storyTextCol: {
    flex: 1.5,
  },
  storyImage: {
    flex: 1,
    width: 120,
    height: 90,
    borderRadius: 12,
    marginLeft: 12,
  },
  amenitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    marginBottom: 8,
  },
  amenityCol: {
    alignItems: 'center',
    flex: 1,
  },
  amenityLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  galleryImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  ctaSection: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 24,
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 12,
  },
  ctaButtonText: {
    color: '#6366F1',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
