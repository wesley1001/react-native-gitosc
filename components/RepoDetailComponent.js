/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const L = require('../common/Log');
const CommonComponents = require('../common/CommonComponents');
const SettingsCell = require('../common/SettingsCell');
const OSCService = require('../service/OSCService');
const Icon = require('react-native-vector-icons/Ionicons');

const {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    ScrollView
    } = React;

const RepoDetailComponent = React.createClass({
    onFollow(){},
    star() {},
    watch() {},
    render() {
        L.info("RepoDetailComponent.render.");
        var repo = this.props.repo;

        let followBackgroundColor = '#5ca941';
        let followContentColor = 'white';
        let followAction = 'Follow';
        if (1===1) {
            followBackgroundColor = '#CECECE';
            followContentColor = Colors.black;
            followAction = 'Unfollow';
        }

        let star_lab = "[ " + repo.stars_count +" stars ]";
        let watch_lab = "[ " + repo.watches_count +" watches ]";
        let owner_lab = "拥有者 " + repo.owner.username;
        return(

            <ScrollView style={{padding: 5,flexDirection: "column", flex: 1,marginTop:64}}>
                <View style={{flexDirection: "column", justifyContent: "flex-start"}}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems:"center"}}>
                        <Image style={{width: 40, height:40,marginTop:5, borderRadius:8, backgroundColor:Colors.backGray}} source={{uri: repo.owner.new_portrait}} />
                        <Text style={{fontSize:16, fontWeight:'bold',color:Colors.black, marginLeft:10,}}>{repo.owner.name}</Text>
                    </View>

                    <Text style={{marginTop:5,fontSize:14, fontWeight:'bold',color:Colors.backGray}}>更新于
                        <Text style={{fontSize:12, color:Colors.backGray}}>{repo.last_push_at}</Text>
                    </Text>
                    <View style = {{marginTop:5}}>{CommonComponents.renderSepLine()}</View>
                    <Text style={{marginTop:5, fontSize:14, color:Colors.black}} numberOfLines={0}>
                        {repo.description}
                    </Text>
                    <View style = {{marginTop:5}}>{CommonComponents.renderSepLine()}</View>
                    <View style={{flexDirection: 'row',
                                padding: 5,
                                justifyContent: 'space-between',
                                paddingBottom: 0}}>

                        <View style={{width:150,flexDirection: "column",alignItems:"center",backgroundColor:Colors.lineGray,borderRadius:8}}>
                            <Icon.Button color={Colors.black} name="ios-clock-outline" backgroundColor={Colors.green} onPress={this.watch}>        Star               </Icon.Button>
                            <Text style={{height:20, fontSize:13}}>{star_lab}</Text>
                        </View>
                        <View style={{width:150,flexDirection: "column",alignItems:"center",backgroundColor:Colors.lineGray,borderRadius:8}}>
                        <Icon.Button color={Colors.black} name="ios-person-outline" backgroundColor={Colors.green} onPress={this.watch}>        Watch           </Icon.Button>
                            <Text style={{height:20, fontSize:13}}>{watch_lab}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column',
                                padding: 5,
                                paddingBottom: 0}}>
                        <SettingsCell
                            iconName={'ios-person'}
                            iconColor={Colors.blue}
                            settingName={owner_lab}
                            />
                        <SettingsCell
                            iconName={'ios-compose'}
                            iconColor={Colors.blue}
                            settingName={"readme"}
                        />
                        <SettingsCell
                            iconName={'university'}
                            iconColor={Colors.blue}
                            settingName={"代码"}
                        />
                        <SettingsCell
                            iconName={'share'}
                            iconColor={Colors.blue}
                            settingName={"问题"}
                        />
                        <SettingsCell
                            iconName={'rocket'}
                            iconColor={Colors.blue}
                            settingName={"提交"}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
});
module.exports = RepoDetailComponent;