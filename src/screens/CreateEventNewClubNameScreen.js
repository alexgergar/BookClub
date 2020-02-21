/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
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
import {
  Button,
  Icon,
  ListItem,
  Input,
  Avatar,
  Badge,
} from 'react-native-elements';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class CreateEventNewClubName extends Component {
  state = {
    bookClubName: '',
  };

  handleContinueButtonPress = () => {
    const {
      selectedBook,
      streetAddress,
      city,
      state,
      zipcode,
      detailsForLocation,
      bookClubMembers,
    } = this.props.navigation.state.params;
    this.props.navigation.navigate('CreateEventVerifyInfo', {
      selectedBook: selectedBook,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      detailsForLocation: detailsForLocation,
      bookClubMembers: bookClubMembers,
      bookClubName: this.state.bookClubName,
      newClub: true,
    });
  }


  render() {
    return (
      <GreyWhiteBackgroundBottomButton
        continueButtonOnPress={this.handleContinueButtonPress}
        scrollView={false}
        showButton={this.state.showContinueButton}>
        <Text style={[styles.headline1, {textAlign: 'center'}]}>
          Looks like you have created a new or different group.
        </Text>
        <View style={{paddingTop: '15%'}}>
          <Text style={[styles.headline2, {textAlign: 'center'}]}>
            Give it a name
          </Text>
        </View>
        <View style={{paddingTop: '30%'}}>
          <Input
            inputStyle={[styles.headline2, {textAlign: 'center'}]}
            placeholder="Name for New Club"
            onChangeText={bookClubName => this.setState({bookClubName})}
            value={this.state.bookClubName}
          />
        </View>
      </GreyWhiteBackgroundBottomButton>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headline1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  headline2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
