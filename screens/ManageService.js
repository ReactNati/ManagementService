import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import AddFormService from '../components/service/AddFormService';
import { Colors } from '../constants/styles'

import { insertService,fetchServiceDetails, insertCustomer } from '../util/database';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Service } from '../models/service';
import { useNavigation,useRoute,useIsFocused } from '@react-navigation/native';
import { throttle } from 'lodash'

function ManageService({ route,navigation }) {
  const isFocused = useIsFocused();

  const editedServiceId = route.params?.serviceId;
  let fetchService= route.params?.fetchService;
 

  const isEditing = !!editedServiceId;

  if(isEditing){
    fetchService =new Service(fetchService.idCustomer,route.params?.fetchService.category,route.params?.fetchService.imageUri,route.params?.fetchService.price,route.params?.fetchService.date,route.params?.fetchService.dateEnd,route.params?.fetchService.description,route.params?.fetchService.owner,route.params?.fetchService.colorCalendar);
  }
  useEffect(()=>{
    if (isFocused && isEditing) {
      
        fetchService =new Service(route.params?.idCustomer,route.params?.fetchService.category,route.params?.fetchService.imageUri,route.params?.fetchService.price,route.params?.fetchService.date,route.params?.fetchService.dateEnd,route.params?.fetchService.description,route.params?.fetchService.owner,route.params?.fetchService.colorCalendar);

    }
    
   },[isFocused])

 async function confirmHandler(expenseData,customer){
   

    try {
   
    
    if (isEditing) {
      
    } else {
      if(expenseData.idCustomer > 0){
      
        const  service = {...expenseData,idCustomer: expenseData.idCustomer}

        await insertService(service);
        navigation.goBack();
    } else{
      insertCustomer(customer).then( async (result)=>{

        const  service = {...expenseData,idCustomer: result.insertId}

        await insertService(service);
        navigation.goBack();
      })
      }
 
    }
         
    
    }catch(error){
      console.log("error" + error)
    }

  }
 
  function cancelHandler(){
   navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <AddFormService 
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={throttle(cancelHandler, 1000, {trailing: false})}
        defaultValues={isEditing ?fetchService:null}
        id={editedServiceId}
        >
        </AddFormService>
    </View>
  )

}

export default ManageService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    borderTopColor: Colors.primary500,
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
  },
});