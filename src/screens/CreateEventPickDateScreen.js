import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions, Image, TouchableWithoutFeedback} from 'react-native';
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
    if (date === undefined) {
      this.setState({showDatePicker: false});
    } else {
      this.setState({
        date: date,
        showTimePicker: true,
        showDatePicker: false,
      });
    }
    
  };

  setTime = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const currentDate = selectedDate || this.state.date;
      this.setState({
        date: currentDate,
        showTimePicker: false,
        headline: 'Continue'
        },
        () => this.sendToNextScreen(),
      );
    } else {
      this.setState({
        showTimePicker: false,
      })
    }
    
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
    } = this.props.route.params;
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
        scrollView={false}
        continueButtonOnPress={this.onPressButton}>
        <View style={styles.imageView}>
          <TouchableWithoutFeedback onPress={() => this.showDatepicker()}>
            <Image
            style={styles.backgroundImage}
            source={require('../utils/pickDateTimeImage.png')}
            resizeMode={'contain'}
          />
        </TouchableWithoutFeedback>
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
  imageView: {
    alignItems: 'center',
    top: windowHeight * .15,
  },
  backgroundImage: {
    height: windowWidth * .5,
    top: 0,
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
