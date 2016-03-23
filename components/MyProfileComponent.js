/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DateUtils = require('../utils/Utils').DateUtils;
const OSCService = require('../service/OSCService');
const CommonStyles = require('../common/CommonStyles');

const {
    View,
    Text,
    TouchableHighlight,
    Image,
    ScrollView
    } = React;

const LoginComponent = React.createClass({
    PropTypes: {},
    render() {
        let user = OSCService.GLOBAL_USER;
        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 0;
        }
        return (
            <View style={{flexDirection:"column", flex:1, padding:5, paddingTop:paddingTop, backgroundColor:Colors.backGray}}>
                <ScrollView>
                <View style={{flexDirection:"row",marginTop:10}}>
                    <View style={{width:40}}><Image
                        source={{uri: user.new_portrait}}
                        style={{width:40, height:40,borderRadius: 8,
                                backgroundColor: Colors.backGray}}
                    /></View>
                    <View style={{marginLeft:10,paddingTop:10,}}><Text>{user.name}</Text></View>
                </View>

                <View style={{flexDirection:"column",backgroundColor:Colors.white, marginTop:20,borderRadius: 6}}>
                    <View style={{marginLeft:20, margin:5}}><Text>{"Following : " + user.follow.following}</Text></View>
                    <View style={{marginLeft:20, margin:5}}><Text>{"Followers : " + user.follow.followers}</Text></View>
                    <View style={{marginLeft:20, margin:5}}><Text>{"Stared : " + user.follow.starred}</Text></View>
                    <View style={{marginLeft:20, margin:5}}><Text>{"Watched : " + user.follow.watched}</Text></View>
                </View>

                <View style={{flexDirection:"column",backgroundColor:Colors.white, marginTop:20,borderRadius: 6}}>
                    <View style={{marginLeft:20, margin:5}}><Text>{"加入时间 : " + DateUtils.formatDate(user.created_at, "yyyy-MM-dd")}</Text></View>
                    <View style={{marginLeft:20, margin:5}}><Text>{"微博 : " + (user.weibo? user.weibo : '')}</Text></View>
                    <View style={{marginLeft:20, margin:5}}><Text>{"博客 : " + (user.blog? user.blog : '')}</Text></View>
                </View>

                <TouchableHighlight style={[CommonStyles.btn, {backgroundColor:Colors.red,borderColor:Colors.red}]}
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
module.exports = LoginComponent;