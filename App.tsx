import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {Navigator} from './src/navigator/Navigator';
import {Tabs} from './src/navigator/Tabs';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      {/* <Navigator /> */}
      <Tabs />
    </NavigationContainer>
  );
}
export default App;
