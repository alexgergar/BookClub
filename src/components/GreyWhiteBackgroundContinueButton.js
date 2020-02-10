import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';

const GreyWhiteBackgroundContinueButton = props => (
  <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.whiteBackgroundContainer}>
        <View style={props.headerView}>
          <Text style={styles.headlineTitleText}>{props.headline}</Text>
          <Text style={styles.subHeadLineText}>{props.subHeadline}</Text>
          <View style={props.middleContainer}>{props.children}</View>
        </View>
        <View style={styles.bottomButtonView}>
          <Button
            title="Continue"
            containerStyle={styles.continueButtonContainerStyle}
            buttonStyle={styles.continueButtonStyle}
            titleStyle={styles.continueTitleButtonStyle}
            onPress={props.continueButtonOnPress}
          />
        </View>
      </View>
    </View>
  </SafeAreaView>
);

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

export default GreyWhiteBackgroundContinueButton;
