import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import AddFormService from '../components/service/AddFormService';
import { Colors } from '../constants/styles'
import {useSelector,useDispatch} from 'react-redux'
import {service} from '../store/redux/service';
import { insertService } from '../util/database';
function ManageService({ route, navigation }) {

  const editedServiceId = route.params?.serviceId;
  const isEditing = !!editedServiceId;

 async function confirmHandler(expenseData){
    console.log("expenseData" +JSON.stringify(expenseData))
    try {
    //to do redux when add fetch order
    // const dispatch = useDispatch();
    // dispatch(service({service:expenseData}))
    
      await insertService(expenseData);
          // navigation.navigate("AllPlaces",{
          //     place: placeData
          // })
       
    navigation.goBack();
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
        onCancel={cancelHandler}
        // defaultValues={selectedExpense}
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