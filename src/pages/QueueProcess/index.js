import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {logMsg} from "../../utils/utils";
import styles from './index.style';
import {Metrics, Images} from "../../configs/Theme";

@connect(({QueueProcess}) => ({
    ...QueueProcess,
}))
export default class QueueProcess extends Component {

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: `${global.lang.t(this.props.params.type)}${global.lang.t('queue_process')}`
        })
    }


    componentDidMount() {

    }

    _renderItem = (item, index) => {
        return (
            <View style={styles.item_view}>
                <Text style={styles.item_txt}>50/100NL（3桌）</Text>
                <View style={{flex: 1}}/>
                <Text style={styles.item_txt}>{global.lang.t('line_count')}：12</Text>
                <Image style={{height: 12, width: 6}} source={Images.is_right}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.process_view}>
                <FlatList
                    data={[1, 2, 3, 4]}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}/>
            </View>
        )
    }

    _separator = () => {
        return (
            <View style={{height: 1, width: Metrics.screenWidth, backgroundColor: "#3F4042"}}/>
        )
    }
}
