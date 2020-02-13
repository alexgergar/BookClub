import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';

export default class AvatarForLists extends Component {
  handleGetInitials = () => {
    const fullName = this.props.displayName;
    return fullName
      .split(' ')
      .map(name => name[0])
      .join('');
  }

  render() {
    return (
      <View>
      {this.props.avatar ? (
          <Avatar
            size={this.props.avatarSize}
            rounded
            source={{uri: this.props.avatar,}}
            containerStyle={this.props.avatarContainerStyle}
          />
        ) : (
          <Avatar
            rounded
            size={this.props.avatarSize}
            titleStyle={styles.avatarTitleStyle}
            title={this.handleGetInitials(this.props.displayName)}
            avatarStyle={styles.avatarStyle}
          />
        )}
        </View>
    )
  }
}


const styles = StyleSheet.create({
  avatarContainer: {
    
  },
  avatarTitleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    // padding: 5,
  },
});
