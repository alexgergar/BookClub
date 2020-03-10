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
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {Icon, ListItem } from 'react-native-elements';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';
import SeriesOfAvatars from '../components/SeriesOfAvatars';
import SearchBar from '../components/SearchBar';
import AvatarForList from '../components/AvatarForList';
import {SwipeListView} from 'react-native-swipe-list-view';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import Contacts from 'react-native-contacts';


export default class CreateEventAttendees extends Component {
  state = {
    listOfBookClubs: [],
    selectedBookClubID: null,
    selectedBookClubName: null,
    selectedBookClubMembers: [],
    originalBookClubMembers: [],
    showListOfMembers: false,
    showContinueButton: true,
    contacts: [],
    searchContacts: [],
    searchItemPressed: false,
    searchItemPressedID: null,
    showSearchList: false,
    disableButton: true,
  };

  componentDidMount() {
    this.getBookClubsFromUID();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedBookClubMembers !== prevState.selectedBookClubMembers
    ) {
      this.validateDetails();
    }
  }

  validateDetails = () => {
    this.state.selectedBookClubMembers.length >= 2 ?
    this.setState({ disableButton: false })
    :
    this.setState({ disableButton: true }, );
  };

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
    }));
    this.setState({
      selectedBookClubID: bookclub.bookClubID,
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

  getPermissionForAndroid = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
        },
      )
      .then(() => {
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

   onSearchListItemPress = item => {
    this.clearSearchText();
    let person = {
      displayName: item.displayName,
      email: item.emailAddresses[0].email,
      phone: item.phoneNumbers[0].number,
      uid: '',
      key: item.recordID,
    };
    this.setState(prevState => ({
      showSearchList: false,
      searchContacts: [],
      selectedBookClubMembers: [person, ...prevState.selectedBookClubMembers],
      searchItemPressed: false,
      searchItemPressedID: null,
      showContinueButton: true,
    }));

  }

  onSearchListItemPressIn = item => {
    this.setState({searchItemPressed: true, searchItemPressedID: item.recordID});
  }

  renderContactSearchList = ({item}) => (
    <TouchableWithoutFeedback
      onPressIn={() => this.onSearchListItemPressIn(item)}
      onPress={() => this.onSearchListItemPress(item)}
      >
      <View style={[styles.searchListRowView]}>
        <View style={styles.listItemContactSearchView}>
          <Text style={styles.listItemFont}>{item.displayName}</Text>
          <Text style={styles.listItemSubtitleFont}>{item.emailAddresses[0].email}</Text>
        </View>
        <Icon type='feather' name='plus' color={this.state.searchItemPressedID === item.recordID ? '#F8B787' : 'black'}/>
      </View>
    </TouchableWithoutFeedback>
  );

  onSearchBarPressIn = () => {
    this.getPermissionForAndroid;
    this.setState({showSearchList: true, showContinueButton: false});
  }

  clearSearchText = () => {
    this.refs.searchBarRef.clear();
  }

  hideSearchList = () => {
    this.setState({showSearchList: false});
  }

  handleContinueButtonPress = () => {
    const {
      selectedBook,
      streetAddress,
      city,
      state,
      zipcode,
      detailsForLocation,
      date,
    } = this.props.route.params;
    if (
      this.state.originalBookClubMembers.length ===
        this.state.selectedBookClubMembers.length &&
      this.state.originalBookClubMembers.every(
        (value, index) => value === this.state.selectedBookClubMembers[index],
      )
    ) {
      this.props.navigation.navigate('CreateEventVerifyInfo', {
        selectedBook: selectedBook,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        detailsForLocation: detailsForLocation,
        bookClubMembers: this.state.selectedBookClubMembers,
        bookClubName: this.state.selectedBookClubName,
        bookClubID: this.state.selectedBookClubID,
        newClub: false,
        date: date,
      });
    } else {
      this.props.navigation.navigate('CreateEventNewClubName', {
        selectedBook: selectedBook,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        detailsForLocation: detailsForLocation,
        bookClubMembers: this.state.selectedBookClubMembers,
        date: date,
      });
    }
  }

  render() {
    let user = this.context;
    let workingAttendeeInviteList = this.state.selectedBookClubMembers;
    if (workingAttendeeInviteList.find(({uid}) => uid === user.uid) === undefined) {
      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        phone: user.phone,
      }
      workingAttendeeInviteList = [userInfo, ...workingAttendeeInviteList];
    }
    const displayOfList = this.state.showSearchList ? (
      <FlatList
        data={this.state.searchContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderContactSearchList}
      />
    ) : (
      <SwipeListView
        disableRightSwipe={true}
        data={workingAttendeeInviteList}
        renderItem={this.renderMember}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            style={styles.deleteRowView}
            onPress={() => this.deleteRow(rowMap, data.item.key)}>
            <Icon type="feather" name="trash" size={18} color="white" />
          </TouchableOpacity>
        )}
        rightOpenValue={-windowWidth * 0.8}
        onRowDidOpen={this.onRowDidOpen}
        friction={10}
      />
    )
    return (
      <GreyWhiteBackgroundBottomButton
        headline="Add Attendees"
        continueButtonOnPress={this.handleContinueButtonPress}
        scrollView={false}
        disableButton={this.state.disableButton}
        buttonTitle={this.state.disableButton ? 'Add At Least One Person' : 'Continue'}
        showButton={this.state.showContinueButton}>
        <SearchBar
          placeholder="Add a Person From Your Contacts"
          onChangeText={text => this.search(text)}
          onFocus={this.onSearchBarPressIn}
          onClear={this.hideSearchList}
          ref="searchBarRef"
        />
        {this.state.listOfBookClubs.length > 0 &&
          !this.state.showListOfMembers && (
            <>
              <View style={styles.fromBookClubContainer}>
                <Text style={styles.headline2}>Add from Your BookClubs</Text>
              </View>
              <FlatList
                data={this.state.listOfBookClubs}
                keyExtractor={item => item.bookClubID.toString()}
                renderItem={this.renderBookClubs}
                ItemSeparatorComponent={this.renderSpacer}
              />
            </>
          )}
        {this.state.showListOfMembers && displayOfList}
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
  headline1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
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
  modalContainer: {
    backgroundColor: 'white',
    padding: '10%',
    justifyContent: 'space-between',
  },
  topNewClubContainer: {
    height: '60%',
    justifyContent: 'space-between',
  },
  newClubContinueButton: {
    alignSelf: 'flex-end',
  },
  newClubContinueButtonContainerStyle: {
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
  },
  newClubContinueButtonStyle: {
    borderRadius: 10,
    backgroundColor: '#1E3342',
  },
  newClubContinueTitleButtonStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
  searchListRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  listItemFont: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});

CreateEventAttendees.contextType = UserContext;
/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
