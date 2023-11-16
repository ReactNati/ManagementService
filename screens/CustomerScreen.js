import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import GridServiceAdd from '../components/service/GridServiceAdd';
//import {AuthContext} from '../store/auth-context'
import GridServiceTitle from '../components/service/GridServiceTitle';
import { Colors } from '../constants/styles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCustomerDetails, fetchServices } from '../util/database';
import { useIsFocused } from '@react-navigation/native';
import { fetchServiceDetails,fetchCustomer } from '../util/database';
import { useNavigation } from '@react-navigation/native';
import CustomerItem from '../components/service/CustomerItem';

function CustomerScreen() {
    const isFocused = useIsFocused();
    const [listCustomer,setListCustomer] = useState([])

    useEffect(() => {
  
      async function loadCustomers() {
       
        const customers = await fetchCustomer();
        setListCustomer(customers)
      }

      if (isFocused) {
        loadCustomers();
      }
    }, [isFocused])

    function renderCustomer(itemData){
   
        return (
          <CustomerItem customer={itemData.item}/>
        )
      }



    return <View style={styles.rootContainer}>
     <FlatList
          data={listCustomer}
          style={{width:350}}
          keyExtractor={(item,index) => index.toString()}
          renderItem={renderCustomer}
           numColumns={1}
           horizontal={false}

          />
  </View>
}

export default CustomerScreen;
const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    }
   
  });