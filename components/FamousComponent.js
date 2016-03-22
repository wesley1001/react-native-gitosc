/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../utils/DXRNUtils');
const Utils = require('../utils/Utils');
const GFDiskCache = require('../utils/GFDiskCache');
const OSCService = require('../service/OSCService');
const CommonComponents = require('../common/CommonComponents');
const LanguageComponent = require('../common/LanguageComponent');
const RepoCell2 = require('../components/repo/RepoCell2');
const OSCRefreshListView = require('../components/OSCRefreshListView');

const {
    View,
    } = React;

const FamousComponent = React.createClass({
    PropTypes: {},
    getInitialState() {
        return {
            languageList:null,
            loadingLanguageList:true,
            selectedLanguage: "..."
        }
    },
    componentWillMount() {
        OSCService.getLanguageList()
            .then(arr => {
                let languageList = arr;
                this.setState({
                    loadingLanguageList:false,
                    languageList:languageList,
                    selectedLanguage:languageList[0].name
                });
            })
    },

    onSelectLanguage(selectedLanguage) {
        console.log("onSelectLanguage:" + selectedLanguage);
        this.setState({selectedLanguage: selectedLanguage});
        this._listview.forceRefresh();
    },

    reloadPath(page = 1) {
        let list = this.state.languageList;
        let lId;
        for(var i in list) {
            if(list[i].name === this.state.selectedLanguage) {
                lId = list[i].id;
                break;
            }
        }

        return OSCService.getLanguageProjectList(lId, page);
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
        let languageSimpleList = this.state.languageList.map((d, i) => d.name);

        return (
            <View style={{flexDirection:"column", flex:1, paddingTop:paddingTop, marginBottom: 49, backgroundColor:Colors.white}}>
                <LanguageComponent
                    onSelectLanguage={this.onSelectLanguage}
                    currentLanguage={this.state.selectedLanguage}
                    languageList={languageSimpleList}
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