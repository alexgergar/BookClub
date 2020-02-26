import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import AvatarForList from './AvatarForList';

const excludeAfterIndex = 4;
const ListOfAttendees = props =>
  props.attendees.reduce((shownedAttendees, attendee, index) => {
    if (index < excludeAfterIndex) {
      shownedAttendees.push(
        <AvatarForList
          displayName={props.displayName}
          avatar={props.avatar}
          avatarSize={40}
        />,
      );
    }
    return shownedAttendees;
  }, []);

const EventCardHarizontalTest = props => {
  const dayOfWeek = props.date.slice(4, 7);
  const dateNumber = props.date.slice(8, 10);
  return (
    <View style={styles.container}>
      {props.bookCover === undefined ?
        <Image
          style={styles.bookImageView}
          source={require('../utils/bookPlaceholder.png')}
          resizeMode={'contain'}
        />
        :
        <Image
          style={styles.bookImageView}
          source={{ uri: props.bookCover }}
          resizeMode={'contain'}
        />
      }
      <View style={styles.cardContainer}>
        <View style={[styles.innerCardContainer]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.bookTitleText}>{props.bookTitle}</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={styles.dateTextLineOne}>{dayOfWeek}</Text>
              <Text style={styles.dateTextLineTwo}>{dateNumber}</Text>
            </View>
          </View>
          <View>
            {/* <ListOfAttendees 
            displayName={props.displayName}
            avatar={props.avatar}
            avatarSize={40}/> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerCardWidth = (windowWidth * .9) - (windowHeight * 0.3 * .85 * .625)

const styles = StyleSheet.create({
  container: {
    width: windowWidth * .94,
    height: windowHeight * 0.3,
  },
  bookImageView: {
    height: '85%',
    aspectRatio: 0.625,
    borderRadius: 10,
    zIndex: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    right: windowWidth * 0.04,
    bottom: '3%',
    position: 'absolute',
    borderRadius: 15,
  },
  innerCardContainer: {
    height: '100%',
    padding: '5%',
    width: innerCardWidth,
    alignSelf: 'flex-end',
  },
  bookTitleText: {
    fontFamily: 'Montserrat-SemiBold',
  },
  dateTextLineOne: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  dateTextLineTwo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
});

export default EventCardHarizontalTest;
