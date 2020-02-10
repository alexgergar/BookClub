import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const TextRow = props => (
  <View style={{ flexDirection: 'row'}}>
  {props.children}
  </View>
);

export default TextRow;
