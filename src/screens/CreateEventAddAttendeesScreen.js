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
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Icon, ListItem, Input, Avatar, } from 'react-native-elements';
import UserContext from '../context/UserContext';
import FlatListGroupOptions from '../components/FlatListGroupOptions';
import firestore from '@react-native-firebase/firestore';

export default class CreateEventAddAttendees extends Component {
  static contextType = UserContext;
  state = {
    isSelectedID: null,
    onFirstSection: true,
    listOfAttendeeOptions: [
      {
        id: '1',
        name: 'Create New Club',
        createNewClub: true,
      },
    ],
    bookClubMembersList: [
      {
        displayName: 'Tester tester',
        uid: '90shjsdj02n9dsj',
      },
      {
        displayName: 'Anner tester',
        uid: 'hw5jstbh9dsj',
      },
      {
        displayName: 'Tim tester',
        uid: 'ojqer9gijvaj',
      },
      {
        displayName: 'tester tester',
        uid: '90oijf0asgeh9dsj',
      },
      {
        displayName: 'step tester',
        uid: '90svarbwrvdsj',
      },
      {
        displayName: 'greg tester',
        uid: '90osdfavdj02n9dsj',
      },
      {
        displayName: 'priya tester',
        uid: 'asadsvwe2n9dsj',
      },
      {
        displayName: 'ray tester',
        uid: '9sbawgj02n9dsj',
      },
    ],
  };

  componentDidMount() {
    let user = this.context;
    this.getAllUserInfo();
  }

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
        }));
      })})
      .catch(err => {
        console.log(`Error getting document: ${err}`);
      });
  };

  handleContinuePress = item => {
    const {selectedBook, streetAddress, city, state, zipcode, detailsForLocation} = this.props.navigation.state.params;
    this.setState({onFirstSection: false});
    if (this.state.isSelectedID === '1') {
      console.log('create a new club');
    } else {
      console.log('start from a group');
      this.getBookClubInfo();
    };
    // this.props.navigation.navigate('CreateEventAddAttendees', {
    //   selectedBook: selectedBook,
    //   streetAddress: this.state.streetAddress,
    //   city: this.state.city,
    //   state: this.state.state,
    //   zipcode: this.state.zipcode,
    //   detailsForLocation: this.state.detailsForLocation,
    // });
  };

  handleGetInitials = fullName => {
    return fullName
      .toUpperCase()
      .split(' ')
      .map(name => name[0])
      .join('')
  };

  onListItemPress = item => {
    this.setState({isSelectedID: item.id})
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "84%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

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
      <Text style={styles.bookClubMembersNamesInRow}>{item.displayName}</Text>
    </View>
  )

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.whiteBackgroundContainer}>
            <Text style={styles.headlineTitleText}>Attendees</Text>
            {this.state.onFirstSection ? ( 
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
                  onPress={this.handleContinuePress}
                />
              </View>}
            </>
            ) : (
              <>
                  <View>
                    <Input
                      placeholder='Add a Person to Your BookClub'
                      leftIcon={{ type: 'material', name: 'search' }}
                      leftIconContainerStyle={{ paddingRight: 5, paddingLeft: 0 }}
                      inputStyle={styles.inputTextStyle}
                      containerStyle={styles.singleLineContainerStyle}
                      inputContainerStyle={styles.inputContainerStyle}
                    />
                  </View>
                  
                  <FlatList
                    data={this.state.bookClubMembersList}
                    keyExtractor={item => item.uid.toString()}
                    renderItem={this.renderBookClubMembers}
                    ItemSeparatorComponent={this.renderSeparator}
                  />
                  <View style={styles.bottomButtonView}>
                    <Button
                      title="Continue"
                      containerStyle={styles.continueButtonContainerStyle}
                      buttonStyle={styles.continueButtonStyle}
                      titleStyle={styles.continueTitleButtonStyle}
                      onPress={this.handleContinuePress}
                    />
                  </View>
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
  inputTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#14212B',
  },
  singleLineContainerStyle: {
    height: windowHeight * 0.1,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DBDBDB',
  },
  memberListItemRowView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 10,
  },
  bookClubMembersNamesInRow: {
    paddingVertical: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    paddingLeft: 20,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
