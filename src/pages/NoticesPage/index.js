import React, {Component} from 'react';
import {View, Text,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Images, Metrics} from "../../configs/Theme";
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import NotData from "../comm/NotData";
import TopBar from "../comm/TopBar";
import styles from './index.style'
import {logMsg} from "../../utils/utils";
import {getInfoList} from "../../services/accountDao";

@connect(({NoticesPage}) => ({
    ...NoticesPage,
}))
export default class NoticesPage extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                <View style={{width: Metrics.screenWidth, backgroundColor: "#998E72", height: 1}}/>
                <TouchableOpacity style={styles.item_view} onPress={()=>{
                    router.toInstantList();
                }}>
                    <View style={styles.img_view}>
                        <Image style={styles.notices1_img} source={Images.notices1}/>
                    </View>
                    <View style={styles.mid_view}>
                        <Text style={styles.instants_news}>{global.lang.t('instants_news')}</Text>
                        <Text style={styles.contents} numberOfLines={1}>{`2019扑克王杯 台湾站即将开赛`}</Text>
                    </View>
                    <View style={{flex:1}}/>
                    <Text style={styles.time_text}>{`2017/8/23`}</Text>
                </TouchableOpacity>
                <View style={{width:Metrics.screenWidth - 17,marginLeft:17,backgroundColor:"#998E72",height:1}}/>
                <TouchableOpacity style={styles.item_view} onPress={()=>{
                    router.toRankList();
                }}>
                    <View style={styles.img_view}>
                        <Image style={styles.notices1_img} source={Images.notices2}/>
                    </View>
                    <View style={styles.mid_view}>
                        <Text style={styles.instants_news}>{global.lang.t('rank_status')}</Text>
                        <Text style={styles.contents} numberOfLines={1}>{`2019扑克王杯 台湾站即将开赛`}</Text>
                    </View>
                    <View style={{flex:1}}/>
                    <Text style={styles.time_text}>{`2017/8/23`}</Text>
                </TouchableOpacity>
                <View style={{width:Metrics.screenWidth - 17,marginLeft:17,backgroundColor:"#998E72",height:1}}/>
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
