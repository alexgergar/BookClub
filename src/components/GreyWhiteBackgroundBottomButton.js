import React, {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import UserContext from '../context/UserContext';

export default class GreyWhiteBackgroundBottomButton extends Component {
  static defaultProps = {
    buttonTitle: 'Continue',
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.whiteBackgroundContainer}>
            <ScrollView>
              <View style={this.props.headerView}>
                <Text style={styles.headlineTitleText}>
                  {this.props.headline}
                </Text>
                <Text style={styles.subHeadLineText}>
                  {this.props.subHeadline}
                </Text>
                <View style={this.props.middleContainer}>
                  {this.props.children}
                </View>
              </View>
            </ScrollView>
            <View style={styles.bottomButtonView}>
              <Button
                title={this.props.buttonTitle}
                containerStyle={styles.continueButtonContainerStyle}
                buttonStyle={styles.continueButtonStyle}
                titleStyle={styles.continueTitleButtonStyle}
                onPress={this.props.continueButtonOnPress}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  whiteBackgroundContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '95%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: '5%',
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
    marginVertical: '3%',
  },
  continueButtonContainerStyle: {
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
  },
  continueButtonStyle: {
    backgroundColor: '#1E3342',
    borderRadius: 5,
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
});
