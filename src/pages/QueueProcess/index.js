import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {logMsg} from "../../utils/utils";
import styles from './index.style';
import {Metrics, Images} from "../../configs/Theme";
import {getCashQueues} from '../../services/cashTableDao'


@connect(({QueueProcess}) => ({
    ...QueueProcess,
}))
export default class QueueProcess extends Component {

    state = {
        cash_queues: []
    }

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: `${global.lang.t(this.props.params.type)}${global.lang.t('queue_process')}`
        })
    }


    componentDidMount() {
        const {item} = this.props.params;
        getCashQueues({cash_game_id: item.id}, data => {
            logMsg("cash_queues", data)
            let queues = data.items;
            queues.map((item) => {
                if (item.id === 0) {
                    item.isSelect = true
                } else {
                    item.isSelect = false
                }
            });
            this.setState({
                cash_queues: queues
            });
        });

    }

    _renderItem = ({item, index}) => {
        const {cash_game_id, small_blind, big_blind, table_numbers, cash_queue_members_count, created_at} = item;
        const {cash_queues} = this.state;
        return (
            <TouchableOpacity style={item.isSelect ? styles.selected_item : styles.item_view} onPress={() => {
                cash_queues.forEach((x) => {
                    if (x.id === index) {
                        x.isSelect = true
                    } else {
                        x.isSelect = false
                    }
                });
                this.setState({
                    cash_queues: [...cash_queues]
                });
                router.toQueueList(item);
            }}>
                <Text style={styles.item_txt}>{`${small_blind}/${big_blind}NL（${table_numbers}桌）`}</Text>
                <View style={{flex: 1}}/>
                <Text
                    style={[styles.item_txt, {marginRight: 20}]}>{global.lang.t('line_count')}：{cash_queue_members_count}</Text>
                <Image style={{height: 12, width: 6}} source={Images.is_right}/>
            </TouchableOpacity>
        )
    };


    render() {
        const {cash_queues} = this.state;
        return (
            <View style={styles.process_view}>
                <FlatList
                    data={cash_queues}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}/>
            </View>

        )
    }

    _separator = () => {
        return (
            <View style={{height: 1, width: Metrics.screenWidth, backgroundColor: "#2D2D2D"}}/>
        )
    }
}
