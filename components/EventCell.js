const React = require('react-native');
const CommonComponents = require('../common/CommonComponents');
const Icon = require('react-native-vector-icons/Ionicons');
const Colors = require('../common/Colors');
const Utils = require('../common/Utils');

const {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    } = React;

const ICON_SIZE = 12;
/** 动态的类型*/
const EVENT_TYPE_CREATED   = 0x1;// 创建了issue
const EVENT_TYPE_UPDATED   = 0x2;// 更新项目
const EVENT_TYPE_CLOSED    = 0x3;// 关闭项目
const EVENT_TYPE_REOPENED  = 0x4;// 重新打开了项目
const EVENT_TYPE_PUSHED    = 0x5;// push
const EVENT_TYPE_COMMENTED = 0x6;// 评论
const EVENT_TYPE_MERGED    = 0x7;// 合并
const EVENT_TYPE_JOINED    = 0x8; //# User joined project
const EVENT_TYPE_LEFT      = 0x9; //# User left project
const EVENT_TYPE_FORKED    = 0xb;// fork了项目

const EventCell = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired,
  },

  onPressCell() {

  },

  openAuthor() {
    let event = this.props.event;
    if (event) {
      this.props.navigator.push({id: 'personal', obj: event.author});
    }
  },

  _push(text, texts, f = false, b = false) {
    let style = {color:Colors.black};
    if(f) {
      style.color = Colors.blue;
    }
    if(b) {
      style.fontWeight = "bold";
    }
    texts.push({style: style, text: text});
  },

  __getEventsTitle(event){
    let title = "";
    if(event.events.issue) {
      title = " #" + event.events.issue.iid;
    }

    if(event.events.pull_request) {
      title = " #" + event.events.pull_request.iid;
    }

    return title;
  },

  createEventTitle() {
    var event = this.props.event;
    let fullProjectName = event.project.path_with_namespace;
    let texts = [];
    let eventTitle = "";
    this._push(event.author.name, texts, true, true);

    switch (event.action) {
      case EVENT_TYPE_CREATED://创建了issue
          this._push(" 在项目 ", texts);
          this._push(fullProjectName, texts, true);
          this._push(" 创建了 ", texts);
          this._push(event.target_type + this.__getEventsTitle(event), texts, true);
          break;
      case EVENT_TYPE_UPDATED:// 更新项目
          this._push(" 更新了项目 ", texts);
          this._push(fullProjectName, texts, true);
          break;
      case EVENT_TYPE_CLOSED:// 关闭项目
          this._push(" 关闭了项目 ", texts);
          this._push(fullProjectName, texts, true);
          this._push(" 的 ", texts);
          this._push(event.target_type + this.__getEventsTitle(event), texts, true);
          break;
      case EVENT_TYPE_REOPENED:// 重新打开了项目
          this._push(" 重新打开了项目 ", texts);
          this._push(fullProjectName, texts, true);
          this._push(" 的 ", texts);
          this._push(event.target_type + this.__getEventsTitle(event), texts, true);
          break;
      case EVENT_TYPE_PUSHED:// push
          //eventTitle = event.getData().getRef().substring(event.getData().getRef().lastIndexOf("/") + 1);
        eventTitle = event.data.ref.substring(event.data.ref.lastIndexOf("/") + 1);
          this._push(" 推送到了项目 ", texts);
          this._push(fullProjectName, texts, true);
          this._push(" 的 ", texts);
          this._push(eventTitle, texts, true);
          this._push(" 分支 ", texts);
          break;
      case EVENT_TYPE_COMMENTED:// 评论
          if(event.events.issue) {
            eventTitle = "Issue";
          } else if(event.events.pull_request) {
            eventTitle = "PullRequest";
          }

          eventTitle += this.__getEventsTitle(event);
          this._push(" 评论了项目 ", texts);
          this._push(fullProjectName, texts, true);
          this._push(" 的 ", texts);
          this._push(eventTitle, texts, true);
          break;
      case EVENT_TYPE_MERGED:// 合并
          this._push("接受了项目 ", texts);
          this._push(fullProjectName, texts, true);
          this._push(" 的 ", texts);
          this._push(event.target_type + this.__getEventsTitle(event), texts, true);
          break;
      case EVENT_TYPE_JOINED:// # User joined project
          this._push("加入了项目 ", texts);
          this._push(fullProjectName, texts, true);
          break;
      case EVENT_TYPE_LEFT:// # User left project
          this._push("离开了项目 ", texts);
          this._push(fullProjectName, texts, true);
          break;
      case EVENT_TYPE_FORKED:// fork了项目
          this._push("Fork了项目 ", texts);
          this._push(fullProjectName, texts, true);
          break;
      default:
        this._push("更新了动态：", texts);
        break;
    }

    var cp = texts.map((v, i) =>
        <Text style={[v.style]}>{v.text}</Text>
    );

    return <Text numberOfLines={0}>{cp}</Text>;
  },

  render() {
    const event = this.props.event;
    return (
        <View>
          <TouchableHighlight underlayColor={Colors.lineGray} onPress={this.onPressCell}>
            <View style={{flexDirection:"row", padding:5,}}>
              <View style={{width:40}}>
                <TouchableOpacity onPress={this.openAuthor}>
                  <Image
                    source={{uri: event.author.new_portrait}}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection:"column", padding:5,flex: 1}}>
                <View>
                  {this.createEventTitle()}
                </View>

                <View>
                  <Text style={{margin: 5,marginLeft:0}} numberOfLines={0}>分手的空间很疯狂的时刻发生谁的空间回复开始电话分手的空间很疯狂的时刻发生谁的空间回复开始电话</Text>
                </View>

                <View>
                  <Text style={styles.text_desc}>{Utils.DateUtils.formatDiff(event.created_at)}</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
          {CommonComponents.renderSepLine()}
        </View>
    )
  },
});

var styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.backGray
  },
  text: {
    color: Colors.blue,
    fontSize: 12,
    alignSelf: 'center',
  },
  text_desc: {
    color: Colors.black,
    fontSize: 12,
  },
});

module.exports = EventCell;
