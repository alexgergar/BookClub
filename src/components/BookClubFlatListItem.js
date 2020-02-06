import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const BookClubFlatListItem = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
});
export default BookClubFlatListItem;
