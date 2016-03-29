const React = require('react-native');
const Colors = require('./Colors');

const {
  StyleSheet,
} = React;

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowLine: {
    shadowColor: '#999999',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 1
    },
  },

  sepLine: {
    backgroundColor: Colors.backGray,
    height: 0.5,
  },

  textInput: {
    fontSize: 15,
    borderWidth: 1,
    height: 38,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 4,
    padding: 3,
    borderColor: Colors.blue,
  },
  btn: {
    borderWidth: 1,
    height: 38,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    borderColor: Colors.blue,
    backgroundColor: Colors.blue,
    borderRadius: 6,
    marginTop:40,
  }
});

module.exports = commonStyles;
