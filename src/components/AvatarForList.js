import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';



const AvatarForLists = props => (
  <Avatar
    rounded
    source={{uri: props.avatarImage} || {require('../utils/bookPlaceholder.png')}}
    containerStyle={styles.avatarContainer}
  />
);

const styles = StyleSheet.create({
  avatarContainer: {
    
  }
});
export default AvatarForLists;
