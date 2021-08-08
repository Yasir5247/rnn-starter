import React from 'react';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from '@apollo/client';

import { client } from './apollo';

export const withClient = (C: NavigationFunctionComponent) => {
   return (props: NavigationComponentProps): React.ReactElement => {
      return (
         <ApolloProvider client={client}>
            <PaperProvider>
               <C {...props} />
            </PaperProvider>
         </ApolloProvider>
      );
   };
};
