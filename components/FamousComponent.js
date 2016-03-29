/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const GFDiskCache = require('../utils/GFDiskCache');
const OSCService = require('../service/OSCService');
const CommonComponents = require('../common/CommonComponents');
const LanguageComponent = require('../common/LanguageComponent');
const RepoCell2 = require('../components/repo/RepoCell2');
const OSCRefreshListView = require('../components/OSCRefreshListView');
var _ = require('lodash');

const {
    View,
    } = React;

const FamousComponent = React.createClass({
    PropTypes: {},
    getInitialState() {
        return {
            languageList:null,
            loadingLanguageList:true,
        }
    },
    componentWillMount() {
        OSCService.getLanguageList()
            .then(arr => {
                let languageList = arr;
                this.selectedLanguage = this._packLanguageData(languageList[0]);
                this.setState({
                    loadingLanguageList:false,
                    languageList:languageList,
                });
            })
    },
    _packLanguageData(o) {
        //优化//sum可以保存
        let sum = _.sumBy(this.state.languageList, (o) => o.projects_count);
        let label = o.name + " [" + o.projects_count + "-" + (o.projects_count / sum * 100).toFixed(2) + "%]";
        return {label:label, value : o.id};
    },

    onSelectLanguage(selectedLanguage) {
        console.log("onSelectLanguage:" + selectedLanguage);
        this.selectedLanguage = selectedLanguage;
        this._listview.forceRefresh();
    },

    reloadPath(page = 1) {
        return OSCService.getLanguageProjectList(this.selectedLanguage.value, page);
    },

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <RepoCell2 key={rowID} repo={rowData} navigator={this.props.navigator}/>
        )
    },
    render() {
        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 0;
        }
        if(this.state.loadingLanguageList) {
            return CommonComponents.renderLoadingView();
        }
        //let languageSimpleList = this.state.languageList.map((d, i) => d.name);
        let languageSimpleList = _.map(this.state.languageList, this._packLanguageData);

        return (
            <View style={{flexDirection:"column", flex:1, paddingTop:paddingTop, marginBottom: 49, backgroundColor:Colors.white}}>
                <LanguageComponent
                    onSelectLanguage={this.onSelectLanguage}
                    languageList={languageSimpleList}
                    currentLanguage={languageSimpleList[0]}
                />
                <OSCRefreshListView
                    ref={(c) => this._listview=c}
                    renderRow={this.renderRow}
                    reloadPromise={(page) => this.reloadPath(page)}
                />
            </View>
        );
    }
});
module.exports = FamousComponent;