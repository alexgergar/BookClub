import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserContext from '../context/UserContext';

export default class CreateEventAddDetails extends Component {
  state = {
    streetAddress: null,
    city: null,
    state: null,
    zipcode: null,
    detailsForLocation: null,
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide = () => {
    this.setState({
      showBottomBar: true,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.whiteBackgroundBox}>
          <Text style={styles.headlineTitleText}>Event Details</Text>
          <View style={styles.addressView}>
            <Text style={styles.addressTitleText}>Address:</Text>
            {/* <KeyboardAwareScrollView> */}
            <View>
              <Input
                placeholder="Street Address"
                onChangeText={streetAddress => this.setState({streetAddress})}
                value={this.state.streetAddress}
                multiline={true}
                dataDetectorTypes="address"
              />
              <Input
                placeholder="City"
                onChangeText={city => this.setState({city})}
                value={this.state.city}
              />
              <Input
                placeholder="State"
                onChangeText={state => this.setState({state})}
                value={this.state.state}
              />
              <Input
                placeholder="Zipcode"
                onChangeText={zipcode => this.setState({zipcode})}
                value={this.state.zipcode}
              />
              <Input
                placeholder="Details for Location"
                onChangeText={detailsForLocation =>
                  this.setState({detailsForLocation})
                }
                value={this.state.detailsForLocation}
                multiline={true}
              />
            </View>
            {/* </KeyboardAwareScrollView> */}
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
  },
  whiteBackgroundBox: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '90%',
    flexGrow: 1,
    top: windowHeight * 0.05,
    padding: windowWidth * 0.05,
  },
  headlineTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
