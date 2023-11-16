import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants/styles';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import { useState } from 'react';

function Input({ label, invalid, style, textInputConfig,editableTextInput,onPressDatePicker,isDatePicker }) {

  const inputStyles = [styles.input];
  const [date, setDate] = useState(new Date());
  //const [time, setTime] = useState(new Date());

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    
    onPressDatePicker(currentDate);
  };



  const showMode = (currentMode) => {
    if(isDatePicker){
      
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
    
  }
  
  };
  
  const showDatepicker = () => {
    showMode('date');
    //showMode('time'); to do

  };

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput editable={editableTextInput} style={inputStyles} {...textInputConfig} onPressIn={showDatepicker} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary100,
    color: Colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: Colors.error500
  },
  invalidInput: {
    backgroundColor: Colors.error500
  }
});
