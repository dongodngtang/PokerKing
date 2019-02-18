import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {logMsg, convertDate, isStrNull,utcDate} from "../../utils/utils";
import styles from './index.style';
import {Images} from "../../configs/Theme";

export default class HotItem extends Component {

    render() {
        const {id, image, title, source, created_at} = this.props.item;
        return (
            <TouchableOpacity style={styles.item_view}
                              onPress={() => {
                                  if(this.props.type && this.props.type === 'event'){
                                      router.toEventDetail(this.props.item)
                                  }else{
                                      router.toInfoDetail(this.props.item)
                                  }
                              }}>
                <Image style={styles.race_img}
                       source={isStrNull(image) ? Images.empty_bg : {uri: image}}/>
                <View style={styles.right_view}>
                    <Text style={styles.race_content_txt} numberOfLines={2}>{title}</Text>
                    {this.props.type && this.props.type === 'event' ? <View style={styles.right_bottom_view}>
                        <Text style={styles.bottom_txt}>{utcDate(created_at,'YYYY/MM/DD MM:ss')}</Text>
                    </View> : <View style={styles.right_bottom_view}>
                        <Text style={[styles.bottom_txt, {marginRight: 10}]}>#{source}</Text>
                        <Text style={styles.bottom_txt}>{utcDate(created_at, 'MM-DD')}</Text>
                    </View>}

                </View>
            </TouchableOpacity>
        )
    }
}