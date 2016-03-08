/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require("react-native");
const LoginComponent = require("./components/LoginComponent");

const {
    AppRegistry,
    StyleSheet,
    TabBarIOS,
    Text,
    View,
    NavigatorIOS,
    ActivityIndicatorIOS,
    } = React;


const OSCGit = React.createClass({
  render() {
    return (
      <LoginComponent />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('OSCGit', () => OSCGit);
