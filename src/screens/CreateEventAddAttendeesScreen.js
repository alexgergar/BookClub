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
import {Button, Input} from 'react-native-elements';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';

export default class CreateEventAddAttendees extends Component {
  static contextType = UserContext;
  state = {
  };

  componentDidMount() {
    let user = this.context;
    console.log(user.uid);
  }

  getAllUserInfo = async () => {
    let user = this.context;
    // const documentSnapshot = await firestore()
    //   .collection('users')
    //   .doc('user.uid')
    //   .get();

    // console.log('User data', documentSnapshot.data());
    // const userInfo = firestore()
    //   .collection('users')
    //   .doc(user.uid)
    // await userInfo.get()
    //   .then(doc => console.log(doc))
    //   .catch(err => {
    //     console.log(`Error getting document: ${err}`);
    //   });
  } 


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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.whiteBackgroundBox}>
          <View>
            <Text style={styles.headlineTitleText}>Attendees</Text>
            <FlatList 

            />
          </View>
          <View>
            <Button
              title="Continue"
              containerStyle={styles.continueButtonContainerStyle}
              buttonStyle={styles.continueButtonStyle}
              titleStyle={styles.continueTitleButtonStyle}
              onPress={this.handleContinuePress}
            />
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  whiteBackgroundBox: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '90%',
    padding: windowWidth * 0.05,
    justifyContent: 'space-between',
    height: windowHeight * 0.95,
  },
  headlineTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
  },
  continueButtonStyle: {
    backgroundColor: '#1E3342',
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  continueButtonContainerStyle: {
    width: '82%',
    alignSelf: 'center',
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
