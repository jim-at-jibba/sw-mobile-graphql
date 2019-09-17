import React from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading, ScreenOrientation } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import awsmobile from './aws-exports';
import ContextProvider from './src/globalState/state';
import { device, func, gStyle } from './src/constants';

// navigation switch
import AppSwitchNav from './src/navigation/AppSwitchNav';

Amplify.configure(awsmobile);

const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  disableOffline: true,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    apiKey: awsmobile.aws_appsync_apiKey
  }
});

const App = () => {
  const [isLoading, setLoading] = React.useState(true);

  if (isLoading) {
    return (
      <AppLoading
        onFinish={() => setLoading(false)}
        startAsync={func.loadAssetsAsync}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Rehydrated>
          <View style={gStyle.container}>
            <StatusBar
              barStyle={device.iOS ? 'dark-content' : 'light-content'}
            />
            <PaperProvider>
              <ContextProvider>
                <AppSwitchNav />
              </ContextProvider>
            </PaperProvider>
          </View>
        </Rehydrated>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

// <ApolloProvider client={client}>
//  <AppSwitchNav />
// </ApolloProvider>

{
  /* <ApolloProvider client={client}>
  <ApolloHooksProvider client={client}>
    <Rehydrated>

        <PaperProvider theme={paperTheme}>
          <View style={gStyle.container}>
            <StatusBar
              barStyle={
                Platform.OS === 'ios' ? 'dark-content' : 'light-content'
              }
            />

            <ContextProvider>
              <AppSwitchNav />
            </ContextProvider>
          </View>
        </PaperProvider>
    </Rehydrated>
  </ApolloHooksProvider>
</ApolloProvider>; */
}

export default App;
