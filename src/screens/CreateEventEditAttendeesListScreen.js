/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
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
import SearchBar from '../components/SearchBar';
import FlatListGroupOptions from '../components/FlatListGroupOptions';
import firestore from '@react-native-firebase/firestore';
import Contacts from 'react-native-contacts';
import { TouchableHighlight } from 'react-native-gesture-handler';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class CreateEventEditAttendeesList extends Component {
  static contextType = UserContext;
  state = {
    membersOfBookClub: [],
  };
  

  handleContinueButtonPress = () => {
    const { streetAddress, city, state, zipcode, detailsForLocation, selectedBook } = this.props.route.params;
    this.props.navigation.navigate('CreateEventEditAttendeesList', {
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      detailsForLocation: detailsForLocation,
      selectedBook: selectedBook,
      bookClubMembers: this.state.membersOfBookClub,
    });
  }

  render() {
    const { streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers, selectedBook } = this.props.route.params;
    return (
      <GreyWhiteBackgroundBottomButton
        headline='Edit Attendees'
        continueButtonOnPress={this.handleContinueButtonPress}>

      </GreyWhiteBackgroundBottomButton>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
