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
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default class CreateEventAddAttendees extends Component {
  static contextType = UserContext;
  state = {
    listOfAttendeeOptions: [
      {
        id: '1',
        name: 'create new club',
        createNewClub: true,
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

  handleContinuePress = () => {
    const {selectedBook} = this.props.navigation.state.params;
    // this.props.navigation.navigate('CreateEventAddAttendees', {
    //   selectedBook: selectedBook,
    //   streetAddress: this.state.streetAddress,
    //   city: this.state.city,
    //   state: this.state.state,
    //   zipcode: this.state.zipcode,
    //   detailsForLocation: this.state.detailsForLocation,
    // });
  };

  onListItemPress = item => {
    if (item.createNewClub) {
      console.log('true');
    } else {
      console.log('false');
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.whiteBackgroundContainer}>
            <Text style={styles.headlineTitleText}>Attendees</Text>
            <FlatList
              numColumns={2}
              data={this.state.listOfAttendeeOptions}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableHighlight onPress={() => this.onListItemPress(item)}>
                  <View
                    style={[
                      styles.optionsContainer,
                      item.createNewClub
                        ? styles.backgroundOne
                        : styles.backgroundTwo,
                    ]}>
                    {item.createNewClub && (
                      <>
                        <Icon name="group-add" type="material" color="white" />
                        <Text
                          style={[styles.createNewClubText, { color: 'white' }]}>
                          {item.name}
                        </Text>
                      </>
                    )}
                    {!item.createNewClub && (
                      <Text style={styles.createNewClubText}>{item.name}</Text>
                    )}
                  </View>
                </TouchableHighlight>
              )}
              columnWrapperStyle={styles.flatListColumnWrapper}
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
  },
  headlineTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
    marginBottom: 10,
    marginTop: '5%',
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
    backgroundColor: '#3A5673',
  },
  backgroundTwo: {
    backgroundColor: '#EBE2CD',
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
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
