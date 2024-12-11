import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { 
  useFonts,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function InfoScreen() {
  const router = useRouter();
  const slideAnim = React.useRef(new Animated.Value(windowWidth)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const parallaxAnim = React.useRef(new Animated.Value(0)).current;
  const buttonScale = React.useRef(new Animated.Value(1)).current;
  
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(parallaxAnim, {
        toValue: 100,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleNext = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -windowWidth,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(parallaxAnim, {
        toValue: -100,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start(() => {
      router.replace('/get-started');
    });
  };

  const handleButtonPress = () => {
    Animated.sequence([
      Animated.spring(buttonScale, {
        toValue: 0.95,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start(() => handleNext());
  };

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: slideAnim } }],
    { 
      useNativeDriver: true,
      listener: ({ nativeEvent }) => {
        const newValue = nativeEvent.translationX;
        if (newValue <= 0) {
          slideAnim.setValue(newValue);
        }
      }
    }
  );

  const handleGestureEnd = ({ nativeEvent }) => {
    if (nativeEvent.translationX > windowWidth / 3) {
      Animated.timing(slideAnim, {
        toValue: windowWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        router.replace('/(tabs)/info2');
      });
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <PanGestureHandler onGestureEvent={handleGesture} onEnded={handleGestureEnd}>
        <Animated.View 
          style={[
            styles.mainContainer, 
            { 
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.topSection}>
            <ImageBackground
              source={require('../../assets/images/whiteBackground.png')}
              style={[styles.whiteBackground, { transform: [{ translateY: parallaxAnim }] }]}
              resizeMode="cover"
            />
            <View style={styles.greenWave} />
            <Image
              source={require('../../assets/images/my-black-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.welcomeText}>
            Messaging
            </Text>

            <Text style={styles.description}>
              Make recycling easy and efficient. Learn how you can help the environment by sorting waste correctly.
            </Text>

            <View style={styles.dotsContainer}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            </View>

            <TouchableOpacity 
              onPress={handleButtonPress}
              activeOpacity={1}
            >
              <Animated.View style={[
                styles.nextButton,
                { transform: [{ scale: buttonScale }] }
              ]}>
                <Text style={styles.nextButtonText}>Next</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5cb56d',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#5cb56d',
  },
  topSection: {
    height: '50%',
    position: 'relative',
  },
  whiteBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '137%',
    width: '102%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },

  logo: {
    width: 180,
    height: 180,
    position: 'absolute',
    top: '30%',
    right: 115,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 180,
  },
  welcomeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 0.6,
  },
  description: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22.5,
    letterSpacing: 0.45,
    marginBottom: 25,
    paddingHorizontal: 30,
  },
  nextButton: {
    width: 87,
    height: 49,
    backgroundColor: '#ffffff',
    borderRadius: 578,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    fontWeight: '500',
    color: '#27963c',
    letterSpacing: 0.45,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    marginHorizontal: 5,
    opacity: 0.5,
  },
  activeDot: {
    opacity: 1,
    backgroundColor: '#FFCC00',
  }
});
