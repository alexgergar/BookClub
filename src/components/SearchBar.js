import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  UIManager,
  LayoutAnimation,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';

class SearchBar extends Component {
  static propTypes = {
    searchPlaceholder: PropTypes.string,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
  };

  static defaultProps = {
    searchPlaceholder: 'Search',
    onClear: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onChangeText: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      isEmpty: true,
      showLoader: false,
    };
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClear();
  };

  cancel = () => {
    this.blur();
  };

  showLoader = () => {
    this.setState({
      showLoader: true,
    });
  };

  hideLoader = () => {
    this.setState({
      showLoader: false,
    });
  };

  onFocus = () => {
    this.props.onFocus();
    this.props.getPermissionForAndroid();
    if (UIManager.configureNextLayoutAnimation) LayoutAnimation.easeInEaseOut();
    this.setState({
      hasFocus: true,
    });
  };

  onBlur = () => {
    this.props.onBlur();
    if (UIManager.configureNextLayoutAnimation) LayoutAnimation.easeInEaseOut();
    this.setState({
      hasFocus: false,
    });
  };

  onChangeText = text => {
    this.props.onChangeText(text);
    this.setState({isEmpty: text === ''});
  };

  render() {
    const {
      container,
      inputStyle,
      leftIconStyle,
      rightContainer,
      rightIconStyle,
      activityIndicator,
    } = styles;

    const {style, placeholder} = this.props;

    const {hasFocus, isEmpty, showLoader} = this.state;

    const inputStyleCollection = [inputStyle];

    if (hasFocus) inputStyleCollection.push({flex: 1});

    return (
      <TouchableWithoutFeedback onPress={this.focus} style={style}>
        <Animated.View style={container}>
          <View style={leftIconStyle}>
            <Icon type='material' name='search' />
          </View>
          <TextInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
            placeholder={placeholder}
            style={inputStyleCollection}
            placeholderTextColor='#8F8F8F'
            autoCorrect={false}
            ref={ref => {
              this.input = ref;
            }}
          />
          <View style={rightContainer}>
            {(hasFocus && showLoader) && (
              <ActivityIndicator
                key="loading"
                style={activityIndicator}
                color='#8F8F8F'
              />
            )}
            {(hasFocus && !isEmpty) && (
              <TouchableOpacity onPress={this.clear}>
                <View style={rightIconStyle}>
                  <Icon type='material' name='close' color='#8F8F8F' size={16} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DBDBDB',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    alignSelf: 'center',
    marginLeft: 5,
    height: 40,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    width: '100%',
  },
  leftIconStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  rightIconStyle: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activityIndicator: {
    marginRight: 5,
  },
});

export default SearchBar;
