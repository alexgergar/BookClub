/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  PermissionsAndroid,
  Platform,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Button, Icon, ListItem, Input, Avatar, Badge } from 'react-native-elements';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';
import SeriesOfAvatars from '../components/SeriesOfAvatars';
import SearchBar from '../components/SearchBar';
import AvatarForList from '../components/AvatarForList';
import {SwipeListView} from 'react-native-swipe-list-view';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import Contacts from 'react-native-contacts';


export default class CreateEventAttendees extends Component {
  static contextType = UserContext;
  state = {
    listOfBookClubs: [],
    isSelectedID: null,
    selectedBookClubName: null,
    selectedBookClubMembers: [],
    originalBookClubMembers: [],
    showListOfMembers: false,
    showContinueButton: true,
    contacts: [],
    searchContacts: [],
  };

  componentDidMount() {
    this.getBookClubsFromUID();
  }

  getBookClubsFromUID = () => {
    let user = this.context;
    firestore()
      .collection('bookclubs')
      .where('membersUID', 'array-contains', user.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          let club = {
            bookClubID: doc.id,
            nameOfBookClub: doc.data().nameOfBookClub,
            members: doc.data().members,
            eventHistory: doc.data().eventHistory,
          };
          this.setState(prevState => ({
            listOfBookClubs: [
              ...prevState.listOfBookClubs,
              club,
            ],
          }));
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  renderBookClubs = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => this.onBookClubListItemPress(item)}>
      <View style={styles.bookClubListItems}>
        <Text style={styles.headline3}>
          {item.nameOfBookClub}
        </Text>
        <SeriesOfAvatars
          groupOfUsers={item.members}
          numOfAvatarsToShow={3}
          containerStyle={styles.rowOfAvatarsContainer}
          avatarContainerStyle={styles.avatarContainerStyle}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  renderSpacer = () => <View style={styles.spacer} />;

  onBookClubListItemPress = bookclub => {
    const membersOfBookclub = bookclub.members.map(member => ({
      ...member,
      key: member.uid,
      rowTranslateAnimatedValues: new Animated.Value(0),
      isHighlighted: false,
    }));
    this.setState({
      isSelectedID: bookclub.bookClubID,
      selectedBookClubName: bookclub.nameOfBookClub,
      originalBookClubMembers: membersOfBookclub,
      selectedBookClubMembers: membersOfBookclub,
      showListOfMembers: true,
    });
  };

  onRowDidOpen = (rowKey, rowMap) => {
    this.deleteRow(rowMap, rowKey);
  };

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.selectedBookClubMembers];
    const prevIndex = this.state.selectedBookClubMembers.findIndex(
      item => item.key === rowKey,
    );
    newData.splice(prevIndex, 1);
    this.setState({selectedBookClubMembers: newData});
  }

  renderMember = ({item}) => (
    <ListItem
      Component={TouchableHighlight}
      // onLongPress={() => this.onMemberInListLongPress(data)}
      title={item.displayName}
      leftAvatar={
        <AvatarForList
          avatar={item.avatar}
          avatarsize={24}
          displayName={item.displayName}
        />
      }
      containerStyle={[styles.attendeeListItemContainer]}
    />
  );

  onMemberInListLongPress = member => {
    console.log(member.uid);
    member.isHighlighted = !member.isHighlighted;
    const indexOfSelectedMember = this.state.selectedBookClubMembers.findIndex(
      listItem => member.uid === listItem.uid,
    );
    let updatedMembersData = this.state.selectedBookClubMembers;
    updatedMembersData[indexOfSelectedMember] = member;
    this.setState({
      selectedBookClubMembers: updatedMembersData,
    });
  };

  getPermissionForAndroid = () => {
    if (
      !this.state.askedContactPermission &&
      Platform.OS === 'android'
    ) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
        },
      )
        .then(() => {
          this.setState({askedContactPermission: true});
          this.loadContacts();
        })
        .catch(error =>
          console.log(`there was an error: ${error}`),
        );
    } else {
      this.loadContacts();
    }
  };

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.warn('Permission to access contacts was denied');
      } else {
        this.setState({contacts});
      }
    });
  }

  search(text) {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(
        text,
        (err, searchContacts) => {
          this.setState({searchContacts});
        },
      );
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(
        text,
        (err, searchContacts) => {
          this.setState({searchContacts});
        },
      );
    } else {
      Contacts.getContactsMatchingString(
        text,
        (err, searchContacts) => {
          this.setState({searchContacts});
        },
      );
    }
  }

  handleContinueButtonPress = () => {
    console.log('continue button press');
  };

  render() {
    return (
      <GreyWhiteBackgroundBottomButton
        headline="Add Attendees"
        continueButtonOnPress={this.handleContinueButtonPress}
        scrollView={false}
        showButton={this.state.showContinueButton}>
        <SearchBar
          placeholder="Add a Person From Your Contacts"
          onChangeText={text => this.search(text)}
          onFocus={this.getPermissionForAndroid}
        />
        {this.state.listOfBookClubs.length > 0 &&
          !this.state.showListOfMembers && (
            <>
              <View style={styles.fromBookClubContainer}>
                <Text style={styles.headline2}>
                  Add from Your BookClubs
                </Text>
              </View>
              <FlatList
                data={this.state.listOfBookClubs}
                keyExtractor={item => item.bookClubID.toString()}
                renderItem={this.renderBookClubs}
                ItemSeparatorComponent={this.renderSpacer}
              />
            </>
          )}
        {this.state.showListOfMembers && (
          <SwipeListView
            disableRightSwipe={true}
            data={this.state.selectedBookClubMembers}
            renderItem={this.renderMember}
            renderHiddenItem={(data, rowMap) => (
              <TouchableOpacity
                style={styles.deleteRowView}
                onPress={() =>
                  this.deleteRow(rowMap, data.item.key)
                }>
                <Icon
                  type="feather"
                  name="trash"
                  size={18}
                  color="white"
                />
              </TouchableOpacity>
            )}
            rightOpenValue={-windowWidth * 0.8}
            onRowDidOpen={this.onRowDidOpen}
            friction={15}
          />
        )}
      </GreyWhiteBackgroundBottomButton>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  fromBookClubContainer: {
    paddingVertical: '2%',
  },
  headline2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  bookClubListItems: {
    height: windowHeight * 0.1,
    width: '100%',
    backgroundColor: '#EBE2CD',
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  headline3: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  rowOfAvatarsContainer: {
    justifyContent: 'flex-end',
    paddingBottom: windowHeight * 0.015,
  },
  avatarContainerStyle: {
    marginRight: 4,
  },
  avatarContainer: {
    backgroundColor: '#A5ADB5',
  },
  spacer: {
    paddingVertical: 5,
  },
  memberListItemRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '6%',
    paddingTop: '.5%',
    paddingHorizontal: '2%',
    borderRadius: 15,
    // backgroundColor: 'pink',
  },
  listItemTextView: {
    paddingLeft: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: 'red',
  },
  selected: {
    // backgroundColor: '#e4e6e8',
    borderRadius: 15,
    // borderColor: '#C24737',
    // borderWidth: 1,
  },
  removeButtonStyle: {
    width: '60%',
    // backgroundColor: 'blue',
  },
  attendeeListItemContainer: {
    padding: 10,
    paddingLeft: '3%',
    borderRadius: 15,
    margin: 1.5,
  },
  outterDeleteRowView: {
    margin: 1.5,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#C24737',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteRowView: {
    paddingRight: '2%',
    margin: 1.5,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#C24737',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
