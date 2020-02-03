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


export default class OnboardingTwoAvatar extends Component {
  state = {
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.titleTexth1}>Pick Your Avatar</Text>
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
  titleTexth1: {
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
    borderRadius: 5,
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-Regular',
  }
});

