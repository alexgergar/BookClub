import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export default class LoadingAuth extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../utils/loading-book-blue.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
