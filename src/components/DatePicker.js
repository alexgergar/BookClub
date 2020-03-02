import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {Button, Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = props => (
    <View>
      <View style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 10}}>
        <Icon
          name='x'
          type='feather'
          onPress={props.handleModal} />
      </View>
      <DateTimePicker
          value={props.date}
          mode={props.mode}
          display="default"
          onChange={props.setIOSDate}
      />
      <View style={{paddingBottom: windowHeight * .05}}>
        {props.mode === 'date' && (
          <>
          <View style={{width: '50%', alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center'}}>
            <Button 
              onPress={props.showTimeMode}
              title="Select Date"
              titleStyle={styles.textStyle}
              buttonStyle={styles.buttonStyle}
              buttonContainerStyle={styles.buttonContainerStyle}
              />
          </View>
          </>
        )}
        {props.mode === 'time' && (
          <>
          <View style={{ flexDirection: 'row', width: '100%'}}>
          <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
            <Button 
              onPress={props.showDateMode}
              title="Change Date"
              titleStyle={styles.textStyle}
              buttonStyle={styles.buttonStyle}
              buttonContainerStyle={styles.buttonContainerStyle} />
          </View>
          <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
            <Button 
              onPress={props.handleSubmitTime}
              title="Select Time"
              titleStyle={styles.textStyle}
              buttonStyle={styles.buttonStyle}
              buttonContainerStyle={styles.buttonContainerStyle}
              />
          </View>
          </View>
          </>
          )}
        
      </View>
    </View>
  );

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  // buttonContainerStyle: {
  //   marginHorizontal: windowWidth * .05,
  // },
  buttonStyle: {
    width: '90%',
    backgroundColor: '#1E3342',
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },

});


export default DatePicker;