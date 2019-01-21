import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Styles} from "../../configs/Theme";
import Carousel from 'react-native-snap-carousel';
import {Metrics} from "../../configs/Theme";
import {logMsg} from "../../utils/utils";


export default class RaceModal extends Component {
    state = {
        visible: false
    };

    toggle = () => {
        logMsg("jsfhjsfldhksks")
        this.setState({
            visible: !this.state.visible
        })
    };

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                onRequestClose={() => {

                }}
                visible={this.state.visible}
                style={{alignItems: 'center'}}
            >

                <View style={{
                    width: Metrics.screenWidth,
                    marginTop: Metrics.navBarHeight
                }}>
                    <View style={styles.select_top_view}>
                        <Text style={styles.select_top_txt}>EPT2019</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}