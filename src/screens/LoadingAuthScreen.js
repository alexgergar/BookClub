import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import UserContext from '../context/UserContext';

export default class LoadingAuth extends React.Component {
  componentDidMount() {
    let user = this.context;
    console.log('loading auth screen')
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E3342" />
        {/* <LottieView
          source={require('../utils/loading-book-blue.json')}
          autoPlay
          loop
        /> */}
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

LoadingAuth.contextType = UserContext;
