import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import UserContext from '../context/UserContext';


function LoadingAfterSignUp() {
  let {user} = this.context;
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E3342" />
        {user.displayName ? this.props.navigation.navigate('OnboardingStack', { screen: 'OnboardingOneProfile' }) : this.props.navigation.navigate('Home')}
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

LoadingAfterSignUp.contextType = UserContext;
export default LoadingAfterSignUp;
