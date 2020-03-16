import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import UserContext from '../context/UserContext';

export default class AfterLoginLoading extends React.Component {
  componentDidMount() {
    let user = this.context;
  }

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

AfterLoginLoading.contextType = UserContext;
