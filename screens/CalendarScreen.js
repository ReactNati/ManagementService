import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import GridServiceAdd from '../components/service/GridServiceAdd';
//import {AuthContext} from '../store/auth-context'
import GridServiceTitle from '../components/service/GridServiceTitle';
import { Colors } from '../constants/styles'
import { Calendar } from 'react-native-calendars';
import { fetchServices } from '../util/database';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

function CalendarScreen() {
  const [orderList, setOrders] = useState([]);
  const email = useSelector((state) => state.auth.email)
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getServices() {
      const services = await fetchServices(email);
      setOrders(services)
    }
    getServices();
  }, [isFocused])

  function getNumbberDays(datafrom, dateto) {
    const dateFrom = moment(datafrom).format('YYYY-MM-DD HH:mm:ss');
    const dateTo = moment(new Date(dateto)).format('YYYY-MM-DD HH:mm:ss')
    const hoursDateEnd = (Math.abs(moment(dateFrom).diff(dateTo)) / 36e5) / 24;
    const numberDays = Math.ceil(hoursDateEnd) + 1
    return numberDays;
  }
  const getMarked = () => {
    let marked = {};

    orderList.forEach((element, index) => {
      const dateFrom = moment(element.date).format('YYYY-MM-DD HH:mm:ss');
      const dateTo = moment(new Date(element.dateEnd)).format('YYYY-MM-DD HH:mm:ss')

      let markedPrefix = moment(element.date).format('YYYY-MM-DD');

      for (let i = moment(dateFrom).date(); i <= moment(dateTo).date(); i++) {
       
        let periods = [];


        periods.push({
          startingDay: i == moment(dateFrom).date(),
          endingDay: i == moment(dateTo).date(),
          color: element.colorCalendar,
        })

       if(index >= 1){
          Object.keys(marked).find(item => {
            if (item === markedPrefix) {
              Object.values(marked[item]).map((item =>{item.map(value=>periods.push(value))}))
            }
          })
        }
        

        marked[markedPrefix.toString()] ={
          periods
        };
        markedPrefix = moment(markedPrefix).add(1, 'days').format('YYYY-MM-DD');
      }
    });

    return marked;
  };
  return (
    <Calendar
      markingType="multi-period"
      markedDates={getMarked()}
    />
  )
}

export default CalendarScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  }

});