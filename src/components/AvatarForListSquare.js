import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';

export default class AvatarForLists extends Component {

  handleGetInitials = () => {
    return this.props.displayName
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
            source={{uri: this.props.avatar,}}
            containerStyle={this.props.avatarContainerStyle}
            onPress={this.props.onPress}
          />
        ) : (
          <Avatar
            size={this.props.avatarSize}
            titleStyle={styles.avatarTitleStyle}
            title={this.handleGetInitials(this.props.displayName)}
            avatarStyle={styles.avatarStyle}
            onPress={this.props.onPress}
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
    fontSize: 11,
    padding: 5,
  },
});
