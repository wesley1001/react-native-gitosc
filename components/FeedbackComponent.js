/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../utils/DXRNUtils');
const StringUtils = require('../utils/Utils').StringUtils;
const DateUtils = require('../utils/Utils').DateUtils;
const OSCService = require('../service/OSCService');

const {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    ScrollView,
    Alert,
    } = React;

const FeedbackComponent = React.createClass({
    PropTypes: {},
    getInitialState() {
        return {text: ""}
    },
    doLeaveMessage() {
        if(StringUtils.isNotBlank(this.state.text)) {
            OSCService.feedback("RN-OSCGIT留言反馈" + DateUtils.format(new Date()), this.state.text)
                .then((d) => {
                    Alert.alert(
                        "成功",
                        '操作成功:',
                        [
                            {text: '返回', onPress: () => {
                                this.props.navigator.pop();
                            }},
                        ]
                    );
                }).catch(err => {
                    Alert.alert(
                        "Oops",
                        '操作失败:' + err
                    );
                });
        } else {
            Alert.alert(
                "Oops",
                '请输入一些内容吧.'
            );
        }
    },
    onTextChange(text){
        this.setState({text:text});
    },
    render() {
        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 0;
        }
        return (
            <View style={{flexDirection:"column", flex:1, padding:5, paddingTop:paddingTop}}>
                <ScrollView>
                <View style={{flexDirection:"row",marginTop:10}}>
                    <Text style={{fontWeight:"bold",}}>{"请写下你对该项目的意见"}</Text>
                </View>
                <View style={{marginTop:10}}>
                    <TextInput
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        style={{
                            fontSize: 15,
                            borderWidth: 3,
                            height: 250,
                            marginTop: 5,
                            marginBottom: 10,
                            borderRadius: 4,
                            padding: 5,
                            borderColor: Colors.green,
                        }}
                        maxLength={1024}
                        returnKeyType={'done'}
                        onChangeText={this.onTextChange}
                        onSubmitEditing={this.doLeaveMessage}
                        multiline={true}
                        placeholder={'请写下你对该项目的意见.'}
                    />
                </View>

                <TouchableHighlight style={{
                                            borderWidth: 1,
                                            height: 38,
                                            marginLeft: 20,
                                            marginRight: 20,
                                            justifyContent: "center",
                                            borderColor: Colors.green,
                                            backgroundColor: Colors.green,
                                            borderRadius: 6,
                                            marginTop:40
                                        }}
                                    onPress={this.doLeaveMessage}
                                    underlayColor={Colors.backGray}
                                    >
                    <Text style={[{color: Colors.white, fontWeight: "bold",textAlign:"center"}]}> 发表意见 </Text>
                </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
});
module.exports = FeedbackComponent;