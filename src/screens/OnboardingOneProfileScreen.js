import React, {Component} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {Input} from 'react-native-elements';
import UserContext from '../context/UserContext';
import BackgroundContainer from '../components/BackgroundContainer';

export default class OnboardingOneProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    disableButton: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.firstName !== prevState.firstName ||
      this.state.lastName !== prevState.lastName ||
      this.state.phoneNumber !== prevState.phoneNumber
    ) {
      this.validateDetails();
    }
  }

  validateDetails = () => {
    this.state.firstName.length >= 2 &&
    this.state.lastName.length >= 2 &&
    this.state.phoneNumber.length === 7
      ? this.setState({disableButton: true})
      : this.setState({disableButton: false});
  };

  handleContinue = () => {
    this.props.navigation.navigate('OnboardingTwoAvatar', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
    });
  };

  render() {
    return (
      <BackgroundContainer
        headline="Create Your Profile"
        buttonTitle="Continue"
        scrollView={false}
        disableButton={this.state.disableButton}
        onButtonPress={this.handleContinue}>
        <View style={styles.detailsContainer}>
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.placeholderInputContainer}
            placeholder="First Name"
            onChangeText={firstName => this.setState({firstName})}
            value={this.state.firstName}
            errorStyle={{color: 'red'}}
            errorMessage={this.state.errorMessage}
            onSubmitEditing={() => {
            this.lastNameInput.focus();
            }}
            blurOnSubmit={false}
            />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.placeholderInputContainer}
            placeholder="Last Name"
            onChangeText={lastName => this.setState({lastName})}
            value={this.state.lastName}
            errorStyle={{color: 'red'}}
            errorMessage={this.state.errorMessage}
            ref={input => {
              this.lastNameInput = input;
            }}
            onSubmitEditing={() => {
            this.phoneInput.focus();
            }}
            blurOnSubmit={false}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.placeholderInputContainer}
            placeholder="Phone Number"
            onChangeText={phoneNumber => this.setState({phoneNumber})}
            value={this.state.phoneNumber}
            errorStyle={{color: 'red'}}
            errorMessage={this.state.errorMessage}
            ref={input => {
              this.phoneInput = input;
            }}
            onSubmitEditing={this.handleContinue}
          />
        </View>
        <View style={styles.imageViewStyle}>
          <Image
            style={styles.backgroundStarterImage}
            source={require('../utils/womancrossleggedreading.png')}
            resizeMode={'contain'}
          />
        </View>
      </BackgroundContainer>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  detailsContainer: {
    // top: windowHeight * 0.05,
  },
  profileTitleTexth1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
  },
  inputContainer: {
    height: windowHeight * 0.1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
  },
  placeholderInputContainer: {
    borderColor: '#A5ADB5',
    paddingVertical: 0,
  },
  inputStyle: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  imageViewStyle: {
    alignItems: 'center',
    paddingTop: windowHeight * 0.05,
  },
  backgroundStarterImage: {
    height: windowWidth * 0.45,
    width: '100%',
  },
});

OnboardingOneProfile.contextType = UserContext;
