import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics} from "../../configs/Theme";
import {alertOrder, strNotNull} from "../../utils/utils";
import {storageLoginUser} from "../../services/accountDao";


@connect(({Setting}) => ({
    ...Setting,
}))
export default class Setting extends Component {

    state = {
        race_notice: true,
        rank_notice: true
    }


    componentDidMount() {

    }

    _line = () => {
        return (
            <View style={{width: Metrics.screenWidth,backgroundColor:"#303236",height:1}}>
                <View style={{width: Metrics.screenWidth - 19, height: 1, backgroundColor: '#998E72', marginLeft: 19}}/>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                {this._item(global.lang.t('account_security'), Images.right, styles.right_img, null, null)}
                {this._line()}
                {this._item(`${global.lang.t('home_language')}(${global.localLanguage})`, Images.right, styles.right_img, null, null)}
                <View style={{height: 30, width: '100%'}}/>
                {this._item(global.lang.t('share_friends'), Images.right, styles.right_img, null, null)}
                {this._line()}
                {this._item(global.lang.t('feedback'), Images.right, styles.right_img, null, null)}
                {this._line()}
                {this._item(global.lang.t('race_notice'), null, null, <View
                    style={[styles.right_btn, {
                        backgroundColor: this.state.race_notice ? 'green' : "white",
                        flexDirection: this.state.race_notice ? 'row-reverse' : "row"
                    }]}>
                    <TouchableOpacity activeOpacity={1} style={styles.btn_change} onPress={() => {
                        this.setState({
                            race_notice: !this.state.race_notice
                        })
                    }}/></View>, null)}
                {this._line()}
                {this._item(global.lang.t('rank_notice'), null, null, <View
                    style={[styles.right_btn, {
                        backgroundColor: this.state.rank_notice ? 'green' : "white",
                        flexDirection: this.state.rank_notice ? 'row-reverse' : "row"
                    }]}>
                    <TouchableOpacity activeOpacity={1} style={styles.btn_change} onPress={() => {
                        this.setState({
                            rank_notice: !this.state.rank_notice
                        })
                    }}/></View>, null)}

                {this._line()}
                {this._item(global.lang.t('clear'), Images.right, styles.right_img, null, '99.2M')}
                <View style={{height: 14, width: '100%'}}/>
                {this._item(global.lang.t('version'), Images.right, styles.right_img, null, '2.0')}

                <TouchableOpacity style={styles.drop_out} activeOpacity={1} onPress={()=>{
                    alertOrder(global.lang.t('is_drop_out'), () => {
                        storageLoginUser({})
                    });
                }}>
                    <Text style={styles.drop_out_txt}>{global.lang.t('drop_out')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _item = (leftTxt, rightImg, imgStyles, rightView, rightTitle) => {
        return (
            <TouchableOpacity  activeOpacity={1} style={styles.btn_view}>
                <Text style={styles.leftTxt}>{leftTxt}</Text>
                <View style={{flex: 1}}/>
                {strNotNull(rightTitle) ? <Text style={styles.rightTitle}>{rightTitle}</Text> : null}
                {strNotNull(rightImg) ? <Image style={imgStyles} source={rightImg}/> : rightView}
            </TouchableOpacity>
        )
    }
}
