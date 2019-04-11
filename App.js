import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import MainNavigator from './navigation/MainNavigator'

export default class App extends React.Component {
  render() {
    return <MainNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});
