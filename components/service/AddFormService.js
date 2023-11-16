import { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import moment from 'moment/moment';
import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';
import { Colors } from '../../constants/styles';
import { SelectList } from 'react-native-dropdown-select-list'
import { Service } from '../../models/service';
import { Customer } from '../../models/customer';

import ImagePicker from './ImagePicker';
import { useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchCustomer, updateServiceDetails } from '../../util/database';
import { useNavigation,useRoute,useIsFocused } from '@react-navigation/native';
import OutlinedButton from '../ui/OutlinedButton';
import AddCustomer from './AddCustomer';
import { FlatList } from 'react-native-gesture-handler';
import CustomerItem from './CustomerItem';
import { generateColor } from '../../util/randomColor';

function AddFormService({ submitButtonLabel, onCancel, onSubmit, defaultValues,id }) {
  const [selected, setSelected] = useState(defaultValues ? defaultValues.category : 'Select option');
  const [takePhoto, setTakePhoto] = useState(defaultValues? defaultValues.imageUri.toString(): '');
  const [addCustomerView, setAddCustomerView] = useState(false);
  const [showListCustomer, setListCustomerView] = useState(false);
  const [listCustomer,setListCustomer] = useState([])
  const [customerSelected,setCustomerSelected] = useState(0)
  const email = useSelector((state) => state.auth.email)
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const [imagePickedUpdate, setImagePickedUpdate] = useState(defaultValues? defaultValues.imageUri.toString(): '');
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
    lastName: {
      value: defaultValues ? defaultValues.lastName : '',
      isValid: true,
    },
    adress: {
      value: defaultValues ? defaultValues.adress : '',
      isValid: true,
    },
    contact: {
      value: defaultValues ? defaultValues.contact : '',
      isValid: true,
    },
    category: {
      value: defaultValues ? () => {
        setSelected(defaultValues.category) } : 'Select option',
      isValid: true,
    },
    price: {
      value: defaultValues ? defaultValues.price.toString() : '',
      isValid: true,
    },
    cashAdvance: {
      value: '',
      isValid: true,
    },
    finishPrice: {
      value: '',
      isValid: true,
    },
    date: {
      value: defaultValues ? moment(defaultValues.date.toString()).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      isValid: true
     
    },
    dateEnd: {
      value: defaultValues ? moment(defaultValues.dateEnd.toString()).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    }

  });
  
  useLayoutEffect(() => {
    if(submitButtonLabel === 'Update'){
    async function filterCustomers(idCustomer){
      const customers = await fetchCustomer();
      const filterCustomer = customers.find((customer)=> customer.idCustomer === idCustomer)

    if (isFocused) {
      
        const isUpdate = submitButtonLabel === 'Update' ? true : false;
        setSelected(isUpdate ? defaultValues.category : 'Select option')
        setImagePickedUpdate(isUpdate? defaultValues.imageUri.toString(): '')
        setTakePhoto(isUpdate? defaultValues.imageUri.toString(): '')
       
       
        setInputs((prevInputs) => ({
          ...prevInputs,
           name: {
          value: isUpdate ? filterCustomer.name : '',
          isValid: true,
        },
        lastName: {
          value: isUpdate ? filterCustomer.lastName : '',
          isValid: true,
        },
        adress: {
          value: isUpdate ? filterCustomer.adress : '',
          isValid: true,
        },
        contact: {
          value: isUpdate ? filterCustomer.contact : '',
          isValid: true,
        },
        category: {
          value: isUpdate ? () => { setSelected(defaultValues.category) } : 'Select option',
          isValid: true,
        },
        price: {
          value: isUpdate ? defaultValues.price.toString() : '',
          isValid: true,
        },
        cashAdvance: {
          value: '',
          isValid: true,
        },
        finishPrice: {
          value: '',
          isValid: true,
        },
        date: {
          value: defaultValues ? moment(defaultValues.date.toString()).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          isValid: true
          // value: defaultValues ? getFormattedDate(defaultValues.date) : '',
          // isValid: true,
        },
        dateEnd: {
          value: defaultValues ? moment(defaultValues.dateEnd.toString()).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          isValid: true
        },
        description: {
          value: defaultValues ? defaultValues.description : '',
          isValid: true,
        }
      }))
    }
  }
  filterCustomers(defaultValues.idCustomer);
}
}, [isFocused])

  function setInputsForm(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function ontakeImageForm(image) {
    setTakePhoto(image)
  }
  function inputChangedHandler(inputIdentifier, enteredValue) {
    const finishPrice = 0;

    
    setInputsForm(inputIdentifier, enteredValue)
  }

  function submitHandler() {
   

    const color = generateColor();
    const customerAdd = new Customer(0,inputs.name.value,inputs.lastName.value,inputs.adress.value,inputs.contact.value)
    const expenseData = new Service(customerSelected > 0 ? customerSelected : customerAdd.idCustomer,selected, takePhoto, +inputs.price.value, inputs.date.value, inputs.dateEnd.value, inputs.description.value, email,color)

    if (submitButtonLabel === 'Update') {
      updateServiceDetails(expenseData, id).finally(()=>{
        navigate.goBack()
      })
      
      return;
    }
    const amountIsValid = !isNaN(expenseData.price) && expenseData.price > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const dateEnd = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const category = selected !== ""

    if (!amountIsValid || !dateIsValid || !descriptionIsValid || !category || !dateEnd) {
      setInputs((curInputs) => {
        return {
          price: { value: curInputs.price.value, isValid: !amountIsValid },
          category: { value: selected, isValid: !category },
          date: { value: curInputs.date.value, isValid: !dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          dateEnd: { value: curInputs.date.value, isValid: !dateEnd }
        };
      });
      return;
    }

    onSubmit(expenseData,customerAdd);
    

  }
  async function showList(){
   const customers = await fetchCustomer();
   setListCustomer(customers)
   setAddCustomerView(false)
   setListCustomerView(true);
  }
  function addCustomer() {
    setListCustomerView(false);
    setAddCustomerView(true)
  }
  function showOnlyCustomer() {
    setAddCustomerView((prevState) => !prevState)
  }
  function customerIdHandler(customerId){
    setCustomerSelected(customerId)
  }
  function renderCustomer(itemData){
   
    return (
      <CustomerItem customer={itemData.item} choseUpdateCustomer={submitButtonLabel === 'Update' ? defaultValues.idCustomer : null}  pressCustomerId={customerIdHandler}/>
    )
  }
  function onPressDatePicker(date) {
    setInputsForm("dateEnd", date.toISOString().slice(0, 10))
  }
  const formIsInvalid =

    !inputs.price.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid ||
    !inputs.category.isValid;

  return (
    <>
    <ScrollView>
      <View>

        <View style={styles.form}>

        </View>
      
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
           

          </View>
         
          <View style={{
            flexDirection: "row",
            alignItems: 'flex-start',
            borderRadius: 6,


          }}>
            <Input
              label="Date"
              invalid={!inputs.date.isValid}
              editableTextInput={false}
              textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangedHandler.bind(this, 'date'),
                value: inputs.date.value,
              }}
            />
            <Input
              label="DateEnd"
              invalid={!inputs.date.isValid}
              editableTextInput={true}
              isDatePicker={true}
              onPressDatePicker={onPressDatePicker}
              textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                value: inputs.dateEnd.value,
              }}
            />
          </View>
          <Input
            label="Description"
            invalid={!inputs.description.isValid}
            textInputConfig={{
              multiline: true,
            
              onChangeText: inputChangedHandler.bind(this, 'description'),
              value: inputs.description.value,
            }}
          />

          <ImagePicker takeImageForm={ontakeImageForm} imagePickedUpdate={imagePickedUpdate} />

          {formIsInvalid && (
            <Text style={styles.errorText}>
              Invalid input values - please check your entered data!
            </Text>
          )}
          {!defaultValues ? <View style={{ flexDirection: 'row' }}>
            <OutlinedButton icon="add" onPress={addCustomer}>Add customer</OutlinedButton>
            <OutlinedButton icon="people" onPress={showList}>Chose customer</OutlinedButton>
          </View> : 
          <OutlinedButton  icon="people" onPress={showOnlyCustomer}>View customer</OutlinedButton>
          }
          {addCustomerView &&  <View><Input
                label="Name"
                invalid={!inputs.name.isValid}
                textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'name'),
                    value: inputs.name.value,
                }}
            />
            <Input
                label="LastName"
                invalid={!inputs.lastName.isValid}
                textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'lastName'),
                    value: inputs.lastName.value,
                }}
            />
            <Input
                label="Address"
                invalid={!inputs.adress.isValid}
                textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'adress'),
                    value: inputs.adress.value,
                }}
            />
            <Input
                label="Contact"
                invalid={!inputs.contact.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'contact'),
                    value: inputs.contact.value,
                }}
            />
            </View>
            }
          {showListCustomer && <FlatList
          data={listCustomer}
          keyExtractor={(item,index) => index.toString()}
          renderItem={renderCustomer}
           numColumns={1}
           horizontal={true}

          />}
         
        </View>
      </View>
    </ScrollView>
     <View style={styles.buttons}>
     <Button style={styles.button} mode="flat" onPress={onCancel}>
       Cancel
     </Button>
     <Button style={styles.button} onPress={submitHandler}>
       {submitButtonLabel}
     </Button>
   </View>
   </>
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
    paddingTop:9
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
