import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';

export default class AvatarForLists extends Component {
  static defaultProps = {
    rounded: true,
    fontSize: 11,
    color: 'white',
  };

  handleGetInitials = () => {
    return this.props.displayName
      .split(' ')
      .map(name => name[0])
      .join('');
  }

  render() {
    let {avatarSize, avatar, fontSize, color, displayName, overlayStyle} = this.props;
    return (
     <View>
      {avatar ? (
          <Avatar
            size={avatarSize}
            rounded
            source={{uri: avatar,}}
            containerStyle={styles.avatarContainer}
            avatarStyle={styles.avatarContainer}
          />
        ) : (
          <Avatar
            rounded
            size={avatarSize}
            titleStyle={[styles.avatarTitleStyle, {fontSize: fontSize, color: color}]}
            title={this.handleGetInitials(displayName)}
            overlayContainerStyle={overlayStyle}
            avatarStyle={styles.avatarStyle}
          />
        )}
        </View>
    )
  }
}


const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  avatarTitleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
});
