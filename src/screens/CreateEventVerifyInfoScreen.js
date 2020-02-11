/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Keyboard,
  FlatList,
  PermissionsAndroid,
  Platform,
  Modal,
} from 'react-native';
import { Button, Icon, ListItem, Input, Avatar, Badge } from 'react-native-elements';
import UserContext from '../context/UserContext';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

import EditInfoBlock from '../components/EditInfoBlock';
import BadgeListItem from '../components/BadgeListItem';
import TextRow from '../components/TextRow';
import firestore from '@react-native-firebase/firestore';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class CreateEventVerifyInfo extends Component {
  static contextType = UserContext;
  state = {
  };

  componentDidMount() {
    const { selectedBook, streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers } = this.props.navigation.state.params;
    // console.log(selectedBook.title);
    let user = this.context;

  }

  handleContinueButtonPress = () => {
      const { selectedBook, streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers } = this.props.navigation.state.params;
    console.log('continue button pressed on verfiy info screen')
  }

  onEditLocationPress = () => {
    const {selectedBook, bookClubMembers} = this.props.navigation.state.params;
    this.props.navigation.navigate('CreateEventAddDetails', {
      onUpdate: true,
      selectedBook: selectedBook,
      membersForBookClub: bookClubMembers,
    });
  }

  onEditBookSelectionPress = () => {
    const { streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers } = this.props.navigation.state.params;
    this.props.navigation.navigate('CreateEvent', {
      onUpdate: true,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      detailsForLocation: detailsForLocation,
      membersForBookClub: bookClubMembers,
    });
  }

  onEditInvitedMembersPress = () => {
    const {bookClubMembers} = this.props.navigation.state.params;
    console.log('in on members edit press');
  }

  

  render() {
    let user = this.context;
    const { selectedBook, streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers } = this.props.navigation.state.params;
    return (
      <GreyWhiteBackgroundBottomButton
        headline='Verify Informtion'
        subHeadline='Make sure everything looks good'
        continueButtonOnPress={this.handleContinueButtonPress}>
          <View>
            <Text style={styles.headline3}>Host: {user.displayName}</Text>
          </View>
        <EditInfoBlock headline='Location' onEditPress={this.onEditLocationPress}>
            <Text style={styles.headline3}>Address:</Text>
            <View style={{ paddingHorizontal: '5%' }}>
              <Text style={styles.textNormal}>{streetAddress}</Text>
              <Text style={styles.textNormal}>{city} {state}, {zipcode}</Text>
            </View>
            <Text style={[styles.headline3, { paddingTop: '1%' }]}>Details For Location:</Text>
            <View style={{ paddingHorizontal: '5%' }}>
              <Text style={styles.textNormal}>{detailsForLocation}</Text>
            </View>
          </EditInfoBlock>
        <EditInfoBlock headline='Book Details' onEditPress={this.onEditBookSelectionPress}>
            <View style={styles.bookDetailsView}>
              <Image
                style={styles.bookImageView}
                source={{ uri: selectedBook.thumbnail }}
                resizeMode={'cover'}
              />
              <View style={styles.bookDetails}>
                <Text style={[styles.headline3, styles.semiBold]}>{selectedBook.title}</Text>
                <Text style={styles.headline4}>{selectedBook.authors}</Text>
              </View>
            </View>
          </EditInfoBlock>
        <EditInfoBlock headline='Invited Members' onEditPress={this.onEditInvitedMembersPress}>
            <View style={styles.invitedMembersListView}>
              {bookClubMembers.map((member, index) => (
                <BadgeListItem 
                  key={index}
                  avatar={member.avatar}
                  displayName={member.displayName} /> 
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
