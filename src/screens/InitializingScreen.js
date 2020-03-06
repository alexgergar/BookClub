import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default class Initializing extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color='#1E3342' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
