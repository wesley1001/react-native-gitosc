const React = require('react-native');
const Colors = require('./Colors');
const CommonStyles = require('./CommonStyles');
const Platform = require('Platform');
const ErrorPlacehoderComponent = require('./ErrorPlacehoderComponent');

const {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  Text,
  ProgressBarAndroid,
} = React;

class CommonComponents {
  static renderLoadingView() {
    if (Platform.OS === 'android') {
      return (
        <View style={CommonStyles.container}>
          <ProgressBarAndroid styleAttr="Inverse"/>
        </View>
      )
    } else if (Platform.OS === 'ios') {
      return (
        <View style={CommonStyles.container}>
          <ActivityIndicatorIOS size="large" />
        </View>
      );
    }
  }

  static errorPlaceholder(title,
                          desc,
                          onPress) {
    return (
      <ErrorPlacehoderComponent title={title} desc={desc} onPress={onPress} />
    )
  }

  static renderSepLine() {
    return (
      <View style={CommonStyles.sepLine} />
    )
  }

}

module.exports = CommonComponents;
