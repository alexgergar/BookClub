import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Keyboard} from 'react-native';
import {Input} from 'react-native-elements';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class CreateEventAddDetails extends Component {
  state = {
    streetAddress: null,
    city: null,
    state: null,
    zipcode: null,
    detailsForLocation: null,
  };

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
        buttonTitle={buttonTitle}>
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
          containerStyle={[
            styles.multiLineContainerStyle,
            styles.bottomContainerStyle,
          ]}
          inputContainerStyle={[
            styles.inputContainerStyle,
            styles.multiLineInputContainerStyle,
          ]}
          maxLength={400}
          onFocus={this.toggleShowTitle}
          onBlur={this.toggleShowTitle}
        />
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
    height: windowHeight * 0.1,
  },
  bottomContainerStyle: {
    paddingBottom: windowHeight * 0.01,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
