import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import GreyWhiteBackgroundBottomButton from '../components/GreyWhiteBackgroundBottomButton';

export default class Test extends Component {
  state={
    value: ''
  }

  render() {
    return (
      <GreyWhiteBackgroundBottomButton
        headline="Pick a Date"
        buttonTitle='button title'
        scrollView={true}>
        <View>
          <Text>test</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({text})}
            value={this.state.value}
          />
        </View>
      </GreyWhiteBackgroundBottomButton>
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
  backgroundImage: {
    height: windowWidth * 0.5,
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
