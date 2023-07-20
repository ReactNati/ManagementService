// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import Input from './Input';
// //import {useCalendarPermissions,PermissionStatus} from 'expo-calendar';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import {LocaleConfig} from 'react-native-calendars';

// LocaleConfig.locales['fr'] = {
//   monthNames: [
//     'Janvier',
//     'Février',
//     'Mars',
//     'Avril',
//     'Mai',
//     'Juin',
//     'Juillet',
//     'Août',
//     'Septembre',
//     'Octobre',
//     'Novembre',
//     'Décembre'
//   ],
//   monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
//   dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
//   dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
//   today: "Aujourd'hui"
// };
// LocaleConfig.defaultLocale = 'fr';

// function CalendarPicker() {

//    // const [calendarPermissionInformation, requestPermission] = useCalendarPermissions();

//     // async function verifyPermission() {
//     //     if (calendarPermissionInformation.status === PermissionStatus.UNDETERMINED) {
//     //         const permissionResponse = await requestPermission()
//     //         return permissionResponse.granted;
//     //     }
//     //     if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
//     //         Alert.alert(
//     //             'insuffiecent permission',
//     //             'You need to grant calendar permission to use the app'
//     //         )
//     //         return false;
//     //     }
//     //     return true;

//     // }
//     // async function takeCalendarhandler() {
//     //     const hasPermission = verifyPermission();
//     //     if (!hasPermission) {
//     //         return;
//     //     }
//     //     // const getDate = await launchCameraAsync({
//     //     //     allowsEditing: true,
//     //     //     aspect: [16, 9],
//     //     //     quality: 0.5
//     //     // })
//     //     //setPickedImage(takePhoto.assets[0].uri);
//     //    // takeImageForm(takePhoto.assets[0].uri)
//     //     //console.log(takePhoto)
//     // }
//     return (
//         <Calendar />
//     )
// }

// export default CalendarPicker;