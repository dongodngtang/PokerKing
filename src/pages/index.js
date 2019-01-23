/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import React, {PureComponent} from 'react'
import {View, TouchableOpacity, Text, Image} from 'react-native'
import {Scene, Drawer, Actions} from 'react-native-router-flux'
import {Images, Styles, Colors} from '../configs/Theme';
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


export const scenes = () => {
    return <Scene key="root">
        <Drawer
            hideNavBar
            key={'HomeDrawer'}
                contentComponent={DrawerComp}
                drawerWidth={200}
                drawerPosition={'left'}>
            <Scene key="Home"
                   component={Home}
                   {...TopNav({
                       title: global.lang.t('app_name'),
                       rightTitle: global.lang.t('home_language'),
                       left_definition:true,
                       left_img:Images.homepage_side,
                       img_size:{height: 16, width: 20},
                   })}/>
        </Drawer>


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
                   left_definition:true,
                   left_img:Images.close,
                   img_size:{height: 16, width: 16},
                   title: 'Pokerkinglive'
               })}/>
        <Scene key="HotNewsList"
               component={HotNewsList}
               {...TopNav({
                   title: global.lang.t('hot_race')
               })}/>
        <Scene key="Races"
               component={Races}
               hideNavBar
               {...TopNav({
                   title: 'OPC'
               })}/>
        <Scene key="RaceNew"
               component={RaceNew}
               {...TopNav({
                   title:  global.lang.t('race_news')
               })}/>
        <Scene key="RaceSchedule"
               component={RaceSchedule}
               {...TopNav({
                   title:  global.lang.t('race_schedule')
               })}/>
    </Scene>
}
const TopNav = (props) => {

    return {
        ...props,
        navBar: NavBar
    }
};

export class NavBar extends PureComponent {

    left_img=()=>{
        const {left_definition,left_img,hideLeft,img_size} = this.props;
        if(hideLeft){
            return null;
        }else if(left_definition){
            return <Image
                style={img_size}
                source={left_img}
            />
        }else {
            return <Image
                style={{height: 14, width: 18}}
                source={Images.left}
            />
        }
    }

    render() {
        const {component, title, rightTitle, onLeft, hideLeft} = this.props;

        let pageMsg = `在page/index查找${component && component.displayName}`;
        return <View style={Styles.navTop}>
            <TouchableOpacity
                onPress={() => {
                    onLeft ? onLeft() : router.pop()

                }}
                style={Styles.left}>
                {this.left_img()}

            </TouchableOpacity>

            <TouchableOpacity
                onLongPress={() => {
                    if (__DEV__)
                        showAlert(title, pageMsg)
                }}
                style={Styles.navTitle}>
                <Text
                    style={{fontSize: 18, color: '#FFE9AD'}}>{title}</Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    this.props.onRight && this.props.onRight()
                }}
                style={Styles.right}>
                {rightTitle ? <Text
                    style={{fontSize: 14, color: '#FFE9AD'}}>{rightTitle}</Text> : null}

            </TouchableOpacity>

        </View>
    }
}