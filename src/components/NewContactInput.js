import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  UIManager,
  LayoutAnimation,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import {Icon, Input} from 'react-native-elements';

export default class CreateEventAddAttendees extends Component {
  render() {
    return (
      <View>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Phone" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
