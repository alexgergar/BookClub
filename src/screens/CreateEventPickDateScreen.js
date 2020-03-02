import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Button,
} from 'react-native';
import DatePicker from '../components/DatePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class CreateEventPickDate extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    showModal: false,
    time: null,
    showDatePicker: false,
    showTimePicker: false,
    headline: 'Pick A Date',
  }

  onPressButton = () => {
    Platform.OS === 'android' ? this.handleAndroidPicker() : this.handleModal();
  };

  handleModal = () => {
    this.setState({ 
      showModal: !this.state.showModal });
  };

  handleAndroidPicker = () => {
    this.setState({showDatePicker: true});
  };

  setIOSDate = (event, selectedDate) => {
    if (Platform.OS === 'ios') {
      const currentDate = selectedDate || this.state.date;
      const eventTime = this.formatTime(currentDate);
      this.setState({
        date: currentDate,
        time: eventTime,
      });
    } 
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
      const eventTime = this.formatTime(currentDate);
      this.setState(
        {
          date: currentDate,
          time: eventTime,
          showTimePicker: false,
          headline: 'Continue',
        },
        () => this.sendToNextScreen(),
      );
    } else {
      this.setState({
        showTimePicker: false,
      });
    }
  };

  handleSubmitTime = () => {
    this.setState({showModal: false});
    this.sendToNextScreen();
  }

  showTimeMode = () => {
    const currentTime = this.formatTime(this.state.date);
    this.setState({mode: 'time', time: currentTime});
  }

  showDateMode = () => {
    this.setState({ mode: 'date'});
  }

  formatTime = currentDate => {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const newMinutes = this.formatMinutes(minutes);
    const newTime = this.formatHours(hours, newMinutes);
    return newTime;
  };

  formatMinutes = minutes => {
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  };

  formatHours = (hour, minutes) => {
    if (hour > 12) {
      const newHour = hour - 12;
      return `${newHour}:${minutes} pm`;
    } else if (hour !== 0) {
      return `${hour}:${minutes} am`;
    } else {
      return `12:${minutes} am`;
    }
  };

  

  sendToNextScreen = () => {
    const eventDate = this.state.date.toDateString();
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
            time: this.state.time,
          },
        })
      : this.props.navigation.navigate('CreateEventAddDetails', {
          selectedBook: selectedBook,
          date: {
            date: eventDate,
            time: this.state.time,
          },
        });
  };

  render() {
    const { date, showModal, time, mode } = this.state;
    return (
      <>
        <GreyWhiteBackgroundBottomButton
          headline="Pick a Date"
          buttonTitle='Select time'
          continueButtonOnPress={this.onPressButton}
        >
        <TouchableWithoutFeedback onPress={this.onPressButton}>
        <View style={{ marginTop: '30%'}}>
          <Image
            style={styles.backgroundImage}
            source={require('../utils/pickDateTimeImage.png')}
            resizeMode={'contain'}
            />
        </View>
              
          </TouchableWithoutFeedback>
        <View style={{alignItems: 'center'}}>
            <View style={{marginTop: windowHeight * .05, alignItems: 'center'}}>
              {showModal && <Text style={styles.dateTimeTextStyle}>{date.toDateString()}</Text>}
              {showModal && time !== null && <Text style={styles.dateTimeTextStyle}>{time}</Text>  }
            </View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
      >
        <View style={{ justifyContent: 'flex-end', backgroundColor: 'white', width: windowWidth, position: 'absolute', bottom: 0 }}>
          <DatePicker
            date={date}
            showTimeMode={this.showTimeMode}
            mode={mode}
            handleModal={this.handleModal}
            showDateMode={this.showDateMode}
            setIOSDate={this.setIOSDate}
            handleSubmitTime={this.handleSubmitTime}
          />
        </View>
      </Modal>
      </>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonView: {
    height: windowHeight * 0.7,
    justifyContent: 'center',
  },
  imageView: {
    alignItems: 'center',
    top: windowHeight * 0.15,
  },
  buttonContainer: {
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
  },
  iosDatePickerView: {
    zIndex: 1000,
    position: 'absolute',
    top: windowHeight * .5,
    width: windowWidth,
    backgroundColor: 'pink',
  },
  dateTimeTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
  },
  backgroundImage: {
    height: windowWidth * 0.45,
    width: '100%',
  },
});
