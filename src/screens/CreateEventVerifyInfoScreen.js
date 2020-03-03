/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import UserContext from '../context/UserContext';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';
import EditInfoBlock from '../components/EditInfoBlock';
import BadgeListItem from '../components/BadgeListItem';
import firestore from '@react-native-firebase/firestore';

export default class CreateEventVerifyInfo extends Component {
  static contextType = UserContext;
  state={
    newBookClubID: null,
  }

  componentDidMount() {
    const {selectedBook} = this.props.route.params;
      console.log(selectedBook);
  }

  handleContinueButtonPress = async () => {
    let user = this.context;
    const {
      selectedBook,
      streetAddress,
      city,
      state,
      zipcode,
      detailsForLocation,
      bookClubMembers,
      bookClubName,
      bookClubID,
      date,
      newClub } = this.props.route.params;
    const membersOfBookClub = [];
    bookClubMembers.forEach(member => {
      let thisMember = {
        displayName: member.displayName,
        uid: member.uid,
        email: member.email,
        phone: member.phone,
      };
      membersOfBookClub.push(thisMember);
    });
    const membersOfBookClubUID = [];
    bookClubMembers.forEach(member => {
      membersOfBookClubUID.push(member.uid);
    });
    const thisEvent = {
      attendees: membersOfBookClub,
      bookForEvent: {
        title: selectedBook.title,
        authors: selectedBook.authors,
        isbn: selectedBook.isbn,
        smallThumbnail: selectedBook.smallThumbnail,
        thumbnail: selectedBook.thumbnail,
        pageCount: selectedBook.pageCount,
        language: selectedBook.language,
        averageRating: selectedBook.averageRating,
        ratingsCount: selectedBook.ratingsCount,
        description: selectedBook.description,
        authorID: selectedBook.authorID,
        authorBio: selectedBook.authorBio,
        authorImage: selectedBook.authorImage,
        otherBooksByAuthor: selectedBook.otherBooksByAuthor,

      },
      bookClub: {
        bookClubID: bookClubID,
        name: bookClubName,
      },
      eventDate: date.date,
      eventTime: date.time,
      detailsForEvent: '',
      eventLocation: {
        address: {
          streetAddress: streetAddress,
          city: city,
          state: state,
          zipcode: zipcode,
        },
        detailsForLocation: detailsForLocation,
      },
      host: {
        displayName: user.displayName,
        email: user.email,
        phone: user.phone,
        uid: user.uid,
      },
    };
    const newBookClub = {
      members: membersOfBookClub,
      membersUID: membersOfBookClubUID,
      nameOfBookClub: bookClubName,
    };
    if (newClub) {
      await firestore().collection('bookclubs')
        .add(newBookClub)
        .then(ref => {
          this.setState({newBookClubID: ref.id});
        })
        .catch(error => console.log(error));
      thisEvent.bookClub.bookClubID = this.state.newBookClubID;
      this.handleCreateEventInFirestore(thisEvent, membersOfBookClubUID);
    } else {
      this.handleCreateEventInFirestore(thisEvent, membersOfBookClubUID);
    }
  }

  handleCreateEventInFirestore = async (thisEvent, membersOfBookClubUID) => {
    await firestore()
      .collection('events')
      .add(thisEvent)
      .then(ref => {
        console.log(ref.id);
        this.handleUpdateUserEvents(thisEvent, membersOfBookClubUID, ref.id)
      })
      .catch(error => console.log(error));
  }

/// TBD handle if user doesn't exist in DB - currently just erroring out
  handleUpdateUserEvents = async (thisEvent, membersOfBookClubUID, eventID) => {
    const addToUserEventArray = firestore.FieldValue.arrayUnion({
      bookCover: thisEvent.bookForEvent.thumbnail,
      bookTitle: thisEvent.bookForEvent.title,
      date: thisEvent.eventDate,
      time: thisEvent.eventTime,
      eventID: eventID,
    });
    await membersOfBookClubUID.forEach(memberUID => {
      firestore()
        .collection('users')
        .doc(memberUID)
        .update({
          events: addToUserEventArray
        })
        .then(ref => {
          this.props.navigation.navigate('MainEvent', {
            eventID: eventID
          });
        })
        .catch(error => console.log(error));
    })
  } 

  onEditLocationPress = () => {
    const {
      selectedBook,
      bookClubMembers,
      newClub,
      date,
      bookClubID,
      bookClubName,
    } = this.props.route.params;
    this.props.navigation.navigate('CreateEventAddDetails', {
      onUpdate: true,
      selectedBook: selectedBook,
      membersForBookClub: bookClubMembers,
      bookClubID: bookClubID,
      bookClubName: bookClubName,
      date: date,
      newClub: newClub,
    });
  }

  onEditBookSelectionPress = () => {
    const { streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers, newClub, bookClubID, bookClubName, date } = this.props.route.params;
    this.props.navigation.navigate('CreateEvent', {
      onUpdate: true,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      detailsForLocation: detailsForLocation,
      membersForBookClub: bookClubMembers,
      bookClubName: bookClubName,
      bookClubID: bookClubID,
      newClub: newClub,
      date: date,
    });
  }

  onEditDatePress = () => {
    const { streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers, newClub, bookClubID, bookClubName, selectedBook } = this.props.route.params;
    this.props.navigation.navigate('CreateEventPickDate', {
      onUpdate: true,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      detailsForLocation: detailsForLocation,
      membersForBookClub: bookClubMembers,
      bookClubName: bookClubName,
      bookClubID: bookClubID,
      newClub: newClub,
      selectedBook: selectedBook,
    });
  }

  onEditInvitedMembersPress = () => {
    const {
      streetAddress,
      city,
      state,
      zipcode,
      detailsForLocation,
      bookClubMembers,
      selectedBook,
      bookClubID,
      bookClubName,
      date,
    } = this.props.route.params;
    this.props.navigation.navigate('CreateEventAttendees', {
      streetAddress,
      city,
      state,
      zipcode,
      detailsForLocation,
      bookClubMembers,
      selectedBook,
      bookClubID,
      bookClubName,
      date,
    });
  }

  render() {
    let user = this.context;
    const { selectedBook, streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers, date } = this.props.route.params;
    return (
      <GreyWhiteBackgroundBottomButton
        headline="Verify Informtion"
        subHeadline="Make sure everything looks good"
        buttonTitle="Save Your Event"
        continueButtonOnPress={this.handleContinueButtonPress}>
        <View>
          <Text style={styles.headline3}>Host: {user.displayName}</Text>
        </View>
        <EditInfoBlock headline="Date" onEditPress={this.onEditDatePress}>
          <Text style={styles.headline3}>{date.date} at {date.time}</Text>
        </EditInfoBlock>
        <EditInfoBlock
          headline="Location"
          onEditPress={this.onEditLocationPress}>
          <Text style={styles.headline3}>Address:</Text>
          <View style={{paddingHorizontal: '5%'}}>
            <Text style={styles.textNormal}>{streetAddress}</Text>
            <Text style={styles.textNormal}>
              {city} {state}, {zipcode}
            </Text>
          </View>
          <Text style={[styles.headline3, {paddingTop: '1%'}]}>
            Details For Location:
          </Text>
          <View style={{paddingHorizontal: '5%'}}>
            <Text style={styles.textNormal}>{detailsForLocation}</Text>
          </View>
        </EditInfoBlock>
        <EditInfoBlock
          headline="Book Details"
          onEditPress={this.onEditBookSelectionPress}>
          <View style={styles.bookDetailsView}>
            <Image
              style={styles.bookImageView}
              source={{uri: selectedBook.thumbnail}}
              resizeMode={'cover'}
            />
            <View style={styles.bookDetails}>
              <Text style={[styles.headline3, styles.semiBold]}>
                {selectedBook.title}
              </Text>
              <Text style={styles.headline4}>{selectedBook.authors}</Text>
            </View>
          </View>
        </EditInfoBlock>
        <EditInfoBlock
          headline="Invited Members"
          onEditPress={this.onEditInvitedMembersPress}>
          <View style={styles.invitedMembersListView}>
            {bookClubMembers.map((member, index) => (
              <BadgeListItem
                key={index}
                avatar={member.avatar}
                displayName={member.displayName}
              />
            ))}
          </View>
        </EditInfoBlock>
      </GreyWhiteBackgroundBottomButton>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookcoverHeight = windowHeight * 0.15;
const bookcoverWidth = bookcoverHeight / 1.6;

const styles = StyleSheet.create({
  headline3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  semiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  textNormal: {
    fontFamily: 'Montserrat-Regular',
  },
  headline4: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  bookDetailsView: {
    flexDirection: 'row',
    // paddingHorizontal: '3%',
  },
  bookImageView: {
    borderRadius: 5,
    width: bookcoverWidth,
    height: bookcoverHeight,
  },
  bookDetails: {
    paddingLeft: '5%',
    justifyContent: 'center',
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  invitedMembersListView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
