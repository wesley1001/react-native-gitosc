/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../common/DXRNUtils');
const Utils = require('../common/Utils');
const GFDiskCache = require('../common/GFDiskCache');
const OSCService = require('../service/OSCService');
const CommonComponents = require('../common/CommonComponents');
const SettingsCell = require('../common/SettingsCell');

const {
    StyleSheet,
    ActivityIndicatorIOS,
    ActionSheetIOS,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    ProgressBarAndroid,
    Image,
    ScrollView
    } = React;

const SettingComponent = React.createClass({
    PropTypes: {},
    getInitialState() {
        return {
            cachedSize:0,
            appVersion: "",
            appBuild: "",
            appStoreURL: "",
            rateURL: "",
        }
    },
    componentWillMount() {
        GFDiskCache.getDiskCacheCost((size) => {
            this.setState({
                cachedSize: size,
            });
        });

        DXRNUtils.appInfo((appInfo) => {
            this.setState({
                appVersion: appInfo.appVersion,
                appBuild: appInfo.appBuild,
                appStoreURL: appInfo.appStoreURL,
                rateURL: appInfo.rateURL,
            });
        });
    },

    onShare() {
        if (Platform.OS === 'android') {//TODO:android分享
            return;
        }

        const message = 'This Github app is awesome';
        ActionSheetIOS.showShareActionSheetWithOptions({
                message: message,
                url: 'https://appsto.re/cn/jhzxab.i',
            },
            () => {},
            () => {});
    },
    clearCache() {
        GFDiskCache.clearDiskCache((size) => {
            this.setState({
                cachedSize: size,
            })
        });
    },
    render() {
        let currentVersion = "Share this app! V: " + this.state.appVersion;
        currentVersion += ' b: ' + this.state.appBuild;

        let cachedSize = this.state.cachedSize ? this.state.cachedSize : '...';
        cachedSize = 'Clear cache, current is: ' + cachedSize;

        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 0;
        }
        return (
            <View style={{flexDirection:"column", flex:1, paddingTop:paddingTop, backgroundColor:Colors.backGray}}>
                <ScrollView>
                    <SettingsCell
                        style={{marginTop:20, marginBottom:20}}
                        iconName={'quote'}
                        iconColor={Colors.blue}
                        settingName={"摇一摇"}
                        onPress = {() => {

                            }}
                    />

                    <SettingsCell
                        iconName={'android-delete'}
                        iconColor={Colors.blue}
                        settingName={cachedSize}
                        onPress={() => {
                            this.clearCache
                          }} />

                    <SettingsCell
                        iconName={'share'}
                        iconColor={Colors.blue}
                        settingName={currentVersion}
                        onPress = {this.onShare}
                    />

                    <SettingsCell
                        iconName={'quote'}
                        iconColor={Colors.blue}
                        settingName={"意见反馈"}
                        onPress = {() => {
                                this.props.navigator.push({id: 'feedback'});
                            }}
                    />

                    <SettingsCell
                        iconName={'university'}
                        iconColor={Colors.blue}
                        settingName={"关于作者"}
                        onPress = {() => {
                                this.props.navigator.push({id: 'personal', obj: OSCService.GLOBAL_USER});
                            }}
                    />

                    <TouchableHighlight style={{
                                            borderWidth: 1,
                                            height: 38,
                                            marginLeft: 20,
                                            marginRight: 20,
                                            justifyContent: "center",
                                            borderColor: Colors.red,
                                            backgroundColor: Colors.red,
                                            borderRadius: 6,
                                            marginTop:40
                                        }}
                                        onPress={() => {
                                            OSCService.logout();
                                        }}
                                        underlayColor={Colors.backGray}
                    >
                        <Text style={[{color: Colors.white, fontWeight: "bold",textAlign:"center"}]}> 注销登陆 </Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
});
module.exports = SettingComponent;