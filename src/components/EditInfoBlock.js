import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Icon} from 'react-native-elements';

const EditInfoBlock = props => (
  <View style={styles.container}>
    <View style={styles.topRowView}>
      <Text style={styles.headlineTitleText}>{props.headline}</Text>
      <Icon type="feather" name="edit-2" size={18} />
    </View>
    <View style={styles.mainContentView}>
      {props.children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: '3%',
  },
  topRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  headlineTitleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  subHeadLineText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  mainContentView: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});

export default EditInfoBlock;
