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
import {
  windowWidth,
  windowHeight,
  elevationShadowStyle,
} from '../style/baseStyles';

const HeadlineSection = props => (
  <View style={props.headerView}>
    {props.headline && (
      <Text style={styles.headlineTitleText}>{props.headline}</Text>
    )}
    {props.subHeadline && (
      <>
        <Text style={styles.subHeadLineText}>{props.subHeadline}</Text>
      </>
    )}
    <View style={props.middleContainer}>{props.children}</View>
  </View>
);

export default class GreyWhiteBackgroundBottomButton extends Component {
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
    scrollView: true,
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
        <View style={styles.container}>
          <View
            style={[
              {paddingHorizontal: this.props.paddingHorizontal},
              styles.whiteBackgroundContainer,
            ]}>
            {this.props.scrollView && (
              <ScrollView contentContainerStyle={{}}>
                <HeadlineSection
                  headerView={this.props.headerView}
                  headline={this.props.headline}
                  subHeadline={this.props.subHeadline}
                  middleContainer={this.props.middleContainer}
                  children={this.props.children}
                />
              </ScrollView>
            )}
            {!this.props.scrollView && (
              <HeadlineSection
                headline={this.props.headline}
                subHeadline={this.props.subHeadline}
                middleContainer={this.props.middleContainer}
                children={this.props.children}
              />
            )}
            {this.props.showButton && (
              <>
                <Animated.View
                  style={{
                    marginVertical: this.vertMargins,
                    height: this.buttonHeight,
                  }}>
                  <Button
                    title={this.props.buttonTitle}
                    containerStyle={[styles.continueButtonContainerStyle]}
                    buttonStyle={styles.continueButtonStyle}
                    titleStyle={styles.continueTitleButtonStyle}
                    onPress={this.props.continueButtonOnPress}
                    disabled={this.props.disableButton}
                  />
                </Animated.View>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#E3E4E6',
  },
  container: {
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
    paddingTop: windowHeight * 0.05,
  },
  whiteBackgroundContainer: {
    ...elevationShadowStyle(8),
    backgroundColor: 'white',
    width: '90%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  continueButtonContainerStyle: {
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
  },
  continueButtonStyle: {
    backgroundColor: '#1E3342',
    borderRadius: 10,
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
});
