import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Base from "../Base";
import NavigationBar from "../comm/NavigationBar";
import ScrollableTab,{DefaultTabBar} from 'react-native-scrollable-tab-view'
import {getInfoList} from "../../services/accountDao";
import {isEmptyObject, logMsg, OnSafePress, shareHost, shareTo} from "../../utils/utils";
import Hot from "./Hot";
import Instants from "./Instants";
import {px2dp, px2sp} from "../../configs/Theme";
import More from "./More";
import ShareToast from "../comm/ShareToast";


@connect(({Main,Home}) => ({
    ...Main,...Home
}))
export default class Main extends Component {


    state = {
        activeTab:'热门',
        index : 0
    }

    onFetch = (page = 1, startFetch, abortFetch)=>{
        getInfoList({
            status: 'hot',
            page,
            page_size: 20
        }, data => {
            logMsg("InfoList:", data)
            startFetch(data.infos, 20)
        }, err => {
            logMsg("reject:", err)
            abortFetch()
        })
    }

    onChangeTab =({i,ref})=>{
        this.setState({
            activeTab:ref.props.tabLabel,
            index : i
        })
    }

    toDetail = (item)=> OnSafePress(()=>router.toInfoDetail(item.id))

    share = (info) => {
        let param = {
            shareLink: `${shareHost()}/infos/${info.id}`,
            shareTitle: info.title,
            shareText: info.title,
            shareImage: info.image
        };
        shareTo(param)
        logMsg('分享')

    }

    render() {
        const {shareParam} = this.props;

        return (
            <Base>
                <NavigationBar title={this.state.activeTab} index={this.state.index}/>
                <ScrollableTab
                    onChangeTab={this.onChangeTab}
                    scrollWithoutAnimation={true}
                    tabBarPosition='top'
                    tabBarTextStyle={{  fontSize: px2sp(30),fontWeight: 'bold' }}
                    tabBarInactiveTextColor={'#998E72'}
                    tabBarActiveTextColor='#FFE9AD'
                    tabBarUnderlineStyle={{ backgroundColor: '#FFE9AD', height: px2dp(2)}}
                    renderTabBar={()=><DefaultTabBar style={{borderWidth: 0}}/>}>
                    <Hot
                        onShare={this.share}
                        onPress={this.toDetail}
                        tabLabel={global.lang.t('hot')}
                        onFetch={this.onFetch}/>
                    <Instants
                        onShare={this.share}
                        onPress={this.toDetail}
                        key={'2'}
                        tabLabel={global.lang.t('instants')}
                        onFetch={this.onFetch}/>
                    <More
                        key={'3'}
                        tabLabel={`${global.lang.t('more')}>`}/>
                </ScrollableTab>

                {!isEmptyObject(shareParam) ? <ShareToast hiddenShareAction={() => {
                    this.props.dispatch({type: 'Home/closeShare'})
                }}

                                                          shareTitle={shareParam.shareTitle}
                                                          shareText={shareParam.shareText}
                                                          shareLink={shareParam.shareLink}
                                                          shareImage={shareParam.shareImage}
                                                          shareType={shareParam.shareType}/> : null}
            </Base>
        )
    }
}
