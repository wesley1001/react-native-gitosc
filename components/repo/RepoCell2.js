const React = require('react-native');
const CommonComponents = require('../../common/CommonComponents');
const Icon = require('react-native-vector-icons/Ionicons');
const Colors = require('../../common/Colors');

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

const RepoCell2 = React.createClass({
  propTypes: {
    repo: React.PropTypes.object,
  },

  onPressCell() {//打开项目详情
    let repo = this.props.repo;
    this.props.navigator.push({id: 'repo_detail', obj: repo});
  },

  openAuthor() {
    const repo = this.props.repo;
    const user = repo.owner;

    if (user) {
      this.props.navigator.push({id: 'personal', obj: user});
      //const type = user.type;
      //if (type == 'User') {
      //
      //} else {//TODO:不是用户类型的未实现
      //  Alert.alert(
      //      "Tips",
      //      '不是用户类型的视图未实现'
      //  );
      //}
    }
  },

  render() {
    const repo = this.props.repo;
    return (
      <TouchableHighlight underlayColor={Colors.lineGray} onPress={this.onPressCell}>
        <View style={styles.cellContentView}>
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
  /**
   * RepoCell2
   */
  cellContentView: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
  },
  cellUp: {
    padding: 10,
    height: 40,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.backGray
  },
  username: {
    marginLeft: 10,
    color: '#4078C0',
    fontSize: 15,
  },
  textActionContainer: {
    margin: 10,
    marginTop: 7,
    marginBottom: 10,
    marginLeft: 10,
  },
  createAt: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 11,
    color: '#BFBFBF',
  },
  textDesContainer: {
    margin: 10,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 25,
    borderStyle: 'dashed',
  },
  leftAction: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightAction: {
    padding: 3,
    backgroundColor: "white",
  },
  actionText: {
    color: Colors.textGray,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

module.exports = RepoCell2;
