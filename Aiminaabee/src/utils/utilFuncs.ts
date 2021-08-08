
export const stringCutter = (str: string, length: number, ending?: string) => {

      if (length == null) {
            length = length;
      }
      if (ending == null) {
            ending = ' ...';
      }
      if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
      } else {
            return str;
      }
}

export function isEmpty(obj: {}) {
      for (var key in obj) {
            if (obj.hasOwnProperty(key))
                  return false;
      }
      return true;
}

export function isValidEmail(email: string) {
      return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
}