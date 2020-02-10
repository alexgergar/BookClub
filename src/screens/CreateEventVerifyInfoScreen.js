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
import GreyWhiteBackgroundContinueButton from '../components/GreyWhiteBackgroundContinueButton';
import EditInfoBlock from '../components/EditInfoBlock';
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
    console.log('continue button pressed on verfiy info screen')
  }


  render() {
    let user = this.context;
    const { selectedBook, streetAddress, city, state, zipcode, detailsForLocation, bookClubMembers } = this.props.navigation.state.params;
    return (
      <GreyWhiteBackgroundContinueButton
        headline='Verify Informtion'
        subHeadline='Make sure everything looks good'
        continueButtonOnPress={this.handleContinueButtonPress}>
        <ScrollView>
          <View>
            <Text style={styles.headline3}>Host: {user.displayName}</Text>
          </View>
          <EditInfoBlock headline='Location'>
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
          <EditInfoBlock headline='Book Details'>
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
          <EditInfoBlock headline='Invited Members'>
        
          </EditInfoBlock>
        </ScrollView>
        
      </GreyWhiteBackgroundContinueButton>
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
    paddingHorizontal: '10%',
  },
  bookImageView: {
    borderRadius: 5,
    width: bookcoverWidth,
    height: bookcoverHeight,
  },
  bookDetails: {
    paddingLeft: '5%',
    justifyContent: 'center',
  }
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
