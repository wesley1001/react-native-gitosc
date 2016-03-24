const React = require('react-native');
const CommonComponents = require('../common/CommonComponents');
const Colors = require('../common/Colors');
const DXRNUtils = require('../utils/DXRNUtils');
const Platform = require('Platform');
var _ = require('lodash');

const {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Picker,
} = React;

const LISTVIEWREF = 'listview';
const CONTAINERREF = 'container';

const LanguageComponent = React.createClass({
  propTypes: {
    toggleOn: React.PropTypes.bool,
    languageList: React.PropTypes.array,
    onSelectLanguage: React.PropTypes.func,
    currentLanguage: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      languageList: [],
      toggleOn: false,
      currentLanguage: null,
    }
  },

  getInitialState() {
    return {
      toggleOn: this.props.toggleOn,
      currentLanguage: this.props.currentLanguage,
    }
  },

  onSelectLanguage(value) {
    DXRNUtils.trackClick('clickLan', {name: 'Explore 打开语言选择'});
    if (this.state.currentLanguage.value == value) {
      this.setState({
        toggleOn: false,
      });

      return;
    }
    var f = _.filter(this.props.languageList, (o) => o.value == value)[0];

    this.setState({
      toggleOn: false,
      currentLanguage: f,
    });
    this.props.onSelectLanguage(f);
  },

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
              {selectedLanguage.label}
            </Text>
          </TouchableOpacity>
        );
      } else {
        const pickerHeight = require('NativeModules').UIManager.RCTPicker.Constants.height;
        return (
          <View style={{height: pickerHeight}} ref={CONTAINERREF}>
            <Picker
              selectedValue={selectedLanguage.label}
              onValueChange={this.onSelectLanguage}
              mode={'dropdown'}
              >
              {this.props.languageList.map((obj, index) => {
                return (
                  <Picker.Item key={index} label={obj.label} value={obj.value}/>
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
          selectedValue={selectedLanguage.label}
          onValueChange={this.onSelectLanguage}
          mode={'dropdown'}
          style={{width: 150, alignSelf: 'center', height: 40}}
          >
          {this.props.languageList.map((obj, index) => {
            return (
                <Picker.Item key={index} label={obj.label} value={obj.value}/>
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

module.exports = LanguageComponent;