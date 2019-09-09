import React from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading, ScreenOrientation } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { device, func, gStyle } from './src/constants';
// import Amplify, { Auth } from 'aws-amplify';
// import awsmobile from './aws-exports';
// import { ApolloProvider } from 'react-apollo';
// import { Rehydrated } from 'aws-appsync-react';
// import AWSAppSyncClient from 'aws-appsync';

// navigation switch
import AppSwitchNav from './src/navigation/AppSwitchNav';

// Amplify.configure(awsmobile);

// const client = new AWSAppSyncClient({
//   url: awsmobile.aws_appsync_graphqlEndpoint,
//   region: awsmobile.aws_appsync_region,
//   disableOffline: true,
//   auth: {
//     type: awsmobile.aws_appsync_authenticationType,
//     credentials: () => Auth.currentCredentials(),
//     jwtToken: async () =>
//       (await Auth.currentSession()).getAccessToken().getJwtToken()
//   },
//   complexObjectsCredentials: () => Auth.currentCredentials()
// });

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
    <View style={gStyle.container}>
      <StatusBar barStyle={device.iOS ? 'dark-content' : 'light-content'} />
      <PaperProvider>
        <AppSwitchNav />
      </PaperProvider>
    </View>
  );
};

// <ApolloProvider client={client}>
//   <Rehydrated>
//     <PaperProvider>
//       <View style={gStyle.container}>
//         <StatusBar
//           barStyle={
//             device.OS === 'ios' ? 'dark-content' : 'light-content'
//           }
//         />

//         <AppSwitchNav />
//       </View>
//     </PaperProvider>
//   </Rehydrated>
// </ApolloProvider>

export default App;
