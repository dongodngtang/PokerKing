import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images} from "../../configs/Theme";

@connect(({CashTable}) => ({
    ...CashTable,
}))
export default class CashTable extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.table_view}>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    router.toQueueProcess('macao')
                }}>
                    <ImageBackground source={Images.jinsha} style={[styles.jinsha, {
                        flexDirection: "row-reverse",
                        alignItems: 'center'
                    }]}>
                        <View style={styles.txt_view}>
                            <Text style={styles.txt1}>{global.lang.t('sands_casino')}</Text>
                            <Text style={styles.txt2}>{global.lang.t('queuing')}></Text>
                        </View>
                    </ImageBackground>
                    {/*<View style={{width: 6, height: 12, marginRight: 17}}/>*/}
                    {/*<View style={{flex: 1}}/>*/}
                    {/*<Text style={styles.macao_txt}>{global.lang.t('macao')}>>></Text>*/}
                    {/*<View style={{flex: 1}}/>*/}
                    {/*<Image style={{width: 6, height: 12, marginRight: 17}} source={Images.is_right}/>*/}
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    router.toQueueProcess('manila')
                }}>
                    <ImageBackground source={Images.weini} style={[styles.jinsha,{flexDirection: "row",
                        alignItems: 'center'}]}>
                        <View style={styles.weini_view}>
                            <Text style={styles.txt1}>{global.lang.t('venetian_casino')}</Text>
                            <Text style={styles.txt2}>{global.lang.t('queuing')}></Text>
                        </View>
                    </ImageBackground>
                    {/*<View style={{flex: 1,marginLeft:23}}/>*/}
                    {/*<Text style={styles.macao_txt}>{global.lang.t('manila')}>>></Text>*/}
                    {/*<View style={{flex: 1}}/>*/}
                    {/*<Image style={{width: 6, height: 12, marginRight: 17}} source={Images.is_right}/>*/}
                </TouchableOpacity>
            </View>
        )
    }
}
