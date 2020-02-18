import React, {Component} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class CreateEventPickDate extends Component {
  state = {
    date: new Date(),
    showDatePicker: false,
    showTimePicker: false,
    mode: 'date'
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
    }, () => console.log(this.state.date));
  }


  render() {
    return (
      <GreyWhiteBackgroundBottomButton headline="Pick Date">
        <View>
          <Button onPress={this.showDatepicker} title="Show date picker!" />
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
