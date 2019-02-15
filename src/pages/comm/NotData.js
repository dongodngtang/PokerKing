import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {Metrics} from "../../configs/Theme";
import {isEmptyObject, logMsg} from "../../utils/utils";
import {Images} from "../../configs/Theme";

@connect(({QueueList}) => ({
    ...QueueList,
}))
export default class NotData extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.backgroundColor,
                flexDirection:'column',
                alignItems: 'center'
            }}>
                <Image style={{height: 75, width: 72}}
                       source={Images.load_no_data}/>

                <Text style={{
                    color: '#AAAAAA', fontSize: 18,
                    marginTop: 22
                }}>{global.lang.t('load_no_data')}</Text>
            </View>
        )
    }
}