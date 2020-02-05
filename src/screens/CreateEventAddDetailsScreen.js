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
import UserContext from '../context/UserContext';

export default class CreateEventAddDetails extends Component {
  state = {
    streetAddress: null,
    city: null,
    state: null,
    zipcode: null,
    detailsForLocation: null,
    hideContinueButton: false,
    showTitle: true,
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
      showTitle: true,
    });
  };

  toggleShowTitle = () => {
    this.setState(prevState => ({showTitle: !prevState.showTitle}));
  }

  handleContinuePress = () => {
    const {selectedBook} = this.props.navigation.state.params;
    this.props.navigation.navigate('CreateEventAddAttendees', {
      selectedBook: selectedBook,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      detailsForLocation: this.state.detailsForLocation,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.whiteBackgroundBox}>
          <View>
            {this.state.showTitle && (
              <Text style={styles.headlineTitleText}>Event Details</Text>
            )}
            <View style={styles.addressView}>
              <Text style={styles.addressTitleText}>Address:</Text>
              <Input
                placeholder="Street Address"
                onChangeText={streetAddress => this.setState({streetAddress})}
                value={this.state.streetAddress}
                inputStyle={styles.inputTextStyle}
                containerStyle={styles.singleLineContainerStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
              <Input
                placeholder="City"
                onChangeText={city => this.setState({city})}
                value={this.state.city}
                inputStyle={styles.inputTextStyle}
                containerStyle={styles.singleLineContainerStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
              <View style={{flexDirection: 'row'}}>
                <Input
                  placeholder="State"
                  onChangeText={state => this.setState({state})}
                  value={this.state.state}
                  inputStyle={styles.inputTextStyle}
                  containerStyle={styles.twoLineContainerStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                />
                <Input
                  placeholder="Zip Code"
                  onChangeText={zipcode => this.setState({zipcode})}
                  value={this.state.zipcode}
                  inputStyle={styles.inputTextStyle}
                  containerStyle={styles.twoLineContainerStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>
              <Input
                placeholder="Details for Location"
                onChangeText={detailsForLocation =>
                  this.setState({detailsForLocation})
                }
                value={this.state.detailsForLocation}
                multiline={true}
                inputStyle={styles.inputTextStyle}
                containerStyle={styles.multiLineContainerStyle}
                inputContainerStyle={[
                  styles.inputContainerStyle,
                  styles.multiLineInputContainerStyle,
                ]}
                maxLength={400}
                onFocus={this.toggleShowTitle}
                onBlur={this.toggleShowTitle}
              />
            </View>
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
  },
  whiteBackgroundBox: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '90%',
    padding: windowWidth * 0.05,
    justifyContent: 'space-between',
    height: windowHeight * .95,
  },
  headlineTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
  },
  addressView: {
    paddingTop: windowHeight * 0.02,
  },
  addressTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DBDBDB',
    paddingHorizontal: windowWidth * 0.02,
  },
  inputTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#14212B',
    alignSelf: 'flex-start',
  },
  singleLineContainerStyle: {
    height: windowHeight * 0.1,
    paddingVertical: windowHeight * 0.01,
  },
  twoLineContainerStyle: {
    width: '50%',
    paddingVertical: windowHeight * 0.01,
  },
  multiLineContainerStyle: {
    paddingTop: windowHeight * 0.01,
  },
  multiLineInputContainerStyle: {
    height: windowHeight * 0.1,
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
