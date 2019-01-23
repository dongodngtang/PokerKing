import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Modal, FlatList} from 'react-native';
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
        this.setState({
            visible: !this.state.visible
        })
    };

    _separator = () => {
        return <View style={{height: 1, width: '100%', backgroundColor: '#2D2D2D'}}/>;
    };

    _renderItem = ({item, index}) => {
        const {name, select} = item;

        return (
            <TouchableOpacity activeOpacity={1}
                              style={[styles.select_top_view, index === 0 ? styles.select_item_view1 : styles.select_top_view2]}>
                <Text style={styles.select_item_txt}>EPT2019</Text>
                <View style={{flex: 1}}/>
                <Image style={{width: 6, height: 12, marginRight: 17}} source={Images.is_right}/>
            </TouchableOpacity>)
    };

    render() {

        return (
            this.state.visible ? <View
                style={{alignItems: 'center', zIndex: 999, position: 'absolute', marginTop: Metrics.navBarHeight}}>

                <View style={{
                    width: Metrics.screenWidth
                }}>

                    <View style={[styles.select_top_view, {backgroundColor: 'white'}]}>
                        <Text style={styles.select_top_txt}>EPT2019</Text>
                    </View>

                    <FlatList
                        data={[1, 2, 3, 4]}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}/>

                </View>
            </View> : null

        )
    }
}