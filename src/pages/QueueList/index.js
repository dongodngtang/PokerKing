import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Metrics} from "../../configs/Theme";
import {getCashQueuesNumber} from "../../services/cashTableDao";
import {isEmptyObject, logMsg} from "../../utils/utils";
import NotData from "../comm/NotData";

@connect(({QueueList}) => ({
    ...QueueList,
}))
export default class QueueList extends Component {
    state = {
        cash_queue_members: []
    }

    componentDidMount() {
        const {item, cash_game_id} = this.props.params;
        getCashQueuesNumber({cash_game_id: cash_game_id, cash_queue_id: item.cash_game_id}, data => {
            logMsg("cash_queue_members", data);
            this.setState({
                cash_queue_members: data.items
            })
        })
    }

    _separator = () => {
        return (
            <View style={{height: 1, width: Metrics.screenWidth, backgroundColor: "#ECECEE"}}/>
        )
    };

    _renderItem = ({item, index}) => {
        const {manila_data} = this.state;
        return (
            <TouchableOpacity style={item.isSelect ? styles.selected_manila_item : styles.manila_item_view}
                              onPress={() => {
                                  manila_data.forEach((x) => {
                                      if (x.id === index) {
                                          x.isSelect = true
                                      } else {
                                          x.isSelect = false
                                      }
                                  });
                                  this.setState({
                                      manila_data: [...manila_data]
                                  });
                              }}>
                <Text style={styles.manila_item_txt}>{index + 1}</Text>
                <View style={{flex: 1}}/>
                <Text style={[styles.manila_item_txt, {alignSelf: 'center'}]}>Kimi</Text>
                <View style={{flex: 1, marginRight: 18}}/>
            </TouchableOpacity>
        )
    };

    render() {
        const {cash_queue_members} = this.state;
        if (isEmptyObject(cash_queue_members)) {
            return <NotData backgroundColor={"#ECECEE"}/>
        }
        return (
            <View style={styles.list_view}>
                <FlatList
                    style={{backgroundColor: 'white'}}
                    data={cash_queue_members}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}/>
            </View>
        )
    }
}
