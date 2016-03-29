/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const CommonComponents = require('../common/CommonComponents');
const OSCService = require('../service/OSCService');
const ScrollableTabView = require('react-native-scrollable-tab-view');
const PersonalProjectComponent = require('./PersonalProjectComponent');
const PersonalStarComponent = require('./PersonalStarComponent');
const PersonalEventComponent = require('./PersonalEventComponent');
const PersonalWatchComponent = require('./PersonalWatchComponent');

const {
    View,
    } = React;

/**
 * 用户的UI
 */
const PersonalComponent = React.createClass({
    getInitialState() {
        return {user: {}}
    },
    componentWillMount() {
        if(!this.props.obj) {
            const promiseFunc = (() => {
                OSCService.getUserFromCache()
                .then((u) => {
                    this.setState({user: u});
                });
            });
            OSCService.checkNeedLoginWithPromise(promiseFunc, this.props.navigator);
        } else {
            this.setState({user:this.props.obj});
        }
    },

    render() {
        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 0;
        }

        if(this.state.user && this.state.user.id) {
            return (
                <View style={{backgroundColor: Colors.white, paddingTop: paddingTop, flex:1, marginBottom: 49,}}>
                    <ScrollableTabView>
                        <PersonalEventComponent tabLabel="动态" uId={this.state.user.id} navigator={this.props.navigator}/>
                        <PersonalProjectComponent tabLabel="项目" uId={this.state.user.id} navigator={this.props.navigator}/>
                        <PersonalStarComponent tabLabel="Star" uId={this.state.user.id} navigator={this.props.navigator}/>
                        <PersonalWatchComponent tabLabel="Watch" uId={this.state.user.id} navigator={this.props.navigator}/>
                    </ScrollableTabView>
                </View>
            );
        } else {
            return CommonComponents.renderLoadingView();
        }

    }
});
module.exports = PersonalComponent;