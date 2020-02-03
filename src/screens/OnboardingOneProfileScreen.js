import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Input, Button } from 'react-native-elements';


export default class OnboardingOneProfile extends Component {
  state= {
    firstName: '',
    lastName: '',
    phone: '',
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.profileTitleTexth1}>Create Your Profile</Text>
          <View style={styles.detailsContainer}>
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.placeholderInputContainer}
              placeholder="First Name"
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errorMessage}
            />
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.placeholderInputContainer}
              placeholder="Last Name"
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errorMessage}
            />
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.placeholderInputContainer}
              placeholder="Phone Number"
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errorMessage}
            />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Image
            style={styles.backgroundStarterImage}
            source={require('../utils/womancrossleggedreading.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Button
            buttonStyle={styles.continueButtonViewContainer}
            titleStyle={styles.continueTitleButtonStyle}
            // icon={{ name: 'arrow-right', color: 'white', type: 'feather' }}
            title='Continue'
            onPress={this.handleSubmit}
          />
        </View>
      </SafeAreaView>
    )
  }

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: windowWidth * .07,
  },
  topContainer: {
    flexGrow: 1,
    zIndex: 5,
  },
  detailsContainer: {
    top: windowHeight * .05,
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
  },
  middleContainer: {
    flexShrink: 1,
  },
  bottomContainer: {
    flexShrink: 1,
    justifyContent: 'flex-end',
  },
  backgroundStarterImage: {
    height: '80%',
    alignSelf: 'center',
  },
  continueButtonViewContainer: {
    backgroundColor: '#1E3342',
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-Regular',
  }
});

