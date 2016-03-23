/**
 * Created by rplees on 3/13/16.
 */
const React = require('react-native');
const FontAwesome = require('react-native-vector-icons/FontAwesome');
const cssVar = require('cssVar');
const Colors = require('../common/Colors');
const L = require('../utils/Log');
const OSCService = require('../service/OSCService');
const Dimensions = require('Dimensions');
const DXRNUtils = require('../utils/DXRNUtils');
const Platform = require('Platform');
const ProjectComponent = require('../components/ProjectComponent');
const RepoDetailComponent = require('../components/repo/RepoDetailComponent');
const LoginComponent = require('../components/LoginComponent');
const WebComponent = require('../components/WebComponent');
const PersonalComponent = require('../components/PersonalComponent');
const MyProfileComponent = require('../components/MyProfileComponent');
const SettingsComponent = require('../components/SettingsComponent');
const FeedbackComponent = require('../components/FeedbackComponent');
const ShakeComponent = require('../components/ShakeComponent');
const FamousComponent = require('../components/FamousComponent');
const CreateIssueComponent = require('../components/CreateIssueComponent');
const SearchComponent = require('../components/SearchComponent');
const ScreenWidth = Dimensions.get('window').width;
const {
    Navigator,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
    Text,
    TextInput,
    View,
    Image,
    BackAndroid,
    ActionSheetIOS,
    } = React;

const NavigationBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        L.debug("index:{}", index);

        if (index === 0 || route.id === 'login') {

            if (route.id === "personal") {
                if(!route.obj || OSCService.isSelf(route.obj.id)) {//自己的账号
                    return (
                        <TouchableOpacity underlayColor={Colors.lineGray}
                                          style={{marginTop: 8,marginLeft:10}}
                                          onPress={() => {
                                            navigator.push({id: 'my_profile'});
                                          }}>
                            <Image
                                source={{uri: OSCService.GLOBAL_USER.new_portrait}}
                                style={{width: 30,
                                        height: 30,
                                        borderRadius: 12,}}
                            />
                        </TouchableOpacity>)
                }
            }

            return null;
        }

        //let routes = navigator.getCurrentRoutes();
        //let preTitleCcp;
        //
        //if(routes && routes.length > 0) {
        //    preTitleCcp = <Text>{this._getTitle(routes[routes.length - 1])}</Text>
        //}
        // {preTitleCcp}
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <FontAwesome
                    name='angle-left'
                    size={30}
                    style={{marginTop: 8}}
                    color={Colors.blue}
                />

            </TouchableOpacity>
        );
    },
    RightButton: function(route, navigator, index, navState) {
        if(route.id === "web") {
            if(route.obj.t === "issues") {
               return(
                <TouchableOpacity underlayColor={Colors.lineGray} style={ {marginTop: 8,marginRight: 10}}
                                  onPress={ () => {
                                    navigator.push({id: 'create_issue', obj: route.obj.data,});
                                }
                }>
                    <FontAwesome
                        name={'plus-circle'}
                        size={20}
                        color={Colors.black}
                    />
                </TouchableOpacity>)
            }
        } else if(route.id === "personal") {
            if(!route.obj || OSCService.isSelf(route.obj.id)) {//自己的账号
                return(
                    <TouchableOpacity underlayColor={Colors.lineGray}
                                      style={{marginTop: 8,marginRight: 10}}
                                      onPress={() => {
                                        navigator.push({id: 'settings', obj: route.obj});
                                      }}>
                        <FontAwesome
                            name={'gear'}
                            size={20}
                            color={Colors.black}
                        />
                    </TouchableOpacity>)
            }
        } else if(route.id === "repo_detail") {//分享
           return (<TouchableOpacity underlayColor={Colors.lineGray}
                              style={{marginTop: 8,marginRight: 10}}
                              onPress={() => {
                                var message = '[OSC GIT 分享] 项目' + route.obj.path_with_namespace;
                                ActionSheetIOS.showShareActionSheetWithOptions({
                                        message: message,
                                        url: 'https://git.oschina.net/' + route.obj.path_with_namespace,
                                    },
                                    function() {},
                                    function() {});
                              }}>
                            <Text style={{fontWeight:"bold", fontSize:13}}>. . .</Text>
            </TouchableOpacity>);
        } else if(route.id === "project") {
            return(
                <TouchableOpacity underlayColor={Colors.lineGray}
                                  style={{marginTop: 8,marginRight: 10}}
                                  onPress={() => {
                                    navigator.push({id: 'search'});
                                  }}>
                    <FontAwesome
                        name={'search'}
                        size={20}
                        color={Colors.black}
                    />
                </TouchableOpacity>)
        }
        return null;
    },

    _getTitle(route) {
        let title = route.id;
        switch (route.id) {
            case "search":
                title = "搜索项目";
                break;
            case "create_issue":
                title = "创建Issue";
                break;
            case "famous":
                title = "Famous";
                break;
            case "shake":
                title = "摇一摇";
                break;
            case "feedback":
                title = "意见反馈";
                break;
            case "settings":
                title = "设置";
                break;
            case "my_profile":
                title = "我的资料";
                break;
            case "personal":
                title = "Me";
                if(route.obj && route.obj.name) {
                    title = route.obj.name;
                }
                break;
            case "project":
                title = "Project";
                break;
            case "repo_detail":
                title = route.obj.path_with_namespace;
                break;
            case "web":
                title = route.obj.title ? route.obj.title : "web";
                break;
        }
        return title;
    },
    Title: function(route, navigator, index, navState) {
        let title = this._getTitle(route);
        let searchPlaceholder = "Search users, repos.";
        if(route.id === "famous") {
            return <TouchableOpacity
                style={[styles.searchBar, {justifyContent: 'center'}]}
                onPress={() => {
                     navigator.push({id: 'search'});
                }}>
                <FontAwesome
                    name={'search'}
                    size={20}
                    style={styles.searchIcon}
                    color={Colors.black}
                />
                <Text style={[styles.textInput, {alignSelf: 'center', flex: 0}]}>
                    {searchPlaceholder}
                </Text>
            </TouchableOpacity>
        } else if(route.id === "search") {

            let fontSize = 14;
            if (Platform.OS == 'android') {
                fontSize = 12;
            }
            return (
                <View style={[styles.searchBar, {width: ScreenWidth - 40, marginLeft: 40}]}>
                    <FontAwesome
                        name={'search'}
                        size={20}
                        style={styles.searchIcon}
                        color={Colors.black}
                    />
                    <TextInput
                        style={[styles.textInput, {fontSize: fontSize}]}
                        placeholder={searchPlaceholder}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        returnKeyType={'search'}
                        autoFocus={true}
                        blurOnSubmit={true}
                        onChangeText={route.sp.onChangeText}
                        onSubmitEditing={route.sp.onSubmitEditing}
                        clearButtonMode={'while-editing'}
                    />
                </View>
            )
        }
        return (
            <Text style={[styles.navBarText,
                      styles.navBarTitleText,
                      {width: 250, height: 40, textAlign: 'center',textAlignVertical:"center"}]}
                    numberOfLines={1}>
                {title}
            </Text>
        );
    }
}

const routes = {
    dic() {
        return ["project"];
    },
    navigator(initialRoute) {
        return (
            <Navigator
                initialRoute = {{id: initialRoute}}
                renderScene = {this.renderScene}
                configureScene = {(route) => {
                    if(route.sceneConfig) {
                        return route.sceneConfig;
                    }

                    return Navigator.SceneConfigs.FloatFromRight;
                }}

                navigationBar = {
                   <Navigator.NavigationBar
						routeMapper={NavigationBarRouteMapper}
						style={styles.navBar}
					/>
                }
                />
        );
    },

    renderScene(route, navigator) {
        DXRNUtils.trackClick('渲染显示的页面' + route.id, {});
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        });

        let cp;
        switch (route.id) {
            case "search":
                cp = <SearchComponent navigator={navigator} route={route}/>
                break;
            case "create_issue":
                cp = <CreateIssueComponent navigator={navigator} repo={route.obj}/>
                break;
            case "famous":
                cp = <FamousComponent navigator={navigator}/>
                break;
            case "shake":
                cp = <ShakeComponent navigator={navigator}/>
                break;
            case "feedback":
                cp = <FeedbackComponent navigator={navigator}/>
                break;
            case "settings":
                cp = <SettingsComponent navigator={navigator}/>
                break;
            case "my_profile":
                cp = <MyProfileComponent navigator={navigator}/>
                break;
            case "personal":
                cp = <PersonalComponent navigator={navigator} obj={route.obj} />
                break;
            case "project":
                cp = <ProjectComponent navigator={navigator}/>
                break;
            case "repo_detail":
                cp = <RepoDetailComponent navigator={navigator} repo={route.obj} />
                break;
            case "login":
                cp = <LoginComponent navigator={navigator} nextPromise={route.nextPromiseFunc} />
                break;
            case "web":
                cp =   <WebComponent
                        webURL={route.obj.html}
                        param={route.obj}
                        navigator={navigator}
                        route={route}/>
                break;
        }

        return cp;
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'white',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 0.5,
    },
    navBarLeftButton: {
        paddingLeft: 10,
        width: 40,
        height: 40,
    },
    navBarText: {
        fontSize: 16,
        marginVertical:10,
    },
    navBarTitleText: {
        color: cssVar('fbui-bluegray-60'),
        fontWeight:"bold",
        marginVertical:10,
    },
    searchBar: {
        padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: ScreenWidth - 10,
        height: 35,
        // borderWidth: 1,
        // borderColor: Colors.borderColor,
        borderRadius: 4,
        margin: 5,
        backgroundColor: Colors.backGray,
    },
    searchIcon: {
        marginLeft: 3,
        marginRight: 3,
        width: 20,
        height: 20
    },
    textInput: {
        fontSize: 14,
        alignSelf: 'stretch',
        flex: 1,
        color: Colors.black,
    },
});
module.exports = routes;