import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './index.style'
import {Images} from "../../../configs/Theme";
import SearchBar from '../../comm/SearchBar';
import {logMsg} from "../../../utils/utils";
import SearchResultList from "./SearchResultList";
import {historySearch, removeHistorySearch} from "../../../services/raceDao";


export default class SearchNews extends Component {

    state = {
        recordKeys: [],
        hideHistory: false
    }


    componentDidMount() {
        historySearch(data => {
            if (data && data.history) {
                this.setState({
                    recordKeys: data.history
                })
            }
        })
    }


    topBar = () => {
        return (
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.btn_search}
                    onPress={() => {
                        router.pop()
                    }}>

                    <Image
                        style={{height: 19, width: 11, marginLeft: 17, marginRight: 17}}
                        source={Images.left}/>

                </TouchableOpacity>
                <SearchBar
                    ref={ref => this.searchBar = ref}
                    keyword={keyword => {
                        this.searchByKeyword(keyword)
                    }}/>
                {this.state.hideHistory? <TouchableOpacity
                    style={[styles.btn_search2, {marginLeft: 17}]}
                    onPress={this.clearInput}>
                    <Text style={styles.cancel_text}>{global.lang.t('cancel')}</Text>

                </TouchableOpacity>:<View style={[styles.btn_search2, {marginLeft: 17}]}/>}

            </View>
        )
    };

    clearInput = ()=>{
        this.searchBar && this.searchBar.clearInput()
        this.keyword = '';
        this.setState({
            hideHistory: false
        })
    }

    searchByKeyword = (keyword) => {
        this.setState({
            hideHistory: keyword && keyword.length > 0
        })
        this.searchList && this.searchList.search({keyword})
    }

    resentBlank = () => {
        return <View style={styles.resent}>
            <Text style={styles.txtRecent}>{global.lang.t('recent_search')}</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                onPress={() => {
                    this.clearInput()
                    removeHistorySearch(data => {
                        this.setState({
                            recordKeys: []
                        })
                    })

                }}
                style={styles.btnDel}>
                <Image style={styles.imgDel}
                       source={Images.delete2}/>

            </TouchableOpacity>

        </View>
    };

    tabBlank = () => {

        return <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 19}}>
            {this.state.recordKeys && this.state.recordKeys.map((item, index)=> {
                return <TouchableOpacity
                    onPress={() => {
                        this.searchByKeyword(item)
                    }}
                    key={`tab${index}`}
                    style={styles.tabSearch}>
                    <Text style={styles.txtTab}>{item}</Text>

                </TouchableOpacity>
            })}

        </View>
    };


    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                {this.topBar()}

                {this.state.hideHistory ? null : <View style={styles.viewSearch}>
                    {this.resentBlank()}
                    {this.tabBlank()}
                </View>}

                <SearchResultList ref={ref => this.searchList = ref}/>
            </View>
        )
    }
}