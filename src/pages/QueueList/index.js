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
    };

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: `${this.props.params.item.small_blind}/${this.props.params.item.big_blind}NL（${this.props.params.item.cash_queue_members_count}${global.lang.t('table')}）`
        })
    };

    componentDidMount() {
        const {id, cash_game_id} = this.props.params.item;
        getCashQueuesNumber({cash_game_id: cash_game_id, cash_queue_id: id}, data => {
            logMsg("cash_queue_members", data);
            let members = data.items;
            members.map((item,index)=>{
                item.isSelect = index === 0;
            });
            logMsg("djskdjksdsdjks",members)
            this.setState({
                cash_queue_members:members
            })
        })
    }

    _separator = () => {
        return (
            <View style={{height: 1, width: Metrics.screenWidth, backgroundColor: "#ECECEE"}}/>
        )
    };

    _renderItem = ({item, index}) => {
        const {cash_queue_members} = this.state;
        return (
            <TouchableOpacity style={item.isSelect ? styles.selected_manila_item : styles.manila_item_view}
                              onPress={() => {
                                  cash_queue_members.forEach((x) => {
                                      x.isSelect = item.id ===x.id
                                  });
                                  this.setState({
                                      cash_queue_members: [...cash_queue_members]
                                  });
                              }}>
                <Text style={styles.manila_item_txt}>{index + 1}</Text>
                <View style={{flex: 1}}/>
                <Text style={[styles.manila_item_txt, {alignSelf: 'center'}]}>{item.nickname}</Text>
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
