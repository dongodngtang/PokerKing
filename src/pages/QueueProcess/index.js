import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {logMsg} from "../../utils/utils";
import styles from './index.style';
import {Metrics, Images} from "../../configs/Theme";

let data2 = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

@connect(({QueueProcess}) => ({
    ...QueueProcess,
}))
export default class QueueProcess extends Component {

    state = {
        data: [],
        manila_data: []
    }

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: `${global.lang.t(this.props.params.type)}${global.lang.t('queue_process')}`
        })
    }


    componentDidMount() {
        data2.map((item) => {
            if (item.id === 0) {
                item.isSelect = true
            } else {
                item.isSelect = false
            }
        });
        this.setState({
            data: data2,
            manila_data: data2
        });
    }

    _renderItem = ({item, index}) => {
        const {data} = this.state;
        return (
            <TouchableOpacity style={item.isSelect ? styles.selected_item : styles.item_view} onPress={() => {
                data.forEach((x) => {
                    if (x.id === index) {
                        x.isSelect = true
                    } else {
                        x.isSelect = false
                    }
                });
                this.setState({
                    data: [...data]
                });
            }}>
                <Text style={styles.item_txt}>50/100NL（3桌）</Text>
                <View style={{flex: 1}}/>
                <Text style={[styles.item_txt, {marginRight: 20}]}>{global.lang.t('line_count')}：12</Text>
                <Image style={{height: 12, width: 6}} source={Images.is_right}/>
            </TouchableOpacity>
        )
    };

    _renderItem_manila = ({item, index}) => {
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
                <View style={{flex:1}}/>
                <Text style={[styles.manila_item_txt, {alignSelf: 'center'}]}>Kimi</Text>
                <View style={{flex:1,marginRight:18}}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            this.props.params.type === 'macao' ?
                <View style={styles.process_view}>
                    <FlatList
                        data={this.state.data}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}/>
                </View> :
                <View style={styles.manila_process_view}>
                    <FlatList
                        style={{backgroundColor: 'white'}}
                        data={this.state.manila_data}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator_manila}
                        renderItem={this._renderItem_manila}/>
                </View>


        )
    }

    _separator_manila = () => {
        return (
            <View style={{height: 1, width: Metrics.screenWidth, backgroundColor: "#ECECEE"}}/>
        )
    }
    _separator = () => {
        return (
            <View style={{height: 1, width: Metrics.screenWidth, backgroundColor: "#2D2D2D"}}/>
        )
    }
}
