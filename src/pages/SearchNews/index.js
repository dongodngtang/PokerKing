import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images} from "../../configs/Theme";
import SearchBar from '../comm/SearchBar';
import StorageKey from "../../configs/StorageKey";
import {logMsg, strNotNull} from "../../utils/utils";
import SearchResultList from "./SearchResultList";



@connect(({SearchNews}) => ({
    ...SearchNews,
}))
export default class SearchNews extends Component {


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
                        logMsg("书里看到", keyword)
                        this.searchByKeyword(keyword)
                    }}/>

                <TouchableOpacity
                    style={[styles.btn_search2, {marginLeft: 17}]}
                    onPress={() => {
                        this.searchBar && this.searchBar.clearInput()
                        this.keyword = '';
                    }}>
                    <Text style={styles.cancel_text}>{global.lang.t('cancel')}</Text>

                </TouchableOpacity>
            </View>
        )
    };

    searchByKeyword = (keyword) => {
        this.searchList && this.searchList.search({keyword})
    }

    resentBlank = () => {
        return <View style={styles.resent}>
            <Text style={styles.txtRecent}>{global.lang.t('recent_search')}</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                onPress={() => {
                    this.setwords.clear();
                    this.setState({
                        recordKeys: []
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
            {this.state.recordKeys.map(function (item, index) {
                return <TouchableOpacity
                    onPress={() => {

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

                {/*<View style={styles.viewSearch}>*/}
                    {/*{this.resentBlank()}*/}
                {/*</View>*/}
                <SearchResultList ref={ref=>this.searchList = ref}/>
            </View>
        )
    }
}
