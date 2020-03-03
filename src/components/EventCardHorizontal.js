import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
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

const EventCardHorizontal = props => {
  const dayOfWeek = props.date.slice(4, 7);
  const dateNumber = props.date.slice(8, 10);
  const timeNum = props.time.length === 7 ? props.time.slice(0, 4) : props.time.slice(0, 5)
  const timeEnd = props.time.slice(-2, props.time.length)
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', alignItems: 'center', paddingTop: '2%' }}>
              <Text style={styles.dateTextLineOne}>{dayOfWeek}</Text>
              <Text style={styles.dateTextLineTwo}>{dateNumber}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.timeTextOne}>{timeNum}</Text>
              <Text style={styles.timeTextTwo}>{timeEnd}</Text>
            </View>
          </View>
          <View style={{alignSelf: 'flex-end', marginBottom: '8%'}}>
            <Text style={styles.bookTitleText}>{props.bookTitle}</Text>
          </View>
          {/* <View>
            <ListOfAttendees 
            displayName={props.displayName}
            avatar={props.avatar}
            avatarSize={40}/>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerCardWidth = (windowWidth * (.85 - .05)) - (windowHeight * 0.2 * .85 * .625) // width of container minus 5% paddingright (cardContainer) - the book width - TBD default props to change later date for reuse 

const styles = StyleSheet.create({
  container: {
    width: windowWidth * .85,
    height: windowHeight * 0.2,
  },
  bookImageView: {
    height: '85%',
    aspectRatio: 0.625,
    borderRadius: 10,
    zIndex: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '85%',
    height: '90%',
    right: windowWidth * 0.05,
    bottom: '3%',
    position: 'absolute',
    borderRadius: 15,
  },
  innerCardContainer: {
    height: '100%',
    padding: '5%',
    width: innerCardWidth,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  bookTitleText: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
  },
  timeTextOne: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
  },
  timeTextTwo: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  dateTextLineOne: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  dateTextLineTwo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
  },
});

export default EventCardHorizontal;
