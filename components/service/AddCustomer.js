import { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import Input from '../Auth/Input';

function AddCustomer({ submitButtonLabel, defaultValues,inputChangedHandler,inputs }) {
function changedHandler(inputIdentifier, enteredValue){
    
    inputChangedHandler(inputIdentifier, enteredValue)
}
    return (
        <View>
            <Input
                label="Name"
                invalid={!inputs.name.isValid}
                textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: changedHandler.bind(this, 'name'),
                    value: inputs.name.value,
                }}
            />
            <Input
                label="LastName"
                invalid={!inputs.lastName.isValid}
                textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: changedHandler.bind(this, 'lastName'),
                    value: inputs.lastName.value,
                }}
            />
            <Input
                label="Address"
                invalid={!inputs.adress.isValid}
                textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: changedHandler.bind(this, 'adress'),
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
                    onChangeText: changedHandler.bind(this, 'contact'),
                    value: inputs.contact.value,
                }}
            />
        </View>

    )
}
export default AddCustomer;
const styles = StyleSheet.create({

})
