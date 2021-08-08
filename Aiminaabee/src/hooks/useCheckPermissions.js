
import { check, request, RESULTS, PERMISSIONS, openSettings } from 'react-native-permissions';
import { Platform } from 'react-native';


const PLATFORM_CAMERA_PERMISSIONS = {
   ios: PERMISSIONS.IOS.CAMERA,
   android: PERMISSIONS.ANDROID.CAMERA
}

const PLATFORM_PHOTO_LIBRARY_PERMISSIONS = {
   ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
   android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
}

const PLATFORM_CONTACTS_PERMISSIONS = {
   ios: PERMISSIONS.IOS.CONTACTS,
   android: PERMISSIONS.ANDROID.READ_CONTACTS
}

const PLATFORM_LOCATION_PERMISSIONS = {
   ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
   android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
}

const REQUEST_PERMISSION_TYPE = {
   location: PLATFORM_LOCATION_PERMISSIONS,
   photoLibrary: PLATFORM_PHOTO_LIBRARY_PERMISSIONS
}

const PERMISSION_TYPE = {
   location: 'location',
   photoLibrary: 'photoLibrary'
}


export const useCheckPermissions = () => {

   requestForPermission = async (permission) => {

      try {
         const result = await request(permission);
         return result === RESULTS.GRANTED
      } catch (error) {
         // console.log('permission error', error);
         return false;
      }
   }

   checkForPermission = async (type) => {

      const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
      // console.log('requested check permission', permission);
      // console.log('requested permission type', type);

      if (permission) {

         await requestForPermission(permission);

         try {
            const result = await check(permission);
            // console.log('permission result -----', result);

            if (result === RESULTS.GRANTED) return true;
            if (result === RESULTS.DENIED) {
               await openSettings();
            }
            if (result === RESULTS.BLOCKED) {
               await openSettings();
            }

         } catch (error) {
            console.log('permission error', error);
            return false
         }
      }
   }

   return { checkForPermission, PERMISSION_TYPE }

}

