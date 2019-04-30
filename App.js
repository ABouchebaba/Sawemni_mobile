import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import MainNavigator from './navigation/MainNavigator'
import Sentry from 'sentry-expo';
// import { SentrySeverity, SentryLog } from 'react-native-sentry';

export default class App extends React.Component {
  render() {
    return <MainNavigator />;
  }
}

Sentry.config('https://1e503bcadf7349a7a10ceea6eea1e90f@sentry.io/1447671').install();
Sentry.enableInExpoDevelopment = true
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});
