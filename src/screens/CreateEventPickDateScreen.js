import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class CreateEventPickDate extends Component {
  state = {
    date: new Date(),
    showDatePicker: false,
    showTimePicker: false,
    headline: 'Pick A Date',
  };

  showDatepicker = () => {
    this.setState({showDatePicker: true});
  };

  setDate = (event, date) => {
    this.setState({
      date: date,
      showTimePicker: true,
      showDatePicker: false,
    });
  };

  setTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      showTimePicker: false,
      headline: 'Continue'
      },
      () => this.sendToNextScreen(),
    );
  };

  sendToNextScreen = () => {
    const eventDate = this.state.date.toDateString();
    const eventTime = this.formatTime();
    const {
      onUpdate,
      streetAddress,
      city,
      state,
      zipcode,
      detailsForLocation,
      membersForBookClub,
      bookClubID,
      bookClubName,
      selectedBook,
      newClub,
    } = this.props.navigation.state.params;
    onUpdate
      ? this.props.navigation.navigate('CreateEventVerifyInfo', {
          selectedBook: selectedBook,
          streetAddress: streetAddress,
          city: city,
          state: state,
          zipcode: zipcode,
          detailsForLocation: detailsForLocation,
          bookClubMembers: membersForBookClub,
          bookClubID: bookClubID,
          bookClubName: bookClubName,
          newClub: newClub,
          date: {
            date: eventDate,
            time: eventTime,
          },
        })
      : this.props.navigation.navigate('CreateEventAddDetails', {
          selectedBook: selectedBook,
          date: {
            date: eventDate,
            time: eventTime,
          },
        });
  };

  formatTime = () => {
    const hours = this.state.date.getHours();
    const minutes = this.state.date.getMinutes();
    const newMinutes = this.formatMinutes(minutes);
    const newTime = this.formatHours(hours, newMinutes);
    return newTime;
  };

  formatMinutes = minutes => {
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    };
  }

  formatHours = (hour, minutes) => {
    if (hour > 12) {
      const newHour = hour - 12;
      return `${newHour}:${minutes} pm`;
    } else if (hour !== 0) {
      return `${hour}:${minutes} am`;
    } else {
      return `12:${minutes} am`;
    }
  }

  onPressButton = () => {
    this.showDatepicker();
  }


  render() {
    return (
      <GreyWhiteBackgroundBottomButton
        headline="Pick a Date"
        buttonTitle={this.state.headline}
        continueButtonOnPress={this.onPressButton}>
        <View style={styles.buttonView}>
          {/* <Button
            onPress={this.showDatepicker}
            title="Choose a Time"
            containerStyle={styles.buttonContainer}
          /> */}
        </View>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={this.state.date}
            mode="date"
            display="default"
            onChange={this.setDate}
          />
        )}
        {this.state.showTimePicker && (
          <DateTimePicker
            value={this.state.date}
            mode="time"
            display="default"
            onChange={this.setTime}
          />
        )}
      </GreyWhiteBackgroundBottomButton>
    );
  }
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonView: {
    height: windowHeight * 0.7,
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
  },
  bottom: {
    backgroundColor: 'orange',
    height: windowHeight * 0.3,
  },
});
