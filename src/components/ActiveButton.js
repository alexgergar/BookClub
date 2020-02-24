import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button, Icon } from 'react-native-elements';

const ActiveButton = props => (
  <View>
    <Button
      title={props.title}
      type={props.type}
      titleStyle={[props.titleStyle, props.showButton ? styles.detailButtonsTitleStyle : styles.disabledTitleStyle]}
      containerStyle={[props.containerStyle]}
      onPress={props.onPress}
    />
    {props.showButton && <View style={styles.activeLine} />}
  </View>
);

const styles = StyleSheet.create({
  detailButtonsTitleStyle: {
    color: '#3A5673',
    fontFamily: 'Montserrat-Bold',
  },
  detailButtonsContainerStyle: {
    borderBottomWidth: 3,
    borderColor: '#F8B787',
    borderRadius: 100,
  },
  activeLine: {
    height: 3,
    backgroundColor: '#F8B787',
    width: '40%',
    alignSelf: 'center',
    borderRadius: 2,
  },
  disabledTitleStyle: {
    color: '#6F7C8A',
    fontFamily: 'Montserrat-SemiBold',
  }
});

export default ActiveButton;
