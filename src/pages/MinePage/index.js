import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import TopBar from "../comm/TopBar";
import {Images} from "../../configs/Theme";
import styles from './index.style'
import {getAvatar, isEmptyObject, isStrNull} from "../../utils/utils";


@connect(({MinePage}) => ({
    ...MinePage,
}))
export default class MinePage extends Component {


    componentDidMount() {

    }

    render() {
        const {profile} = this.props;
        let avatar = isEmptyObject(profile) ? Images.default_bg : isStrNull(profile.avatar) ? Images.default_bg : {uri: profile.avatar}
        let nick_name = isEmptyObject(profile) ? global.lang.t('login') : profile.nickname;
        let member = isEmptyObject(profile) ? '' : profile.member;
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                <TopBar left_img={Images.puke_icon}
                        narTitle={global.lang.t('mine')}
                        right_img={Images.setting}/>
                <TouchableOpacity style={styles.top_view} onPress={() => {
                    if (isEmptyObject(profile)) {
                        router.toLogin();
                    }
                }}>
                    <Image source={getAvatar(avatar)} style={styles.person_img}/>
                    <View style={styles.mid_view}>
                        <Text style={styles.nick_name}>{nick_name}</Text>
                        {isStrNull(member) ? null : <View style={styles.member_view}>
                            <Text style={styles.member_text}>{member}</Text>
                        </View>}
                    </View>
                    <View style={{flex:1}}/>
                    <Image style={styles.right_img} source={Images.right}/>
                </TouchableOpacity>


            </View>
        )
    }
}
