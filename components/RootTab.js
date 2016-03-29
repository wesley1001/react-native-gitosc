/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Routes = require('../components/Routes');
const Ionicons = require('react-native-vector-icons/Ionicons');
const constant = require('../config').constant;

const TabBarDic = [constant.scene.project.key, constant.scene.famous.key, constant.scene.personal.key];//
const {
    TabBarIOS
    } = React;

const RootTab = React.createClass({
    getInitialState() {
        return {
            selectedTab:TabBarDic[0],
        }
    },
    componentDidMount() {
    },
    render() {
        let cp = TabBarDic.map((v, i) => {
            let iconName = "";
            let selectedIconName = "";
            let title = "";
            if(v === constant.scene.project.key) {
                iconName = "ios-book-outline";
                selectedIconName = "ios-book";
                title = constant.scene.project.value;
            } else if(v === constant.scene.famous.key) {
                iconName = "ios-eye-outline";
                selectedIconName = "ios-eye";
                title = constant.scene.famous.value;
            } else if(v === constant.scene.personal.key) {
                iconName = "ios-person-outline";
                selectedIconName = "ios-person";
                title = constant.scene.personal.value;
            }

            return <Ionicons.TabBarItem
                key={'iconTabBarItem_' + v}
                iconName={iconName}
                selectedIconName={selectedIconName}
                title={title}
                selected={this.state.selectedTab === v}
                onPress={() => {
                    this.setState({
                      selectedTab: v,
                    });
                  }}>
                {Routes.navigator(v)}
            </Ionicons.TabBarItem>
            }
        );

        return <TabBarIOS>{cp}</TabBarIOS>
    }
});
module.exports = RootTab;