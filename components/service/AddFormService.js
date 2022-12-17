import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment/moment';
import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';
import { Colors } from '../../constants/styles';
import { SelectList } from 'react-native-dropdown-select-list'

function AddFormService({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [selected, setSelected] = useState("");

  const data = [
    { key: '1', value: 'production' },
    { key: '2', value: 'renovation' },
    { key: '3', value: 'repair' },
    { key: '4', value: 'other' },
  ]
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : '',
      isValid: true,
    },
    price: {
      value: defaultValues ? defaultValues.price.toString() : '',
      isValid: true,
    },
    cashAdvance: {
      value: defaultValues ? defaultValues.cashAdvance.toString() : '',
      isValid: true,
    },
    finishPrice: {
      value: defaultValues ? defaultValues.finishPrice.toString() : '',
      isValid: true,
    },
    date: {
      value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      isValid: true
      // value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      // isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function setInputsForm(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function inputChangedHandler(inputIdentifier, enteredValue) {
    const finishPrice = 0;

    // switch (inputIdentifier) {
    //   case 'price':
    //     finishPrice = Number(inputs.price.value) - Number(inputs.cashAdvance.value)
    //     setInputs('finishPrice', finishPrice.toString())
    //     // setEnteredEmail(enteredValue);
    //     break;
    //   // case 'cashAdvance':
    //   //     finishPrice = inputs.price.value - inputs.cashAdvance.value
    //   //     setInputs('finishPrice',finishPrice.toString())
    //   // //  setEnteredEmail(enteredValue);
    //   //   break;  
    // }
    setInputsForm(inputIdentifier, enteredValue)
  }

  function submitHandler() {
    const expenseData = {
      price: +inputs.price.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.price) && expenseData.price > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      console.log("" + amountIsValid+ dateIsValid+descriptionIsValid)
      setInputs((curInputs) => {
        return {
          price: { value: curInputs.price.value, isValid: !amountIsValid  },
          date: { value: curInputs.date.value, isValid:  !dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    
    !inputs.price.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View>

      <View style={styles.form}>
        {/* <Text style={styles.title}>Add your service</Text> */}

      </View>
      {/* <Input
        label="Name"
        invalid={!inputs.name.isValid}
        textInputConfig={{
          multiline: false,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, 'name'),
          value: inputs.name.value,
        }}
      /> */}
      <View style={{
        marginHorizontal: 4,
        marginVertical: 8
      }}>
        <Text style={[styles.label]}>Category</Text>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />
        <View style={styles.inputsRow}>

          <Input
            style={styles.rowInput}
            label="Price"
            invalid={!inputs.price.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'price'),
              value: inputs.price.value,
            }}
          />
          {/* <Input
            style={styles.rowInput}
            label="Price Advance"
            invalid={!inputs.cashAdvance.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'cashAdvance'),
              value: inputs.cashAdvance.value,
            }}
          /> */}

        </View>
        {/* <Input
          label="Finish Price"
          invalid={!inputs.finishPrice.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'finishPrice'),
            value: inputs.finishPrice.value,

          }}
        /> */}
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          editableTextInput= {false}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            // autoCapitalize: 'none'
            // autoCorrect: false // default is true
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputs.description.value,
          }}
        />
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data!
          </Text>
        )}
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
           Confirm
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AddFormService;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  label: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: Colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
