import React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {Icon, Button} from 'react-native-elements';


const MenuDrawerButton = props => {
  return (
    <View style={[styles.menuView, Platform.OS === 'android' ? {top: 5} : {top: windowHeight * .06}]}>
    <Button 
      type='clear'
      icon={<Icon name="menu" type="feather" color="#3A5673" />}
      onPress={props.onPress} />
      </View>
  )
}
  

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  menuView: {zIndex: 100, position: 'absolute', left: 5},
});

export default MenuDrawerButton;
