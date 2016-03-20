const React = require('react-native');
const CommonComponents = require('../common/CommonComponents');
const Icon = require('react-native-vector-icons/Ionicons');
const Colors = require('../common/Colors');

const {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

const ICON_SIZE = 20;

const SettingsComponent = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
    iconName: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    settingName: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      iconName: 'ios-cog',
      iconColor: Colors.blue,
      settingName: 'Settings',
    }
  },

  render() {
    return (
      <TouchableHighlight
        underlayColor={Colors.backGray}
        style={styles.userTouch}
        onPress={this.props.onPress}
          {...this.props}
        >
        <View style={styles.user}>
          <Icon
            name={this.props.iconName}
            size={ICON_SIZE}
            style={styles.arrow}
            color={this.props.iconColor}/>
          <View style={styles.nameInfo}>
            <Text style={styles.name}>
              {this.props.settingName}
            </Text>
          </View>
          <Icon
            name='ios-arrow-right'
            size={20}
            iconStyle={styles.arrow}
            color={Colors.textGray}/>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  userTouch: {
    //marginTop: 20,
  },
  user: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#EDECF1',
  },
  nameInfo: {
    flexDirection: 'column',
    marginLeft: 0,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    color: 'black',
    fontSize: 14,
  },
  arrow: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 10,
  },
  settings: {
    height: 44,
  },
});

module.exports = SettingsComponent;
