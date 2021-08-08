import React from 'react';
import { View, Text } from 'react-native-ui-lib';

import DatePicker from 'react-native-date-picker';

interface DatePickerTypes {
  data: {
    name: string;
    value: any;
    maxDate: any;
    mode: any;
    dateFormat?: any;
    onErrors: any;
  };
  actions: {
    handleDateChange: (name: string, val: any) => void;
  };
}

export const BeeDatePicker: React.FC<DatePickerTypes> = ({ data, actions }) => {
  return (
    <View center>
      <DatePicker
        date={(data.value && new Date(data.value)) || new Date()}
        maximumDate={data.maxDate}
        onDateChange={(value) => actions.handleDateChange(data.name, value)}
        mode={data.mode}
      />
      {data.onErrors ? (
        <View style={{ marginVertical: 5, paddingLeft: 15 }}>
          <Text errorColor h1>
            {data.onErrors}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
