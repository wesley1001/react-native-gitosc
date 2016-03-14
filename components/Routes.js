/**
 * Created by rplees on 3/13/16.
 */
const React = require('react-native');
const Icon = require('react-native-vector-icons/Ionicons');
const cssVar = require('cssVar');
const Colors = require('../common/Colors');
const L = require('../common/Log');
const OSCService = require('../service/OSCService');
const Dimensions = require('Dimensions');
const DXRNUtils = require('../common/DXRNUtils');
const Platform = require('Platform');
const ProjectComponent = require('../components/ProjectComponent');
const RepoDetailComponent = require('../components/RepoDetailComponent');
const LoginComponent = require('../components/LoginComponent');

const ScreenWidth = Dimensions.get('window').width;

const {
    Navigator,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
    Text,
    TextInput,
    View,
    BackAndroid,
    } = React;

const NavigationBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        if (index === 0 || route.id === 'login') {
            return null;
        } else if(route.id == 'editprofile') {
            return (
                <TouchableOpacity onPress={route.pressCancel}>
                    <Text style={[styles.navBarText, {marginRight: 10,marginLeft:10}]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <Icon
                    name='ios-arrow-back'
                    size={30}
                    style={{marginTop: 8}}
                    color={Colors.blue}
                />
            </TouchableOpacity>
        );
    },
    RightButton: function(route, navigator, index, navState) {
        return null;
    },
    Title: function(route, navigator, index, navState) {
        let title = route.id;
        switch (route.id) {
            case "project":
                title = "Project";
                break;
            case "repo_detail":
                title = route.obj.path_with_namespace;
                break;
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
            case "project":
                cp = <ProjectComponent navigator={navigator}/>
                break;
            case "repo_detail":
                cp = <RepoDetailComponent navigator={navigator} repo={route.obj} />
                break;
            case "login":
                return (
                    <LoginComponent navigator={navigator} nextPromise={route.nextPromiseFunc} />
                )
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
});
module.exports = routes;