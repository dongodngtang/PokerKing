import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {logMsg, convertDate, strNotNull, utcDate, isStrNull, getBg, mul} from "../../utils/utils";
import styles from './index.style';
import {Images, Metrics} from "../../configs/Theme";

export default class HotItem extends Component {

    render() {
        const {id, image, title, source, created_at} = this.props.item;
        const {type} = this.props;
        return (
            <TouchableOpacity style={styles.item_view}
                              onPress={() => {
                                  if (this.props.type && this.props.type === 'event') {
                                      router.toEventDetail(id, this.props.event_id)
                                  } else {
                                      router.toInfoDetail(id)
                                  }
                              }}>
                <Image style={styles.race_img}
                       source={getBg(image)}/>
                <View style={styles.right_view}>
                    <Text style={[styles.race_content_txt, {color: type && type === 'hot' ? '#DDDDDD' : "#444444"}]}
                          numberOfLines={2}>{title}</Text>
                    {this.props.type && this.props.type === 'event' ? <View style={styles.right_bottom_view}>
                        <Text style={styles.bottom_txt}>{utcDate(created_at, 'YYYY/MM/DD MM:ss')}</Text>
                    </View> : <View style={styles.right_bottom_view}>
                        {strNotNull(source) ?
                            <Text numberOfLines={1} style={[styles.bottom_txt, {
                                marginRight: 10,
                                maxWidth: Number(mul(Metrics.screenWidth,0.4))
                            }]}>#{source}</Text> : null}
                        <Text style={styles.bottom_txt}>{utcDate(created_at, 'MM-DD')}</Text>
                    </View>}

                </View>
            </TouchableOpacity>
        )
    }
}