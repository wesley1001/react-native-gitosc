/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const L = require('../common/Log');
const CommonComponents = require('../common/CommonComponents');
const OSCService = require('../service/OSCService');
var Icon = require('react-native-vector-icons/FontAwesome')

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
    star() {},
    watch() {},
    render() {
        L.info("RepoDetailComponent.render.");
        var repo = this.props.repo;

        let star_lab = "[ " + repo.stars_count +" stars ]";
        let watch_lab = "[ " + repo.watches_count +" watches ]";
        return(
            <ScrollView style={{flexDirection: "column", flex: 1,marginTop:64}}>
                <View style={{flexDirection: "column", justifyContent: "flex-start"}}>
                    <View style={{marginLeft:5,flexDirection: "row", justifyContent: "flex-start", alignItems:"center"}}>
                        <Image style={{width: 40, height:40,marginTop:5, borderRadius:8, backgroundColor:Colors.backGray}} source={{uri: repo.owner.new_portrait}} />
                        <Text style={{fontSize:16, fontWeight:'bold',color:Colors.black, marginLeft:10,}}>{repo.owner.name}</Text>
                    </View>

                    <Text style={{marginLeft:5,marginTop:5,fontSize:14, fontWeight:'bold',color:Colors.backGray}}>更新于
                        <Text style={{fontSize:12, color:Colors.backGray}}>{repo.last_push_at}</Text>
                    </Text>
                    <View style = {{marginLeft:5,marginTop:5}}>{CommonComponents.renderSepLine()}</View>
                    <Text style={{marginLeft:5,marginTop:5, fontSize:14, color:Colors.black}} numberOfLines={0}>
                        {repo.description}
                    </Text>

                    <View style={{marginLeft:5,marginTop:5,flexDirection: "column",flex:1}}>
                        <Icon.Button style = {{flex:1}} name="Star" backgroundColor="#3b5998" onPress={this.star}>{star_lab}</Icon.Button>
                        <Icon.Button style = {{flex:3}} name="Watch" backgroundColor="#3b5998" onPress={this.watch}>{watch_lab}</Icon.Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
});
module.exports = RepoDetailComponent;