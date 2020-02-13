import React, {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

const HeadlineSection = props => (
  <View style={props.headerView}>
    <Text style={styles.headlineTitleText}>{props.headline}</Text>
    {props.subHeadline && (
      <>
        <Text style={styles.subHeadLineText}>{props.subHeadline}</Text>
      </>
    )}
    <View style={props.middleContainer}>{props.children}</View>
  </View>
);

export default class GreyWhiteBackgroundBottomButton extends Component {
  static defaultProps = {
    buttonTitle: 'Continue',
    scrollView: true,
    showButton: true,
    paddingHorizontal: '5%',
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={[
              {paddingHorizontal: this.props.paddingHorizontal},
              styles.whiteBackgroundContainer,
            ]}>
            {this.props.scrollView && (
              <ScrollView>
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
                headerView={this.props.headerView}
                headline={this.props.headline}
                subHeadline={this.props.subHeadline}
                middleContainer={this.props.middleContainer}
                children={this.props.children}
              />
            )}
            {this.props.showButton && (
              <>
                <View style={styles.bottomButtonView}>
                  <Button
                    title={this.props.buttonTitle}
                    containerStyle={styles.continueButtonContainerStyle}
                    buttonStyle={styles.continueButtonStyle}
                    titleStyle={styles.continueTitleButtonStyle}
                    onPress={this.props.continueButtonOnPress}
                  />
                </View>
              </>
            )}
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
    borderRadius: 10,
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
});
