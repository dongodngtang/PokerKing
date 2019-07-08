import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView, FlatList, Modal,StatusBar
} from 'react-native';
import styles from "./topBar.style";
import {Images, px2dp} from "../../configs/Theme";

export default class TopBar extends Component {

    render(){
        const {left_img,narTitle,right_img,left_btn,mid_btn,right_btn} = this.props;
        return(
            <View style={styles.navTop}>
                <StatusBar barStyle={'light-content'}/>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={styles.left2}>
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