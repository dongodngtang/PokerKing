import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics} from "../../configs/Theme";
import {alertOrder, isLogin, logMsg, shareHost, shareTo, strNotNull} from "../../utils/utils";
import {storageLoginUser} from "../../services/accountDao";
import SelectPiker from "../comm/SelectPiker";
import codePush from "react-native-code-push";
import {VERSION} from '../../themes/Constant'


@connect(({Setting}) => ({
    ...Setting,
}))
export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文'],
            race_notice: true,
            rank_notice: true
        };
    };


    componentDidMount() {

        codePush.disallowRestart()
        codePush.sync({
            updateDialog: false,
            installMode: codePush.InstallMode.ON_NEXT_RESUME
        })
    };

    onPickerSelect = (index) => {
        this.setState({
            selectedItem: index,
        })
    };

    _line = () => {
        return (
            <View style={{width: Metrics.screenWidth, backgroundColor: "#303236", height: 1}}>
                <View style={{width: Metrics.screenWidth - 19, height: 1, backgroundColor: '#998E72', marginLeft: 19}}/>
            </View>
        )
    };

    share = () => {
        let param = {
            shareTitle: 'PokerKingLive',
            shareText: 'PokerKingLive',
            shareImage: 'http://cdn-upyun.deshpro.com/deshpro_public/pokerking2.png',
            shareLink: `${shareHost()}/loadApp`
        };
        shareTo(param)
        logMsg('分享')

    }

    piker = () => {
        this.selectPiker && this.selectPiker.toggle()
    }

    getLanguage = () => {
        const lan = global.localLanguage;
        if (lan === 'en') {
            return 'English'
        } else if (lan === 'zh') {
            return '简体中文'
        } else if (lan === 'zh-en') {
            return '繁体中文'
        } else {
            return ''
        }
    };

    feedback = () => {
        router.toFeedback();
    };

    change_version = () => {
        router.toSwitchApi();
    };

    toAccount=()=>{
        router.toAccountSecurity()
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                {isLogin() ? this._item(global.lang.t('account_security'), Images.right, styles.right_img, null, null,this.toAccount) : null}
                {isLogin() ? this._line() : null}
                {this._item(`${global.lang.t('home_language')}(${this.getLanguage()})`, Images.right, styles.right_img, null, null, this.piker)}
                <View style={{height: 30, width: '100%'}}/>
                {this._item(global.lang.t('share_friends'), Images.right, styles.right_img, null, null, this.share)}
                {this._line()}
                {isLogin() ? this._item(global.lang.t('feedback'), Images.right, styles.right_img, null, null, this.feedback) : null}
                {isLogin() ? this._line() : null}
                {this._item(global.lang.t('race_notice'), null, null, <TouchableOpacity
                    activeOpacity={1}
                    style={styles.right_btn} onPress={() => {
                    this.setState({
                        race_notice: !this.state.race_notice
                    })
                }}>
                    <Image style={styles.img}
                           source={this.state.race_notice ? Images.setOpen : Images.setClose}/></TouchableOpacity>, null)}
                {this._line()}
                {this._item(global.lang.t('rank_notice'), null, null, <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({
                            rank_notice: !this.state.rank_notice
                        })
                    }}
                    style={styles.right_btn}>
                    <Image style={styles.img} source={this.state.rank_notice ? Images.setOpen : Images.setClose}/>
                </TouchableOpacity>, null)}

                {this._line()}
                {this._item(global.lang.t('clear'), Images.right, styles.right_img, null, '99.2M')}
                <View style={{height: 14, width: '100%'}}/>
                {this._item(global.lang.t('version'), Images.right, styles.right_img, null, VERSION, this.change_version)}

                {isLogin() ? <TouchableOpacity style={styles.drop_out} activeOpacity={1} onPress={() => {
                    alertOrder(global.lang.t('is_drop_out'), () => {
                        storageLoginUser({})
                        router.pop()
                    });
                }}>
                    <Text style={styles.drop_out_txt}>{global.lang.t('drop_out')}</Text>
                </TouchableOpacity> : null}

                <SelectPiker
                    ref={ref => this.selectPiker = ref}
                    onPickerSelect={this.onPickerSelect}
                    selectedItem={this.state.selectedItem}
                    itemList={this.state.itemList}/>
            </View>
        )
    }

    _item = (leftTxt, rightImg, imgStyles, rightView, rightTitle, onPress) => {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.btn_view} onPress={onPress && onPress}>
                <Text style={styles.leftTxt}>{leftTxt}</Text>
                <View style={{flex: 1}}/>
                {strNotNull(rightTitle) ? <Text style={styles.rightTitle}>{rightTitle}</Text> : null}
                {strNotNull(rightImg) ? <Image style={imgStyles} source={rightImg}/> : rightView}
            </TouchableOpacity>
        )
    }
}
