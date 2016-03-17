const React = require('react-native');
const CommonComponents = require('../../common/CommonComponents');
const Icon = require('react-native-vector-icons/Ionicons');
const Colors = require('../common/Colors');

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

const EventCell = React.createClass({
  propTypes: {
    repo: React.PropTypes.object,
  },

  onPressCell() {//打开项目详情
    let repo = this.props.repo;

    if (repo) {
      //repo.html = 'https://git.oschina.net//' + repo.path_with_namespace + '/blob/master/README.md';
      //repo.title = repo.name;
      //console.log('RepoCell2 repo', repo.html);
      this.props.navigator.push({id: 'repo_detail', obj: repo});
    }
  },

  openAuthor() {
    const repo = this.props.repo;
    const user = repo.owner;

    if (user) {
      const type = user.type;
      if (type == 'User') {
        this.props.navigator.push({id: 'personal', obj: user});
      } else {//TODO:不是用户类型的未实现
        Alert.alert(
            "Tips",
            '不是用户类型的视图未实现'
        );
      }
    }
  },

  render() {
    const repo = this.props.repo;
    return (
      <TouchableHighlight underlayColor={Colors.lineGray} onPress={this.onPressCell}>
        <View style={{flexDirection:"column", padding:5,}}>
          <View style={styles.cellUp}>
            <TouchableOpacity onPress={this.openAuthor}>
              <Image
                source={{uri: repo.owner.new_portrait}}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.username} onPress={this.onPressCell}>
                {repo.path_with_namespace}
              </Text>
              <Text style={styles.createAt}>{repo.language}</Text>
            </View>
            <View style={styles.leftAction}>
              <Icon
                name={'ios-star'}
                size={ICON_SIZE}
                color={Colors.textGray}
              />
              <Text style={styles.actionText}>
                {repo.stars_count}
              </Text>
            </View>
          </View>
          <Text style={styles.textActionContainer} numberOfLines={0}>
            {repo.description}
          </Text>
          {CommonComponents.renderSepLine()}
        </View>
      </TouchableHighlight>
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
    color: Colors.backGray,
    fontSize: 12,
    alignSelf: 'center',
  },
});

module.exports = EventCell;
