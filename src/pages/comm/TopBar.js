import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView, FlatList, Modal,StatusBar
} from 'react-native';
import {Images, Metrics, px2dp} from "../../configs/Theme";

export default class TopBar extends Component {

    render(){
        const {left_img,narTitle,right_img,left_btn,mid_btn,right_btn} = this.props;
        return(
            <View style={styles.navTop}>
                <StatusBar barStyle={'light-content'}/>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={styles.left22}>
                    {/*<Image*/}
                        {/*style={{height: px2dp(48), width: px2dp(120)}}*/}
                        {/*source={left_img}*/}
                    {/*/>*/}

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navTitle}
                    onPress={() => {
                    }}>
                    <Text
                        style={{fontSize: 17, color: '#FFE9AD', maxWidth: '90%'}}
                        numberOfLines={1}>{narTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        router.toSetting()
                    }}
                    style={styles.right2}>
                    <Image
                        style={{height: px2dp(38), width: px2dp(36)}}
                        source={right_img}
                    />

                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navTop: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#1A1B1F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    left22: {
        paddingLeft: 17,
        width:60,
        justifyContent: 'center'
    },
    right2: {
        width:60,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingLeft: 17
    },
    navTitle: {
        flex: 1,
        width:Metrics.screenWidth - 164,
        marginLeft:5,
        marginRight:5,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})