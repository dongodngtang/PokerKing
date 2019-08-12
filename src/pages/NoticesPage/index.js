import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Images, Metrics} from "../../configs/Theme";
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import NotData from "../comm/NotData";
import TopBar from "../comm/TopBar";
import styles from './index.style'
import {isEmptyObject, isStrNull, logMsg, utcDate} from "../../utils/utils";
import {getNotices} from "../../services/accountDao";

@connect(({NoticesPage}) => ({
    ...NoticesPage,
}))
export default class NoticesPage extends Component {

    state = {
        notices: {}
    }


    componentDidMount() {
        getNotices(data => {
            logMsg("notices", data)
            this.setState({
                notices: data
            })
        })
    }

    _date=(type)=>{
        if(isEmptyObject(type) || isEmptyObject(type[0])){
            return ''
        }else if(isStrNull(type[0].created_at)){
            return ''
        }else{
            return utcDate(type[0].created_at, 'YYYY/MM/DD')
        }
    }

    _content=(type)=>{
        if(isEmptyObject(type) || isEmptyObject(type[0])){
            return ''
        }else if(isStrNull(type[0].content)){
            return ''
        }else{
            return type[0].content
        }
    }

    render() {
        const {applies,events} = this.state.notices
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                <View style={{width: Metrics.screenWidth, backgroundColor: "#998E72", height: 1}}/>
                <TouchableOpacity style={styles.item_view} onPress={() => {
                    router.toInstantList(applies);
                }}>
                    <View style={styles.img_view}>
                        <Image style={styles.notices1_img} source={Images.notices1}/>
                    </View>
                    <View style={styles.mid_view}>
                        <Text style={styles.instants_news}>{global.lang.t('instants_news')}</Text>
                        <Text style={styles.contents} numberOfLines={1}>{this._content(applies)}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <Text style={styles.time_text}>{this._date(applies)}</Text>
                </TouchableOpacity>
                <View style={{width: Metrics.screenWidth - 17, marginLeft: 17, backgroundColor: "#998E72", height: 1}}/>
                <TouchableOpacity style={styles.item_view} onPress={() => {
                    router.toRankList(events);
                }}>
                    <View style={styles.img_view}>
                        <Image style={styles.notices1_img} source={Images.notices2}/>
                    </View>
                    <View style={styles.mid_view}>
                        <Text style={styles.instants_news}>{global.lang.t('rank_status')}</Text>
                        <Text style={styles.contents} numberOfLines={1}>{this._content(events)}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <Text style={styles.time_text}>{this._date(events)}</Text>
                </TouchableOpacity>
                <View style={{width: Metrics.screenWidth - 17, marginLeft: 17, backgroundColor: "#998E72", height: 1}}/>
                {/*<UltimateFlatList*/}
                {/*ref={(ref) => this.listView = ref}*/}
                {/*onFetch={this.onFetch}*/}
                {/*separator={this._separator}*/}
                {/*keyExtractor={(item, index) => `notices${index}`}*/}
                {/*item={this._renderItem}*/}
                {/*refreshableTitlePull={global.lang.t('pull_refresh')}*/}
                {/*refreshableTitleRelease={global.lang.t('release_refresh')}*/}
                {/*dateTitle={global.lang.t('last_refresh')}*/}
                {/*allLoadedText={global.lang.t('no_more')}*/}
                {/*waitingSpinnerText={global.lang.t('loading')}*/}
                {/*emptyView={() => <NotData/>}*/}
                {/*/>*/}
            </View>
        )
    }

}
