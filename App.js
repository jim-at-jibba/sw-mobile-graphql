import React from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading, ScreenOrientation } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { device, func, gStyle } from './src/constants';
import ContextProvider from './src/globalState/state';
// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloProvider } from 'react-apollo';

// navigation switch
import AppSwitchNav from './src/navigation/AppSwitchNav';

// const endpoint =
//   'https://api-euwest.graphcms.com/v1/cjslz44sv104v01fjsp2cr414/master';

// const client = new ApolloClient({
//   link: new HttpLink({ uri: endpoint }),
//   cache: new InMemoryCache()
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
        <ContextProvider>
          <AppSwitchNav />
        </ContextProvider>
      </PaperProvider>
    </View>
  );
};

// <ApolloProvider client={client}>
//  <AppSwitchNav />
// </ApolloProvider>

export default App;
