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
//const NavigatorNavigationBarStyle = require('./GHNavigatorBarStyle.android');
const Platform = require('Platform');
const ProjectComponent = require('./ProjectComponent');
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
        return null;
    },
    RightButton: function(route, navigator, index, navState) {
        return null;
    },
    Title: function(route, navigator, index, navState) {
        let title = route.id;
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
                        //navigationStyles={NavigatorNavigationBarStyle}
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
            case "project"://项目
                cp = <ProjectComponent />
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