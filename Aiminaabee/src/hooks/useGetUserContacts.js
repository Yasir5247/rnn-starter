
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';


export const useGetUserContacts = () => {

   const requestContactPermission = async () => {

      const isPermission = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
         {
            'title': 'Contacts',
            'message': 'This app would like to view your contacts.',
            'buttonPositive': 'Please accept bare mortal'
         }
      );

      console.log('response-ff', isPermission);
      return isPermission;
   }

   const contacts = async () => {

      const isPermission = await requestContactPermission();

      console.log('isPermission', isPermission);

      if (isPermission !== 'denied') {
         Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
               console.log('error', err);
            } else {
               console.log('contacts', contacts);
               return contacts
            }
         })
      }
   }

   return { getContacts: contacts }

}