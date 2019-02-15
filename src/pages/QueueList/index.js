import React, {Component} from 'react';
import {View, Text, FlatList,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Metrics} from "../../configs/Theme";


@connect(({QueueList}) => ({
    ...QueueList,
}))
export default class QueueList extends Component {


    componentDidMount() {

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
        return (
            <View style={styles.list_view}>
                <FlatList
                    style={{backgroundColor: 'white'}}
                    data={this.state.manila_data}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}/>
            </View>
        )
    }
}
