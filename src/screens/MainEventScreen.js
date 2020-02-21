import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { bookClubEvent } from '../utils/testInfo';
import EventDetails from '../components/EventDetails';
import BookDetails from '../components/BookDetails';
import { Button } from 'react-native-elements';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';

export default class MainEvent extends Component {
  static contextType = UserContext;
  state = {
    showEventDetail: true,
    bookData: null,
    eventID: null,
    showEvent: false,
    event: null,
  };

  componentDidMount() {
    // const {eventID, event} = this.props.navigation.state.params;
    const user = this.context;
    this.getEventInfoFromFirestore('mwbdp7UdGFvp4z7ntpcN');
  }

  getEventInfoFromFirestore = async eventID => {
    await firestore()
      .collection('events')
      .doc(eventID)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('no such document');
        } else {
          this.setState({
            event: doc.data(),
            showEvent: true,
          });
        }
      })
      .catch(error => {
        console.log('Error getting document');
      });
  };

  onEventDetailPress = () => {
    this.setState({
      showEventDetail: true,
    });
  };

  onBookDetailPress = () => {
    this.setState({
      showEventDetail: false,
    });
  };

  render() {
    const { event, showEvent } = this.state;
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
          {event === null ? (
            <Image
              style={styles.bookImageView}
              source={require('../utils/bookPlaceholder.png')}
              resizeMode={'cover'}
            />
          ) : (
              <Image
                style={styles.bookImageView}
                source={{
                  uri: event.bookForEvent.thumbnail || event.bookForEvent.smallThumbnail,
                }}
                resizeMode={'cover'}
              />
            )}
          {event !== null && (
            <View style={styles.backgroundContentContainer}>
              <View style={styles.informationContentContainer}>
                <View style={styles.textRowCenterAlign}>
                  <Text style={styles.dateText}>{event.eventDate.date}</Text>
                  <Text style={styles.spacerText}> at </Text>
                  <Text style={styles.dateText}>{event.eventDate.time}</Text>
                </View>

                {/* in the future maybe change this to a card component or a box that the user can click on to get more info on person, contact info, map, ect. see notes from 1.21.20 */}
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}>
                    {event.host.displayName}
                  </Text>
                  <Text style={styles.addressText}>
                    {event.eventLocation.address.streetAddress}
                  </Text>
                  <View style={styles.textRowCenterAlign}>
                    <Text style={styles.cityStateZipText}>
                      {event.eventLocation.address.city}{' '}
                      {event.eventLocation.address.state},{' '}
                      {event.eventLocation.address.zipcode}
                    </Text>
                  </View>
                </View>
                {/* end of card data... */}
                <View style={styles.hortizontalLine} />
                <View style={styles.clickableDetailTabRow}>
                  {/* make these buttons into a unique component using theming for active/non active passing props */}
                  <Button
                    title="Event Details"
                    type="clear"
                    titleStyle={styles.detailButtonsTitleStyle}
                    containerStyle={styles.detailButtonsContainerStyle}
                    onPress={this.onEventDetailPress}
                  />
                  <Button
                    title="Book Details"
                    type="clear"
                    titleStyle={styles.detailButtonsTitleStyle}
                    containerStyle={styles.detailButtonsContainerStyle}
                    bookdata={this.state.bookdata}
                    onPress={this.onBookDetailPress}
                  />
                </View>
                {this.state.showEventDetail ? (
                  <EventDetails event={event} />
                ) : (
                    <BookDetails event={event} />
                  )}
              </View>
            </View>
          )}
        </ScrollView>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookPlaceholderImageWidth = windowWidth * 0.3;
const bookPlaceholderImageHeight = bookPlaceholderImageWidth * 1.6;
const starterHeightPositionForInformationTextUnderBookImage =
  bookPlaceholderImageHeight + 40 - windowHeight * 0.2;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
  },
  backgroundContentContainer: {
    backgroundColor: 'white',
    marginTop: windowHeight * 0.2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    bottom: 0,
    width: '90%',
    paddingBottom: 100,
    flexGrow: 1,
  },
  informationContentContainer: {
    flexGrow: 1,
    padding: 10,
    position: 'relative',
    top: starterHeightPositionForInformationTextUnderBookImage,
  },
  bookImageView: {
    zIndex: 10,
    width: bookPlaceholderImageWidth,
    height: bookPlaceholderImageHeight,
    borderRadius: 10,
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
  },
  textRowCenterAlign: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spacerText: {
    textTransform: 'uppercase',
    color: '#737373',
    marginRight: '1%',
    marginLeft: '1%',
  },
  addressText: {
    fontSize: 20,
    textAlign: 'center',
  },
  cityStateZipText: {
    textTransform: 'uppercase',
    fontSize: 12,
  },
  hortizontalLine: {
    padding: 15,
    marginLeft: '20%',
    marginRight: '20%',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
  },
  clickableDetailTabRow: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  detailButtonsTitleStyle: {
    color: '#3A5673',
  },
  detailButtonsContainerStyle: {
    borderBottomWidth: 3,
    borderColor: '#F8B787',
    borderRadius: 100,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
/* Color Theme Swatches in RGBA
.Book-cover-options-1-rgba { color: rgba(58, 86, 114, 1); }
.Book-cover-options-2-rgba { color: rgba(235, 226, 205, 1); }
.Book-cover-options-3-rgba { color: rgba(29, 51, 66, 1); }
.Book-cover-options-4-rgba { color: rgba(165, 172, 181, 1); }
.Book-cover-options-5-rgba { color: rgba(247, 182, 135, 1); }
/* Color Theme Swatches in HSLA *
.Book-cover-options-1-hsla { color: hsla(210, 32, 33, 1); }
.Book-cover-options-2-hsla { color: hsla(42, 42, 86, 1); }
.Book-cover-options-3-hsla { color: hsla(205, 37, 18, 1); }
.Book-cover-options-4-hsla { color: hsla(210, 9, 67, 1); }
.Book-cover-options-5-hsla { color: hsla(25, 88, 75, 1); }
*/