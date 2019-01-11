/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import React, { PureComponent } from 'react'
import {View,TouchableOpacity,Text,Image} from 'react-native'
import { Scene, Stack, Tabs } from 'react-native-router-flux'
import { Images, Styles, Colors } from '../configs/Theme'
import Home from './Home'



export const scenes = ()=>{
    return  <Scene key="root">
        <Scene key="Home"
               component={Home}
               {...TopNav({
                   title:'首页'
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

    render() {
        const { component, title, rightTitle, onLeft } = this.props;

        let pageMsg = `在page/index查找${component && component.displayName}`;
        return <View style={Styles.navTop}>
            <TouchableOpacity
                onPress={() => {
                    onLeft ? onLeft() : router.pop()

                }}
                style={Styles.left}>
                {/*{hideLeft ? null : <Image*/}
                    {/*style={{ height: 14, width: 18 }}*/}
                    {/**/}
                     {/*/>}*/}

            </TouchableOpacity>

            <TouchableOpacity
                onLongPress={() => {
                    if (__DEV__)
                        showAlert(title, pageMsg)
                }}
                style={Styles.navTitle}>
                <Text
                    style={{ fontSize: 16 }}>{title}</Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    this.props.onRight && this.props.onRight()
                }}
                style={Styles.left}>
                {rightTitle ? <Text
                    style={{ fontSize: 14, color: Colors._02A }}>{rightTitle}</Text> : null}

            </TouchableOpacity>

        </View>
    }
}