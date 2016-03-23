/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const StringUtils = require('../utils/Utils').StringUtils;
const OSCService = require('../service/OSCService');
const CommonStyles = require('../common/CommonStyles');

const {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    ScrollView,
    Alert,
    } = React;

const CreateIssueComponent = React.createClass({
    PropTypes: {},
    getInitialState() {
        return {title:"", description: ""}
    },
    doSubmit() {
        if(StringUtils.isNotBlank(this.state.text) && StringUtils.isNotBlank(this.state.title)) {
            var repo = this.props.repo;
            let assignee_id = repo.owner.id;
            OSCService.pubCreateIssue(repo.id,this.state.title,this.state.description,assignee_id, "")
                .then((json) => {
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
                '输入完整的信息.'
            );
        }
    },
    onTextChange(description){
        this.setState({description:description});
    },
    onTitleChange(title){
        this.setState({title:title});
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
                    <Text style={{fontWeight:"bold",}}>{"标题"}</Text>
                </View>
                <View style={{marginTop:10}}>
                    <TextInput
                        returnKeyType={'next'}
                        defaultValue={this.state.title}
                        style = {CommonStyles.textInput}
                        placeholder={'标题'}
                        onChangeText={this.onTitleChange}
                    />
                </View>

                <View style={{flexDirection:"row",marginTop:10}}>
                    <Text style={{fontWeight:"bold",}}>{"请写下你对OSChina的意见."}</Text>
                </View>
                <View style={{marginTop:10}}>
                    <TextInput
                        autoCapitalize={'none'}
                        defaultValue={this.state.description}
                        autoCorrect={false}
                        style={[CommonStyles.textInput, {
                            height: 250,
                        }]}
                        maxLength={1024}
                        returnKeyType={'done'}
                        onChangeText={this.onTextChange}
                        onSubmitEditing={this.doLeaveMessage}
                        multiline={true}
                        placeholder={'请写下你对该项目的意见.'}
                    />
                </View>

                <TouchableHighlight style={CommonStyles.btn}
                                    onPress={this.doSubmit}
                                    underlayColor={Colors.backGray}
                                    >
                    <Text style={[{color: Colors.white, fontWeight: "bold",textAlign:"center"}]}> 发表意见 </Text>
                </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
});
module.exports = CreateIssueComponent;