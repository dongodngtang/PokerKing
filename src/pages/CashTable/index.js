import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground,FlatList} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images} from "../../configs/Theme";
import {getCashGames} from "../../services/cashTableDao";
import {getBg, isEmpty, isEmptyObject, logMsg} from "../../utils/utils";
import {Metrics} from "../../configs/Theme";

@connect(({CashTable}) => ({
    ...CashTable,
}))
export default class CashTable extends Component {

    state = {
        cash_games: []
    };

    componentDidMount() {
        getCashGames(data => {
            logMsg("cash_games", data);
            this.setState({
                cash_games: data.items
            })
        })
    }
    _separator=()=>{
        return (
            <View style={{height:4,width:Metrics.screenWidth}}/>
        )
    };

    _renderItem=({item,index})=>{
        return(
            <TouchableOpacity key={index} activeOpacity={1} onPress={() => {
                router.toQueueProcess(item)
            }}>
                <ImageBackground source={getBg(item.image)} style={[styles.jinsha, {
                    flexDirection: "row-reverse",
                    alignItems: 'center'
                }]}>
                    {/*<View style={styles.txt_view}>*/}
                        {/*<Text style={styles.txt1}>{global.lang.t('sands_casino')}</Text>*/}
                        {/*<Text style={styles.txt2}>{global.lang.t('queuing')}></Text>*/}
                    {/*</View>*/}
                </ImageBackground>
            </TouchableOpacity>
        )
    };

    render() {
        const {cash_games} = this.state;
        if(isEmptyObject(cash_games)){
            return(
                <View style={styles.table_view}/>
            )
        }
        return (
            <View style={styles.table_view}>

                <FlatList
                    data={cash_games}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `cashTable${index}`}
                />
            </View>
        )
    }
}
