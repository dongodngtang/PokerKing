import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import TopBar from "../comm/TopBar";
import {Images} from "../../configs/Theme";
import styles from './index.style'
import {getAvatar, isEmptyObject, isStrNull, logMsg} from "../../utils/utils";
import QRCode from 'react-native-qrcode';


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
                    }else{
                        router.toModifyData()
                    }
                }}>
                    <Image source={getAvatar(avatar)} style={styles.person_img}/>
                    <View style={styles.mid_view}>
                        <Text style={styles.nick_name}>{nick_name}</Text>
                        {isStrNull(member) ? null : <View style={styles.member_view}>
                            <Text style={styles.member_text}>{member}</Text>
                        </View>}
                    </View>
                    <View style={{flex: 1}}/>
                    <Image style={styles.right_img} source={Images.right}/>
                </TouchableOpacity>

                <View style={styles.items_view}>
                    {this._item(styles.item_view, Images.notice_img, styles.img_dy1,
                        global.lang.t('notice'), () => {
                            router.toNotices();
                        })}
                    {this._item(styles.item_view, Images.collection, styles.img_dy2,
                        global.lang.t('collection'), () => {
                            router.toCollections();
                        })}
                    {this._item(styles.item_view, Images.puke_intro, styles.img_dy3,
                        global.lang.t('about'), () => {
                            router.toFoundBeauti();
                        })}
                    {this._item(styles.item_view, Images.vip_img, styles.img_dy4,
                        global.lang.t('vip_intro'), () => {

                        })}
                </View>

                <QRCode
                    value={'是劳动纠纷是的'}
                    size={200}
                    bgColor='red'
                    fgColor='white'/>

            </View>
        )
    }

    _item = (itemStyle, img, imgStyle, title, onPress, notice) => {
        return (
            <TouchableOpacity activeOpacity={1} style={itemStyle} onPress={onPress}>
                <Image style={imgStyle} source={img}/>
                <Text style={styles.title_text}>{title}</Text>
                <View style={{flex: 1}}/>
                {isStrNull(notice) ? null : <Text style={styles.read_message}>{global.lang.t('your')}{global.lang.t('unRead')}</Text>}
                <Image style={styles.right_img} source={Images.right}/>
            </TouchableOpacity>
        )
    }
}
