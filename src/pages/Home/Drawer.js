/**
 *作者：lorne
 *时间：2019/1/23
 *功能：
 */

import React, {Component} from 'react'
import {Button, Text, SafeAreaView} from 'react-native'
import {Actions} from 'react-native-router-flux'
export default class Drawer extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Text>
                    Drawer 容器
                </Text>
                <Text>
                    SafeAreaView 适配 iPhoneX 的 会自动添加安全区域
                </Text>
                <Text>
                    然后在模拟器或者真机下跑 内容会占据顶部状态栏 加了则会自动加上边距 把内容顶下来
                </Text>
                {/*在Drawer内关闭自己*/}
                <Button onPress={() => {
                    Actions.drawerClose()
                }} title={'Close me'}/>
            </SafeAreaView>
        )
    }
}