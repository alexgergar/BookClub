import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';


export default class Home extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>You are in Home</Text>
        <Button
          title="Create Event"
          onPress={() => this.props.navigation.navigate('CreateEvent')}
        />
        <Button
          title="Main Event"
          onPress={() => this.props.navigation.navigate('MainEvent')}
        />
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

