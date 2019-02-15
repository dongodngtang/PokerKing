/**
 *作者：lorne
 *时间：2019/1/23
 *功能：
 */

import React, {Component} from 'react'
import {Button, Text, SafeAreaView, View, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux';
import styles from './index.style';
import {Images} from "../../configs/Theme";

export default class Drawer extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: "#212223"}}>
                <View style={styles.safe_area_view}>
                    <Image source={Images.race_img} style={styles.person_img}/>
                    <Text style={styles.person_txt}>WW</Text>
                </View>
                <View style={{height: 58}}/>
                {this._item(styles.select_btn, Images.xiugaiziliao, styles.change_img, global.lang.t('change_data'), () => {
                    router.toModifyData()
                })}
                {this._item(styles.select_btn, Images.wenti, styles.change_img, global.lang.t('common_problem'), () => {
                    router.toSwitchApi()
                })}
                {this._item(styles.select_btn, Images.yijian, styles.change_img, global.lang.t('feedback'), () => {
                        router.toFeedback()
                })}
                {this._item(styles.select_btn, Images.feiji, styles.change_img, global.lang.t('recommend'), () => {

                })}
            </SafeAreaView>
        )
    }

    _item = (itemStyle, img, imgStyle, title, onPress) => {
        return <TouchableOpacity
            activeOpacity={1}
            style={itemStyle} onPress={onPress}>
            <Image style={imgStyle} source={img}/>
            <Text style={styles.safe_area_txt}>{title}</Text>
            <View style={{flex: 1}}/>
        </TouchableOpacity>
    };
}