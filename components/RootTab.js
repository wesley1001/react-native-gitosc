/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Routes = require('../components/Routes');
const Utils = require('../utils/Utils');
const Icon = require('react-native-vector-icons/Ionicons');

const TabBarDic = ["project", "famous", "personal"];//
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
        console.log("RootTab.componentDidMount");
        if(Utils.NullUtils.isNotNull(this.props.forceSelectedTab)) {
            console.log("RootTab.componentDidMountddddd");
            this.setState({selectedTab: TabBarDic[this.props.forceSelectedTab]});
        }
    },
    render() {
        let cp = TabBarDic.map((v, i) => {
            let iconName = "";
            let selectedIconName = "";
            let title = "";
            if(v === "project") {
                iconName = "ios-flame-outline";
                selectedIconName = "ios-flame";
                title = "Project"
            } else if(v === "famous") {
                iconName = "ios-people-outline";
                selectedIconName = "ios-people";
                title = "Famous"
            } else if(v === "personal") {
                iconName = "ios-person-outline";
                selectedIconName = "ios-person";
                title = "Me"
            }

            return <Icon.TabBarItem
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
            </Icon.TabBarItem>
            }
        );

        return <TabBarIOS>{cp}</TabBarIOS>
    }
});
module.exports = RootTab;