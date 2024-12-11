import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IntroScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
      }),
      // Pulse animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
        }),
      ]),
    ]).start();

    // Navigation logic
    const checkOnboardingStatus = async () => {
      try {
        await AsyncStorage.removeItem('hasSeenOnboarding');
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.replace('/info');
      } catch (error) {
        console.error('Error:', error);
        router.replace('/info');
      }
    };

    checkOnboardingStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/images/my-logo.png')}
          style={[styles.logo, { alignSelf: 'center' }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  }
});
