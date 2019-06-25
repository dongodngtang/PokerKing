/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import React, {PureComponent} from 'react'
import {View, TouchableOpacity, Text, Image, StatusBar} from 'react-native'
import {Scene, Drawer, Actions} from 'react-native-router-flux'
import {Images, Styles, Colors, px2dp, px2sp} from '../configs/Theme';
import {isStrNull} from "../utils/utils";
import Home from './Home'
import Detail from './Detail'
import Register from './Register'
import Login from './Login'
import HotNewsList from './HotNewsList'
import Races from './Races';
import RaceNew from './RaceNew';
import RaceSchedule from './RaceSchedule';
import DrawerComp from './Home/Drawer'
import CashTable from './CashTable';
import QueueProcess from './QueueProcess';
import Feedback from './Feedback';
import ModifyData from './ModifyData';
import SwitchApi from './SwitchApi';
import QueueList from './QueueList'
import InfoDetail from "./InfoDetail";
import EventDetail from "./EventDetail";
import Structure from './Structure';
import WebViewPage from "../components/WebViewPage";
import ImageGallery from "../components/ImageGallery";
import RaceMessage from "./RaceMessage";
import FAQ from "./FAQ";
import FoundBeauti from "./FoundBeauti";
import ProtocolPage from "./ProtocolPage";
import TabBarItem from "./navigation/TabBarItem";

export const scenes = () => {
    return <Scene key="root"
                  headerMode={'screen'}
                  navTransparent
                  renderLeftButton={null}
                  navigationBarStyle={{backgroundColor:'black'}}>

        <Scene key="main"
               initial
               lazy={true}
               animationEnabled={false}
               tabBarPosition={'bottom'}
               tabBarStyle={{backgroundColor:'#1A1B1F'}}
               activeTintColor={'#FFE9AD'}
               inactiveTintColor={'#736C5B'}
               labelStyle={{fontSize:px2sp(24)}}
               tabs>
            <Scene key="Home"
                   initial
                   tabBarLabel={global.lang.t('news')}
                   tabBarIcon={({focused})=>(
                       <TabBarItem
                           iconStyle={{height:px2dp(48),width:px2dp(36)}}
                           focused={focused}
                           normalImage={Images.news_gray}
                           selectedImage={Images.news}/>
                   )}
                   component={Home}
                   hideNavBar/>
            <Scene key={global.lang.t('race')}
                   component={Races}
                   tabBarIcon={({focused})=>(
                       <TabBarItem
                           iconStyle={{height:px2dp(48),width:px2dp(48)}}
                           focused={focused}
                           normalImage={Images.event_gray}
                           selectedImage={Images.event}/>
                   )}
                   hideNavBar/>
            <Scene key={global.lang.t('room')}
                   component={CashTable}
                   tabBarIcon={({focused})=>(
                       <TabBarItem
                           iconStyle={{height:px2dp(48),width:px2dp(44)}}
                           focused={focused}
                           normalImage={Images.room_gray}
                           selectedImage={Images.room}/>
                   )}
                   hideNavBar/>
            <Scene key={global.lang.t('mine')}
                   component={Races}
                   tabBarIcon={({focused})=>(
                       <TabBarItem
                           iconStyle={{height:px2dp(48),width:px2dp(48)}}
                           focused={focused}
                           normalImage={Images.mine_gray}
                           selectedImage={Images.mine}/>
                   )}
                   hideNavBar/>
        </Scene>
        



        <Scene key="Detail"
               component={Detail}
               {...TopNav({
                   title: '详情'
               })}/>
        <Scene key="Register"
               component={Register}
               {...TopNav({
                   title: '编辑资料'
               })}/>
        <Scene key="Login"
               component={Login}
               {...TopNav({
                   left_definition: true,
                   rightTitle: global.lang.t('home_language'),
                   left_img: Images.close,
                   img_size: {height: 16, width: 16},
                   title: 'PokerKingLive'
               })}/>
        <Scene key="HotNewsList"
               component={HotNewsList}
               {...TopNav({
                   title: global.lang.t('news')
               })}/>
        <Scene key="Races"
               component={Races}
               hideNavBar/>
        <Scene key="RaceNew"
               component={RaceNew}
               {...TopNav({
                   title: global.lang.t('race_news')
               })}/>
        <Scene key="RaceSchedule"
               component={RaceSchedule}
               {...TopNav({
                   title: global.lang.t('race_schedule')
               })}/>
        <Scene key="CashTable"
               component={CashTable}
               {...TopNav({
                   title: global.lang.t('cash_table')
               })}/>
        <Scene key="QueueProcess"
               component={QueueProcess}
               {...TopNav({
                   rightTitle:global.lang.t('refresh')
               })}/>
        <Scene key="Feedback"
               component={Feedback}
               {...TopNav({
                   title: global.lang.t('feedback')
               })}/>
        <Scene key="ModifyData"
               component={ModifyData}
               {...TopNav({
                   title: global.lang.t('modifyData'),
                   rightTitle: global.lang.t('save')
               })}/>
        <Scene key="SwitchApi"
               component={SwitchApi}
               {...TopNav({
                   title: '关于版本'
               })}/>
        <Scene key="QueueList"
               component={QueueList}
               {...TopNav({
                   rightTitle:global.lang.t('refresh')
               })}/>
        <Scene key="InfoDetail"
               component={InfoDetail}
               {...TopNav({
                   right_img_show: true,
                   right_img: Images.share_img,
                   right_img_size: {height: 19, width: 19}
               })}/>
        <Scene key="EventDetail"
               component={EventDetail}
               {...TopNav({
                   right_img_show: true,
                   right_img: Images.share_img,
                   right_img_size: {height: 19, width: 19}
               })}/>
        <Scene key="WebViewPage"
               component={WebViewPage}
               {...TopNav({})}/>
        <Scene key="ImageGallery"
               component={ImageGallery}
               hideNavBar/>
        <Scene key="Structure"
               component={Structure}
               {...TopNav({
                   title: global.lang.t('structure')
               })}
        />
        <Scene key="RaceMessage"
               component={RaceMessage}
               {...TopNav({
                   title: global.lang.t('race_message')
               })}
        />
        <Scene key="FAQ"
               component={FAQ}
               {...TopNav({
                   title: global.lang.t('common_problem')
               })}
        />
        <Scene key="FoundBeauti"
               component={FoundBeauti}
               {...TopNav({
                   title: global.lang.t('into_poker')
               })}
        />
        <Scene key="ProtocolPage"
               component={ProtocolPage}
               {...TopNav({
                   title: global.lang.t('protocol')
               })}
        />
    </Scene>
}
const TopNav = (props) => {

    return {
        ...props,
        navBar: NavBar
    }
};

export class NavBar extends PureComponent {

    left_img = () => {
        const {left_definition, left_img, hideLeft, img_size} = this.props;
        if (hideLeft) {
            return null;
        } else if (left_definition) {
            return <Image
                style={img_size}
                source={left_img}
            />
        } else {
            return <Image
                style={{height: 17, width: 9}}
                source={Images.left}
            />
        }
    };

    left_content = () => {
        const {rightTitle, right_img_show, right_img, right_img_size} = this.props;
        if (rightTitle) {
            return <Text
                style={{fontSize: 15, color: '#FFE9AD'}}>{rightTitle}</Text>
        } else if (right_img_show) {
            return <Image
                style={right_img_size}
                source={right_img}
            />
        }
    }

    render() {
        const {component, title, rightTitle, onLeft, hideLeft, middle_title} = this.props;

        let pageMsg = `在page/index查找${component && component.displayName}`;
        return <View style={Styles.navTop}>
            <StatusBar barStyle={'light-content'}/>
            <TouchableOpacity
                onPress={() => {
                    onLeft ? onLeft() : router.pop()

                }}
                style={Styles.left}>
                {this.left_img()}

            </TouchableOpacity>


            <TouchableOpacity
                activeOpacity={1}
                onLongPress={() => {
                    if (__DEV__)
                        // alert(title + pageMsg)
                    if (middle_title) {
                        router.toSwitchApi();
                    }
                }}
                style={Styles.navTitle}>
                <Text
                    style={{fontSize: 18, color: '#FFE9AD', alignSelf: 'center'}} numberOfLines={1}>{title}</Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    this.props.onRight && this.props.onRight()
                }}
                style={Styles.right}>
                {this.left_content()}

            </TouchableOpacity>

        </View>
    }
}