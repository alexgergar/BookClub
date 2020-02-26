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
import { Button, Icon, ListItem, Input, Avatar, Badge} from 'react-native-elements';
import UserContext from '../context/UserContext';
import SearchBar from '../components/SearchBar';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';
import FlatListGroupOptions from '../components/FlatListGroupOptions';
import firestore from '@react-native-firebase/firestore';
import Contacts from 'react-native-contacts';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class CreateEventAddAttendees extends Component {
  static contextType = UserContext;
  state = {
    isSelectedID: null,
    onFirstSection: true,
    contacts: [],
    askedContactPermission: false,
    searchContacts: [],
    showContinueButton: true,
    keyboardHeightView: windowHeight,
    selectedBookClubName: null,
    showAddNewContactInput: false,
    searchItemPressed: false,
    searchItemPressedID: null,
    listOfAttendeeOptions: [
      {
        id: '1',
        name: 'Create New Club',
        createNewClub: true,
      },
    ],
    bookClubMembersList: [],
    originalBookClubMembersList: [],
  };

  componentDidMount() {
    let user = this.context;
    this.getAllUserInfo();
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = event => {
    this.setState({
      showContinueButton: false,
      keyboardHeightView: windowHeight - event.endCoordinates.height
    });
  }

  _keyboardDidHide = () => {
    this.setState({
      showContinueButton: true,
    });
  };

  getAllUserInfo = async () => {
    let user = this.context;
    const userInfo = firestore()
      .collection('users')
      .doc(user.uid);
    await userInfo
      .get()
      .then(doc => {
        doc.data().bookClubs.forEach(bookclub => {
          const club = {
            id: bookclub.id,
            name: bookclub.name,
          };
          this.setState(prevState => ({
            listOfAttendeeOptions: [...prevState.listOfAttendeeOptions, club],
          }));
        });
      })
      .catch(err => {
        console.log(`Error getting document: ${err}`);
      });
  };

  getBookClubInfo = async () => {
    let user = this.context;
    const bookClubInfo = firestore()
      .collection('bookclubs')
      .doc(this.state.isSelectedID);
    await bookClubInfo
      .get()
      .then(doc => { doc.data().members.forEach(member => {
        const person = {
          displayName: member.displayName,
          uid: member.uid,
        };
        this.setState(prevState => ({
          bookClubMembersList: [...prevState.bookClubMembersList, person],
          originalBookClubMembersList: [...prevState.originalBookClubMembersList, person]
        }));
      })})
      .catch(err => {
        console.log(`Error getting document: ${err}`);
      });
  };

  handleFirstSectionContinuePress = item => {
    this.setState({onFirstSection: false});
    if (this.state.isSelectedID === '1') {
      this.setState({ bookClubMembersList: [] });
    }
    if (this.state.isSelectedID !== '1') {
      this.getBookClubInfo();
    }
  };

  handleSecondSectionContinuePress = () => {
    const { selectedBook, streetAddress, city, state, zipcode, detailsForLocation } = this.props.route.params;
    if (this.state.originalBookClubMembersList.length === this.state.bookClubMembersList.length && this.state.originalBookClubMembersList.every((value, index) => value === this.state.bookClubMembersList[index])) {
      console.log('this is the same list');
      this.props.navigation.navigate('CreateEventVerifyInfo', {
        selectedBook: selectedBook,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        detailsForLocation: detailsForLocation,
        bookClubMembers: this.state.bookClubMembersList,
      });
    } else {
      console.log('not the same')
    }
  }

  handleGetInitials = fullName => {
    return fullName
      .toUpperCase()
      .split(' ')
      .map(name => name[0])
      .join('')
  };

  onListItemPress = item => {
    this.setState({
      isSelectedID: item.id,
      selectedBookClubName: item.name
    })
  };

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "84%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }}
    />
  )

  renderBookClubMembers = ({item}) => (
    <View style={styles.memberListItemRowView}>
      {item.avatar ? (
        <Avatar
          rounded
          source={{uri: item.avatar,}}
        />
      ) : (
        <Avatar
          rounded
          title={this.handleGetInitials(item.displayName)}
        />
      )}
      <Text style={[styles.bookClubMembersNamesInRow, styles.listItemFont]}>{item.displayName}</Text>
    </View>
  );

  renderBookClubMembersHortizontal = ({item}) => (
    <View style={{marginLeft: 10}}>
      <Badge 
        value={<Text style={[styles.listItemFont]}>{item.displayName}</Text>}
        badgeStyle={styles.badgeStyleBookClubListItemHortizontal} />
    </View>
  );

  onSearchListItemPress = item => {
    let person = {
      displayName: item.displayName,
      email: item.email,
      phone: item.phone,
      uid: '',
    };
    this.setState(prevState => ({
      bookClubMembersList: [person, ...prevState.bookClubMembersList],
      searchContacts: [],
    }));
  }

  onSearchListItemPressIn = item => {
    this.setState({searchItemPressed: true, searchItemPressedID: item.recordID});
  }

  onSearchListItemPressOut = item => {
    this.setState({searchItemPressed: false, searchItemPressedID: null});
  }

  renderContactSearchList = ({item}) => (
    <TouchableHighlight 
      onPressIn={() => this.onSearchListItemPressIn(item)}
      onPressOut={() => this.onSearchListItemPressOut(item)}
      onPress={() => this.onSearchListItemPress(item)}
      underlayColor='0'
      >
      <View style={[styles.searchListRowView]}>
        <View style={styles.listItemContactSearchView}>
          <Text style={styles.listItemFont}>{item.displayName}</Text>
          <Text style={styles.listItemSubtitleFont}>{item.emailAddresses[0].email}</Text>
        </View>
        <Icon type='feather' name='plus' color={this.state.searchItemPressedID === item.recordID ? '#F8B787' : 'black'}/>
      </View>
    </TouchableHighlight>
  );

  getPermissionForAndroid = () => {
    if (!this.state.askedContactPermission && Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.setState({ askedContactPermission: true });
        this.loadContacts();
      }).catch(error => console.log(`there was an error: ${error}`));
    } else {
      this.loadContacts();
    }
  }

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        console.warn("Permission to access contacts was denied");
      } else {
        this.setState({ contacts });
      }
    });
  }

  search(text) {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, searchContacts) => {
        this.setState({ searchContacts });
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text, (err, searchContacts) => {
        this.setState({ searchContacts });
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, searchContacts) => {
        this.setState({ searchContacts });
      });
    }
  }

  

  render() {
    const { onUpdate } = this.props.route.params;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.whiteBackgroundContainer}>
            <Text style={styles.headlineTitleText}>Attendees</Text>
            {this.state.onFirstSection && !onUpdate ? ( 
              <>
            <Text style={styles.subHeadLineText}>Select a starting point for your event.</Text>
            <FlatListGroupOptions 
              listOfAttendeeOptions={this.state.listOfAttendeeOptions}
              isSelectedID={this.state.isSelectedID}
              onListItemPress={this.onListItemPress} />
              {this.state.isSelectedID && <View style={styles.bottomButtonView}>
                <Button
                  title={this.state.isSelectedID === '1' ? 'Create New Club' : 'See Club Members'}
                  containerStyle={styles.continueButtonContainerStyle}
                  buttonStyle={styles.continueButtonStyle}
                  titleStyle={styles.continueTitleButtonStyle}
                  onPress={this.handleFirstSectionContinuePress}
                />
              </View>}
            </>
            ) : (
              <>
              <View>
                <SearchBar
                  placeholder='Add a Person From Your Contacts'
                  onChangeText={text => this.search(text)}
                  onFocus={this.getPermissionForAndroid}

                />
              </View>
              {this.state.showContinueButton ? 
              <>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.selectedBookClubTitle}>{this.state.selectedBookClubName}</Text>
              </View>
              <FlatList
                data={this.state.bookClubMembersList}
                keyExtractor={item => item.uid.toString()}
                renderItem={this.renderBookClubMembers}
                ItemSeparatorComponent={this.renderSeparator}
              />
              </>
              : (
                <>
                  <View style={{flex: 3, marginBottom: 5 }}>
                    <FlatList
                      data={this.state.searchContacts}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderContactSearchList}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <FlatList
                      horizontal={true}
                      data={this.state.bookClubMembersList}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderBookClubMembersHortizontal}
                    />
                  </View>
                </>
                )}

              {this.state.showContinueButton && 
                <View style={styles.bottomButtonView}>
                  <Button
                    title="Continue"
                    containerStyle={styles.continueButtonContainerStyle}
                    buttonStyle={styles.continueButtonStyle}
                    titleStyle={styles.continueTitleButtonStyle}
                    onPress={this.handleSecondSectionContinuePress}
                  />
                </View>}
          </>
        )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  whiteBackgroundContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '95%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: '5%',
    // justifyContent: 'space-between',
  },
  headlineTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
    marginBottom: 10,
    marginTop: '5%',
  },
  subHeadLineText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
  },
  backgroundOne: {
    backgroundColor: '#A5ADB5',
  },
  backgroundTwo: {
    backgroundColor: '#EBE2CD',
  },
  selectedView: {
    borderWidth: 2,
  },
  createNewClubText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  flatListColumnWrapper: {
    justifyContent: 'space-around',
  },
  bottomButtonView: {
    marginVertical: '3%',
  },
  continueButtonContainerStyle: {
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
  },
  continueButtonStyle: {
    backgroundColor: '#1E3342',
    borderRadius: 5,
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
  memberListItemRowView: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 10,
  },
  listItemFont: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  bookClubMembersNamesInRow: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  badgeStyleBookClubListItemHortizontal: {
    padding: 20,
    backgroundColor: '#EBE2CD',
  },
  listItemContactSearchView: {
    padding: 10,
    paddingHorizontal: 20,
  },
  listItemSubtitleFont: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: '#A3A3A3',
  },
  selectedBookClubTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  searchListRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
