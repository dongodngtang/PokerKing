/**
 *作者：lorne
 *时间：2019/7/18
 *功能：
 */

import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Modal, Text} from 'react-native';
import propTypes from 'prop-types';
import {px2dp, px2sp} from "../../configs/Theme";
import QRCode from 'react-native-qrcode';
import {getRemainTime} from "../../utils/utils";

export default class QRCodeModal extends PureComponent {

    static propTypes = {
        btnArray: propTypes.array
    }

    state = {
        visible: false,
        countTime: 60,
    };

    toggle = () => {

        this.setState({
            visible: !this.state.visible
        }, () => {
            if (this.state.visible) {
                this.startCounting()
            } else {
                this.intervalTimer && clearInterval(this.intervalTimer);
            }
        })
    }

    startCounting = () => {
        let {countTime} = this.state
        this.intervalTimer = setInterval(() => {
            if (countTime > 0) {
                --countTime
                this.setState({
                    countTime
                })
            } else {
                clearInterval(this.intervalTimer);
            }
        }, 1000)
    };

    render() {
        return (<Modal
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => {
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.toggle}
                style={styles.container}>

                <View style={styles.card}>

                    <Text style={styles.counting}>{`${this.state.countTime}s`}</Text>

                    <QRCode
                        value={'是劳动纠纷是的'}
                        size={px2dp(274)}
                    />

                    <Text style={styles.txt}>{`请使用二维码到前台扫\n描确认等候申请`}</Text>
                </View>


            </TouchableOpacity>

        </Modal>)
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center'},
    card: {
        height: px2dp(560),
        width: px2dp(560),
        backgroundColor: '#fff',
        borderRadius: px2dp(8),
        alignItems: 'center'
    },
    counting: {
        fontSize: px2sp(40),
        color: '#509EF9',
        marginTop: px2dp(46),
        marginBottom: px2dp(36)
    },
    txt: {
        fontSize: px2sp(28),
        color: '#888888',
        marginTop: px2dp(40),
        textAlign: 'center'
    }
})