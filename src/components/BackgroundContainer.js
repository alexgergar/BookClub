import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';

export default class BackgroundContainer extends Component {
  constructor(props) {
    super(props);

    this.buttonVerticalMarginsAnimated = new Animated.Value(0);
    this.heightOfButton = new Animated.Value(0);
    this.vertMargins = this.heightOfButton.interpolate({
      inputRange: [0, 1],
      outputRange: ['3%', '0%'],
    });
    this.buttonHeight = this.heightOfButton.interpolate({
      inputRange: [0, 1],
      outputRange: ['6.5%', '0%'],
    });
  }
  static defaultProps = {
    buttonTitle: 'Continue',
    scrollView: false,
    showButton: true,
    hideButtonOnKeyboardView: true,
    paddingHorizontal: '5%',
    disableButton: false,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = event => {
    if (this.props.hideButtonOnKeyboardView) {
      Animated.parallel([
        Animated.timing(this.buttonVerticalMarginsAnimated, {
          toValue: 1,
          duration: 100,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        Animated.timing(this.heightOfButton, {
          toValue: 1,
          duration: 100,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      ]).start();
    }
  };

  _keyboardDidHide = () => {
    if (this.props.hideButtonOnKeyboardView) {
      Animated.parallel([
        Animated.timing(this.heightOfButton, {
          toValue: 0,
          duration: 100,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        Animated.timing(this.heightOfButton, {
          toValue: 0,
          duration: 100,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      ]).start();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={[styles.container]}>
          <View style={this.props.headerView}>
            {this.props.headline && (
              <Text style={styles.headlineTitleText}>{this.props.headline}</Text>
            )}
            {this.props.subHeadline && 
                <Text style={styles.subHeadLineText}>{this.props.subHeadline}</Text>
            }
          </View>

            {this.props.scrollView && (
              <ScrollView contentContainerStyle={this.props.scrollViewStyle}>
              {this.props.children}
              </ScrollView>
            )}
            {!this.props.scrollView && this.props.children}
            {this.props.showButton && (
              <>
                <Animated.View
                  style={{
                    marginVertical: this.vertMargins,
                    height: this.buttonHeight,
                  }}>
                  <Button
                    title={this.props.buttonTitle}
                    containerStyle={[styles.bottomButtonContainerStyle]}
                    buttonStyle={styles.bottomButtonButtonStyle}
                    titleStyle={styles.bottomButtonTitleStyle}
                    onPress={this.props.onButtonPress}
                    disabled={this.props.disableButton}
                    disabledStyle={styles.disableButtonStyle}
                  />
                </Animated.View>
              </>
            )}
        </View>
      </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#E3E4E6',
    // justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#E3E4E6',
    paddingHorizontal: '5%',
    // alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: '5%',
    justifyContent: 'space-between',
  },
  headlineTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
    marginBottom: 10,
    marginTop: '5%',
  },
  subHeadLineText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  bottomButtonView: {
    // marginVertical: '3%',
  },
  bottomButtonContainerStyle: {
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
  },
  bottomButtonButtonStyle: {
    backgroundColor: '#1E3342',
    borderRadius: 10,
  },
  bottomButtonTitleStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
  disableButtonStyle: {
    backgroundColor: 'rgba(58, 86, 114, .2)',
  },
});
