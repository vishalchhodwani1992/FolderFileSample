/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RootContainer from './src/components/RootContainer';
import { LogBox } from 'react-native';

function App() {

  return <RootContainer />
}

LogBox.ignoreAllLogs(true);


export default App;