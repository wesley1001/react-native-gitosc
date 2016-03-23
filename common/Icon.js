const React = require('react-native');
var _ = require('lodash');
var IconList = require('./IconList');
var Entypo = require('react-native-vector-icons/Entypo');
var EvilIcons = require('react-native-vector-icons/EvilIcons');
var FontAwesome = require('react-native-vector-icons/FontAwesome');
var Foundation = require('react-native-vector-icons/Foundation');
var Ionicons = require('react-native-vector-icons/Ionicons');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var Octicons = require('react-native-vector-icons/Octicons');
var Zocial = require('react-native-vector-icons/Zocial');

const {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
} = React;

const Icon = React.createClass({
  render() {

    const languageList = this.props.languageList;
    const selectedLanguage = this.state.currentLanguage || languageList[0];

    if (Platform.OS == 'ios') {
      if (!this.state.toggleOn) {
        return (
          <TouchableOpacity
            style={styles.chooseLan}
            onPress={() => this.setState({
              toggleOn: true,
            })}>
            <Text style={styles.lan}>
              {selectedLanguage}
            </Text>
          </TouchableOpacity>
        );
      } else {
        const pickerHeight = require('NativeModules').UIManager.RCTPicker.Constants.height;
        return (
          <View style={{height: pickerHeight}} ref={CONTAINERREF}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={this.onSelectLanguage}
              mode={'dropdown'}
              >
              {this.props.languageList.map((obj, index) => {
                return (
                  <Picker.Item key={index} label={obj} value={obj}/>
                );
              })}
            </Picker>
            <TouchableOpacity
              style={styles.chooseLan}
              onPress={() => this.setState({
                toggleOn: false,
              })}>
              <Text style={styles.lan}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (Platform.OS == 'android') {
      return (
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={this.onSelectLanguage}
          mode={'dropdown'}
          style={{width: 150, alignSelf: 'center', height: 40}}
          >
          {this.props.languageList.map((obj, index) => {
            return (
              <Picker.Item key={index} label={obj} value={obj}/>
            );
          })}
        </Picker>
      )
    }
  },
});

const ICON_SIZE = 20;
const styles = StyleSheet.create({
  cellContentView: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: 0.5,
  },
  userName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    flex: 1,
  },
  cellLeftRepoIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 8,
  },
  lan: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chooseLan: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: Colors.backGray,
  },
});

module.exports = Icon;