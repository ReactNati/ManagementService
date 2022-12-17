import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import AddFormService from '../components/service/AddFormService';
import { Colors } from '../constants/styles'
import {useSelector,useDispatch} from 'react-redux'
import {service} from '../store/redux/service';

function ManageService({ route, navigation }) {

  const editedServiceId = route.params?.serviceId;
  const isEditing = !!editedServiceId;

  function confirmHandler(expenseData){
    console.log("expenseData" +JSON.stringify(expenseData))
    try {

    const dispatch = useDispatch();
    dispatch(service({service:expenseData}))
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