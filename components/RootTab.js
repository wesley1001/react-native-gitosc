/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Routes = require('../components/Routes');
const Icon = require('react-native-vector-icons/Ionicons');

const TabBarDic = ["project"];
const {
    TabBarIOS
    } = React;

const RootTab = React.createClass({
    getInitialState() {
        return {
            selectedTab:TabBarDic[0],
        }
    },

    render() {
        let cp = TabBarDic.map((v, i) =>
            <Icon.TabBarItem
                key={'iconTabBarItem_' + v}
                iconName="ios-home-outline"
                selectedIconName="ios-home"
                title={v}
                selected={this.state.selectedTab === v}
                onPress={() => {
                        this.setState({
                          selectedTab: v,
                        });
                      }} >
                {Routes.navigator(v)}
            </Icon.TabBarItem>
        );

        return <TabBarIOS>{cp}</TabBarIOS>
    }
});
module.exports = RootTab;