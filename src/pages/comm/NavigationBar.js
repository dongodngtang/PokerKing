import React from "react";
import {Image, Text, TouchableOpacity, View, StyleSheet, SafeAreaView} from "react-native";
import {Images, Metrics, px2dp, Styles} from "../../configs/Theme";
import {isEmptyObject} from "../../utils/utils";


const NavigationBar = ({title, profile,leftOnPress, rightOnPress, index}) => (
    <View style={Styles.navTop}>
        <TouchableOpacity
            onPress={() => leftOnPress && leftOnPress()}
            style={styles.left2}>
            {/*<Image*/}
            {/*style={{height: px2dp(48), width: px2dp(120)}}*/}
            {/*source={Images.puke_icon}*/}
            {/*/>*/}

        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.navTitle, {alignItems: index === 0 ? 'flex-end' : 'center'}]}>
            {index === 0 ? <Image style={{height: px2dp(44), width: px2dp(32), marginRight: 5}}
                                  source={Images.hot_races}/> : null}
            <Text
                style={{fontSize: 17, color: '#FFE9AD'}}
                numberOfLines={1}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                router.toSetting();
            }}
            style={styles.right2}>
            <Image
                style={{height: px2dp(38), width: px2dp(36)}}
                source={Images.setting}
            />

        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1B1F'
    },
    left2: {
        width:60,
        paddingLeft: 17,
        justifyContent: 'center'
    },
    right2: {
        width:60,
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        alignItems: 'center',
        paddingLeft: 17
    },
    navTitle: {
        flex: 1,
        width:Metrics.screenWidth - 164,
        marginLeft:5,
        marginRight:5,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
})

export default NavigationBar