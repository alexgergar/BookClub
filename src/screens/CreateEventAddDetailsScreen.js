import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class CreateEventAddDetails extends Component {
  state = {
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    detailsForLocation: null,
    disableButton: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.streetAddress !== prevState.streetAddress ||
      this.state.city !== prevState.city ||
      this.state.state !== prevState.state ||
      this.state.zipcode !== prevState.zipcode
    ) {
      this.validateDetails();
    }
  }

  handleContinuePress = () => {
    const {selectedBook, date} = this.props.route.params;
    this.props.navigation.navigate('CreateEventAttendees', {
      selectedBook: selectedBook,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      detailsForLocation: this.state.detailsForLocation,
      date: date,
    });
  };

  handleUpdate = () => {
    const {
      selectedBook,
      membersForBookClub,
      date,
      bookClubID,
      bookClubName,
    } = this.props.route.params;
    this.props.navigation.navigate('CreateEventVerifyInfo', {
      selectedBook: selectedBook,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      detailsForLocation: this.state.detailsForLocation,
      bookClubMembers: membersForBookClub,
      bookClubID: bookClubID,
      bookClubName: bookClubName,
      date: date,
    });
  };

  validateDetails = () => {
    const breakDownOfStreetAddress = this.state.streetAddress.split(' ');
    if (
      this.state.city.length >= 3 &&
      this.state.state.length >= 2 &&
      this.state.zipcode.length >= 5 &&
      breakDownOfStreetAddress[0] &&
      breakDownOfStreetAddress[1] &&
      breakDownOfStreetAddress[2]
    ) {
      this.setState({disableButton: false});
    } else {
      this.setState({disableButton: true});
    }
  };

  render() {
    const {onUpdate} = this.props.route.params;
    const buttonTitle = onUpdate ? 'Update Information' : 'Continue';
    const onPressButton = onUpdate
      ? this.handleUpdate
      : this.handleContinuePress;
    return (
      <GreyWhiteBackgroundBottomButton
        headline="Event Details"
        subHeadline="Address:"
        continueButtonOnPress={onPressButton}
        disableButton={this.state.disableButton}
        hideButtonOnKeyboardView={true}
        buttonTitle={buttonTitle}>
        <Input
          placeholder="Street Address"
          textContentType={'streetAddressLine1'}
          onChangeText={streetAddress => this.setState({streetAddress})}
          value={this.state.streetAddress}
          inputStyle={styles.inputTextStyle}
          containerStyle={styles.singleLineContainerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          onSubmitEditing={() => {
            this.cityInput.focus();
          }}
          blurOnSubmit={false}
        />
        <Input
          placeholder="City"
          onChangeText={city => this.setState({city})}
          value={this.state.city}
          inputStyle={styles.inputTextStyle}
          containerStyle={styles.singleLineContainerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          ref={input => {
            this.cityInput = input;
          }}
          onSubmitEditing={() => {
            this.stateInput.focus();
          }}
          blurOnSubmit={false}
        />
        <View style={{flexDirection: 'row'}}>
          <Input
            placeholder="State"
            onChangeText={state => this.setState({state})}
            value={this.state.state}
            inputStyle={styles.inputTextStyle}
            containerStyle={styles.twoLineContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            ref={input => {
              this.stateInput = input;
            }}
            onSubmitEditing={() => {
              this.zipcodeInput.focus();
            }}
            blurOnSubmit={false}
          />
          <Input
            placeholder="Zip Code"
            onChangeText={zipcode => this.setState({zipcode})}
            value={this.state.zipcode}
            keyboardType={'numeric'}
            inputStyle={styles.inputTextStyle}
            containerStyle={styles.twoLineContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            ref={input => {
              this.zipcodeInput = input;
            }}
            onSubmitEditing={() => {
              this.detailsInput.focus();
            }}
            blurOnSubmit={false}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Input
            placeholder="Details on the Location "
            onChangeText={detailsForLocation =>
              this.setState({detailsForLocation})
            }
            value={this.state.detailsForLocation}
            multiline={true}
            inputStyle={styles.inputTextStyle}
            containerStyle={[
              styles.multiLineContainerStyle,
              styles.bottomContainerStyle,
            ]}
            inputContainerStyle={[
              styles.inputContainerStyle,
              styles.multiLineInputContainerStyle,
            ]}
            maxLength={400}
            ref={input => {
              this.detailsInput = input;
            }}
          />
        </View>
      </GreyWhiteBackgroundBottomButton>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
    height: windowHeight * 0.12,
  },
  bottomContainerStyle: {
    paddingBottom: windowHeight * 0.01,
  },
  submitButtonContainerStyle: {
    borderRadius: 20,
    width: '100%',
    flexGrow: 1,
    alignSelf: 'center',
  },
  submitButtonStyle: {
    backgroundColor: '#1E3342',
    flexGrow: 1,
    borderRadius: 10,
  },
  submitTitleButtonStyle: {
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
