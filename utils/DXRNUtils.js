const React = require('react-native');
const Platform = require('Platform');
const _ = require('lodash');

var {
  NativeModules: {
      Utils,
  }
} = React;

var Uitls = {
  clearCookie(cb) {
    if (Platform.OS === 'android') {
      // TODO:

    } else if (Platform.OS === 'ios') {
      console.log('clear cookies');
      Utils.clearCookies((error, results) => {
        if (error) {
          console.log('clearCookie error occured' + error);
        }
      });
    }
  },

  trackClick(name, atr) {
    if (Platform.OS === 'android') {

    } else if (Platform.OS === 'ios') {
      console.log(name + ":" + atr);
      Utils.trackClick(name, atr); //TODO
    }
  },

  appInfo(cb) {
    if (Platform.OS === 'android') {
      // TODO:
    } else if (Platform.OS === 'ios') {
      Utils.appInfo((info) => {
        cb && cb(info);
      });
    }
  }
};

module.exports = Uitls;
