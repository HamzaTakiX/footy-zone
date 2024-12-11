import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      // Mark that user has seen the onboarding
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      // Navigate to get started page
      router.replace('/get-started');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Welcome to Footy Zone</Text>
        
        <View style={styles.featureSection}>
          <Text style={styles.sectionTitle}>App Features:</Text>
          
          <Text style={styles.featureItem}>
            • Live Match Updates and Scores
          </Text>
          <Text style={styles.featureItem}>
            • Player Statistics and Analysis
          </Text>
          <Text style={styles.featureItem}>
            • Team Rankings and Standings
          </Text>
          <Text style={styles.featureItem}>
            • Match Highlights and News
          </Text>
          <Text style={styles.featureItem}>
            • Personalized Team Notifications
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 30,
  },
  featureSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  featureItem: {
    fontSize: 18,
    marginBottom: 15,
    color: '#555',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
