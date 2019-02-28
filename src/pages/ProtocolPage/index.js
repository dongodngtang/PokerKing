import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {protocol_zh} from '../../lang/Protocol'

@connect(({ProtocolPage}) => ({
    ...ProtocolPage,
}))
export default class ProtocolPage extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <ScrollView style={{flex: 1,backgroundColor:'white'}}>
                <View style={{marginLeft: 17, marginRight: 17,marginTop:10}}>
                    <Text style={{color:"#444444",fontSize:14,lineHeight:22}}>{protocol_zh}</Text>
                </View>
                <View style={{height: 80}}/>
            </ScrollView>
        )
    }
}
