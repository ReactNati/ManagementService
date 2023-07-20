import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import AddFormService from '../components/service/AddFormService';
import { Colors } from '../constants/styles'
import {useSelector,useDispatch} from 'react-redux'
import {service} from '../store/redux/service';
import { insertService,fetchServiceDetails, insertCustomer } from '../util/database';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Service } from '../models/service';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useNavigation,useRoute,useIsFocused } from '@react-navigation/native';
import { fetchCustomer, updateServiceDetails } from '../util/database';

//import { useNavigation,StackActions } from '@react-navigation/native';
import { throttle } from 'lodash'

function ManageService({ route,navigation }) {
  //const navigation = useNavigation();
  const isFocused = useIsFocused();

  const editedServiceId = route.params?.serviceId;
  let fetchService= route.params?.fetchService;
 
  console.log("editedServiceId" +JSON.stringify(editedServiceId))

  const isEditing = !!editedServiceId;

  if(isEditing){
    fetchService =new Service(fetchService.idCustomer,route.params?.fetchService.category,route.params?.fetchService.imageUri,route.params?.fetchService.price,route.params?.fetchService.date,route.params?.fetchService.dateEnd,route.params?.fetchService.description,route.params?.fetchService.owner,route.params?.fetchService.colorCalendar);
  }
  useEffect(()=>{
    if (isFocused && isEditing) {
      
        fetchService =new Service(route.params?.idCustomer,route.params?.fetchService.category,route.params?.fetchService.imageUri,route.params?.fetchService.price,route.params?.fetchService.date,route.params?.fetchService.dateEnd,route.params?.fetchService.description,route.params?.fetchService.owner,route.params?.fetchService.colorCalendar);

    }
    // async function getFetchService(){
    //   const fetchService = await fetchServiceDetails(editedServiceId)
    //   console.log(fetchService)

    //   const  service = new Service(fetchService.category,fetchService.imageUri,fetchService.price,fetchService.date,fetchService.description,fetchService.owner,fetchService.dateEnd)
    //   setSelectedExpense(service)
    //   console.log("selectedExpense" + selectedExpense)
    // }

    // getFetchService();
   },[isFocused])

 async function confirmHandler(expenseData,customer){
    console.log("expenseData1" +JSON.stringify(expenseData))
    console.log("expenseData2" +JSON.stringify(customer))

    try {
    //to do redux when add fetch order
    // const dispatch = useDispatch();
    // dispatch(service({service:expenseData}))
    
    if (isEditing) {
      console.log('isEditing')
      // expensesCtx.updateExpense(editedExpenseId, expenseData);
      // await updateExpenses(editedExpenseId,expenseData)
    } else {
      if(expenseData.idCustomer > 0){
      
        const  service = {...expenseData,idCustomer: expenseData.idCustomer}
        console.log("resulttt2" + JSON.stringify(service))

        await insertService(service);
        navigation.goBack();
    } else{
      insertCustomer(customer).then( async (result)=>{
        console.log("resulttt" + JSON.stringify(result.insertId))

        const  service = {...expenseData,idCustomer: result.insertId}
        console.log("resulttt2" + JSON.stringify(service))

        await insertService(service);
        navigation.goBack();
      })
      }
     // await insertService(expenseData).finally(async ()=>{
    //     await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/service.db', 
    //     {dialogTitle: 'share or copy your DB via'}
    //  ).catch(error =>{
    //     console.log(error);
    //  }).then(({ uri }) => {
    //   console.log('Finished downloading to ', uri)
    // })
    // .catch(error => {
    //   console.error(error);
    // })

     // });

      
    // FileSystem.downloadAsync(
    //   'http://example.com/downloads/data.sqlite',
    //   FileSystem.documentDirectory + 'SQLite/service.db'
    // )s
    
    //  const id = await  storeExpense(expenseData)
    //   expensesCtx.addExpense({...expenseData,id:id});
    }
          // navigation.navigate("AllPlaces",{
          //     place: placeData
          // })
    //navigation.navigate('AuthenticatedStack', { screen: 'Welcome' });

    
    }catch(error){
      console.log("error" + error)
    }

  }
 
  function cancelHandler(){
   // navigation.navigate('Welcome');
   navigation.goBack();
   console.log(JSON.stringify(navigation))
  }
  return (
    <View style={styles.container}>
      <AddFormService 
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={throttle(cancelHandler, 1000, {trailing: false})}
        defaultValues={isEditing ?fetchService:null}
        id={editedServiceId}
        //customerDetails={filterCustomers}
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