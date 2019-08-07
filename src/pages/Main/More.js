/**
 *作者：lorne
 *时间：2019/6/26
 *功能：
 */
import React, {PureComponent} from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import {px2dp, Metrics, px2sp, Images, wh} from "../../configs/Theme";

const More = ({}) => (
    <View>
        <ItemLayout rightIcon={Images.right}
                    rightStyle={{...wh(22, 36)}}
                    title={global.lang.t('search')}
                    leftIcon={Images.search}
                    leftStyle={{...wh(40, 40), marginRight: px2dp(20)}}
                    onPress={() => {
                        router.toSearchNews()
                    }}
        />
        <View style={{height: px2dp(1), backgroundColor: '#736C5B', width: Metrics.screenWidth}}/>
        <TimeSelect/>
        <View style={{height: px2dp(1), backgroundColor: '#736C5B', width: Metrics.screenWidth}}/>
        <TypeSelect/>
        <View style={{height: px2dp(1), backgroundColor: '#736C5B', width: Metrics.screenWidth}}/>
    </View>
)

class TypeSelect extends PureComponent {
    state = {
        isOpen: false
    }

    render() {
        const {isOpen} = this.state
        let rightIcon = isOpen ? Images.top : Images.bottom
        let types = isOpen ? [global.lang.t('race_jinghua'), global.lang.t('zhuanfang'), global.lang.t('duiju'), global.lang.t('yure')] : []
        return <View>
            <ItemLayout
                onPress={() => {
                    this.setState({isOpen: !this.state.isOpen})
                }}
                rightIcon={rightIcon}
                rightStyle={{...wh(34, 20)}}
                title={global.lang.t('category_select')}
                leftIcon={Images.type_select}
                leftStyle={{...wh(36, 36), marginRight: px2dp(24)}}
            />
            {isOpen ?
                <View style={{
                    backgroundColor: '#25262A', marginTop: 1,
                    paddingLeft: px2dp(54), flexWrap: 'wrap', flexDirection: 'row',
                    paddingBottom: px2dp(60), paddingTop: px2dp(16)
                }}>
                    {types.map((item, index) => this.renderItem(item, index))}
                </View> : null}


        </View>
    }

    renderItem = (type, index) => {
        return <TouchableOpacity
            onPress={() => {
                router.toSearchDateTag({type: 'tag', value: type})
            }}
            key={`type${index}`}
            style={{
                ...wh(176, 56), marginTop: px2dp(24), backgroundColor: '#383A41',
                alignItems: 'center', justifyContent: 'center', borderRadius: px2dp(28),
                marginRight: px2dp(24)
            }}>
            <Text style={{color: '#FFE9AD', fontSize: px2sp(28)}}>{type}</Text>

        </TouchableOpacity>
    }
}

class TimeSelect extends PureComponent {
    state = {
        isOpen: false
    }

    render() {
        const {isOpen} = this.state
        let rightIcon = isOpen ? Images.top : Images.bottom
        let years = isOpen ? ['>2019', '>2018', '>2017'] : []
        return <View>
            <ItemLayout
                onPress={() => {
                    this.setState({isOpen: !this.state.isOpen})
                }}
                rightIcon={rightIcon}
                rightStyle={{...wh(34, 20)}}
                title={global.lang.t('time_select')}
                leftIcon={Images.time_select}
                leftStyle={{...wh(36, 36), marginRight: px2dp(24)}}
            />
            {years.map((item, index) => this.renderItem(item, index))}

        </View>
    }

    renderItem = (year, index) => {
        return <TouchableOpacity
            onPress={() => {
                let value = year.replace('>', "")
                router.toSearchDateTag({type: 'date', value})
            }}
            key={`year${index}`}
            style={{
                height: px2dp(76), width: '100%', marginTop: 1, backgroundColor: '#25262A',
                flexDirection: 'row', alignItems: 'center', paddingLeft: px2dp(94)
            }}>
            <Text style={{color: '#999999', fontSize: px2sp(28)}}>{year}</Text>

        </TouchableOpacity>
    }
}

const ItemLayout = ({title, leftIcon, leftStyle, rightIcon, rightStyle, onPress}) => (
    <TouchableOpacity
        onPress={() => onPress && onPress()}
        style={{
            height: px2dp(98),
            width: Metrics.screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: px2dp(34),
            backgroundColor: '#25262A'
        }}>

        <Image style={leftStyle}
               source={leftIcon}/>
        <Text style={{color: '#FFE9AD', fontSize: px2sp(28)}}>{title}</Text>
        <View style={{flex: 1}}/>
        <Image style={rightStyle}
               source={rightIcon}/>

    </TouchableOpacity>
)

export default More