import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images} from "../../configs/Theme";
import SearchBar from '../comm/SearchBar';
import StorageKey from "../../configs/StorageKey";
import {strNotNull} from "../../utils/utils";
import HotNewsList from "../HotNewsList";

@connect(({SearchNews}) => ({
    ...SearchNews,
}))
export default class SearchNews extends Component {

    state = {
        search: true,
        show_content: true,
        reject_problem: '',
        recordKeys: [],
        submit: false
    };

    refresh = () => {
        this.setState({
            reject_problem: ''
        });
        this.listView && this.listView.refresh();
    };


    componentDidMount() {
        this.setwords = new Set();
        this.keywords = '';
        global.storage.load({key: StorageKey.InfoSearchRecord})
            .then(ret => {
                if (ret.length > 20) {
                    ret = ret.slice(ret.length - 20)
                }
                this.setwords = new Set(ret.reverse());
                this.setState({
                    recordKeys: Array.from(this.setwords)
                })
            }).catch(err => {
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
                {this.state.search ? null : <View style={{flex: 1}}/>}
                {this.state.search ? <SearchBar
                    keyword={keyword => {
                        this.keyword = keyword;
                        this.newsList.search(this.keywords)

                    }}/> : <Text style={styles.nar_text} numberOfLines={1}>2019</Text>}
                <View style={{flex: 1}}/>
                {this.state.search ? <TouchableOpacity
                    style={[styles.btn_search2, {marginLeft: 17}]}
                    onPress={() => {
                        this.setState({
                            search: !this.state.search
                        })
                        this.keyword = undefined;
                    }}>
                    <Text style={styles.cancel_text}>{global.lang.t('cancel')}</Text>

                </TouchableOpacity> : <View style={{width:50}}/>}
            </View>
        )
    };

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

        let that = this;
        return <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 19}}>
            {this.state.recordKeys.map(function (item, index) {
                return <TouchableOpacity
                    onPress={() => {
                        that.keywords = item;
                        that.submitSearch();
                    }}
                    key={`tab${index}`}
                    style={styles.tabSearch}>
                    <Text style={styles.txtTab}>{item}</Text>

                </TouchableOpacity>
            })}

        </View>
    };

    submitSearch = () => {
        if (strNotNull(this.keywords)) {
            this.setwords.add(this.keywords);
            global.storage.save({
                key: StorageKey.InfoSearchRecord,
                rawData: Array.from(this.setwords)
            });
            this.setState({
                submit: true
            });
            if (this.newsList)
                this.newsList.search(this.keywords)
        } else {

        }

    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                {this.topBar()}
                <HotNewsList
                    ref={ref => this.newsList = ref}
                    isSearch={true}/>
                <View style={styles.viewSearch}>
                    {this.resentBlank()}
                    {/*{this.tabBlank()}*/}
                </View>
            </View>
        )
    }
}
