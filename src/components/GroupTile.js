import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import AvatarSpread from './AvatarSpread';

const GroupTile = props => {
  // const membersInBookClub = props.bookClub.members.map(
  //   (bookClub) => bookClub
  // );
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={styles.headlineOne}><Text>{props.bookClub.nameOfBookClub}</Text></Text>
      <View style={{alignItems: 'center'}}>
        <AvatarSpread
          numberShown={3}
          key={props.bookClub.bookClubID}
          users={props.bookClub.members}
        />
      </View>
      <View style={styles.bottomRightTextView}>
        <Text style={[styles.headlineTwo, styles.darkBlueFont]}>{props.bookClub.members.length} members</Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * .3,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  headlineOne: {
    fontFamily: 'Montserrat-SemiBold',
  },
  headlineTwo: {
    fontFamily: 'Karla-Regular',
    fontSize: 12,
  },
  bottomRightTextView: {
    alignItems: 'flex-end',
  },
  darkBlueFont: {
    color: '#1E3342',
  }
});

export default GroupTile;
