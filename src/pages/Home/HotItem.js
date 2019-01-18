import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {logMsg} from "../../utils/utils";
import MainBanner from './MainBanner';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Metrics} from "../../configs/Theme";

export default class HotItem extends Component {

    render(){
        return(
            <View style={styles.item_view}>
                <Image style={styles.race_img}
                       source={{uri: 'https://cdn-upyun.deshpro.com/kk/uploads/banner/64aaf57f7701d04761cedcc4210a7a65.jpg'}}/>
                <View style={styles.right_view}>
                    <Text style={styles.race_content_txt} numberOfLines={2}>TPTS中扑免费专属赛，20万奖池门票等你抢！</Text>
                    <View style={styles.right_bottom_view}>
                        <Text style={[styles.bottom_txt, {marginRight: 10}]}>#中扑网</Text>
                        <Text style={styles.bottom_txt}>04-21</Text>
                    </View>
                </View>
            </View>
        )
    }
}