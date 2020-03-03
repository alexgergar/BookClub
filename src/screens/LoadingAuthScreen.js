import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import UserContext from '../context/UserContext';

export default class LoadingAuth extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
