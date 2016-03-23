const React = require('react-native');
const CommonComponents = require('../../common/CommonComponents');
const FontAwesome = require('react-native-vector-icons/FontAwesome');
const Colors = require('../../common/Colors');
const Dimensions = require('Dimensions');
const DateUtils = require('../../utils/Utils').DateUtils;

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
    this.props.navigator.push({id: 'personal', obj: user});
  },

  render() {
    const repo = this.props.repo;
    return (
      <TouchableHighlight underlayColor={Colors.lineGray} onPress={this.onPressCell}>
        <View style={{flexDirection: 'column',flex: 1,}}>
          <View style={styles.cellUp}>
            <TouchableOpacity onPress={this.openAuthor}>
              <Image
                source={{uri: repo.owner.new_portrait}}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'column', }}>
              <View style={{flexDirection:"row",  justifyContent: 'center', justifyContent: 'space-between', width:320}}>
                <View>
                  <Text style={styles.username} onPress={this.onPressCell}>
                    {repo.path_with_namespace}
                  </Text>
                </View>
                <View style={{flexDirection:"row",padding:4, justifyContent: 'center'}}>
                  <FontAwesome
                      name={'clock-o'}
                      size={10}
                      style={{marginTop:1}}
                      color={Colors.textGray}
                  />
                  <Text style={styles.createAt}>
                    {DateUtils.formatDiff(repo.last_push_at? repo.last_push_at : repo.created_at)}
                  </Text>
                </View>

              </View>

              <View style={{padding:5, flexDirection:"row"}}>
                <View style={{flexDirection:"row", paddingLeft:10}}>
                  <FontAwesome
                      name={"tag"}
                      size={10}
                      style={{marginTop:1}}
                      color={Colors.black}/>
                  <Text style={styles.createAt}>{repo.language}</Text>
                </View>
                <View style={{flexDirection:"row", paddingLeft:10}}>
                  <FontAwesome
                      name={"code-fork"}
                      size={10}
                      style={{marginTop:1}}
                      color={Colors.black}/>
                  <Text style={styles.createAt}>{repo.forks_count}</Text>
                </View>
                <View style={{flexDirection:"row", paddingLeft:10}}>
                  <FontAwesome
                      name={"star"}
                      size={10}
                      style={{marginTop:1}}
                      color={Colors.black}/>
                  <Text style={styles.createAt}>{repo.stars_count}</Text>
                </View>
                <View style={{flexDirection:"row", paddingLeft:10}}>
                  <FontAwesome
                      name={"eye"}
                      size={10}
                      style={{marginTop:1}}
                      color={Colors.black}/>
                  <Text style={styles.createAt}>{repo.watches_count}</Text>
                </View>

              </View>
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
    marginLeft: 4,
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

  rightAction: {
    padding: 3,
    backgroundColor: "white",
  },
});

module.exports = RepoCell2;
