import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView, FlatList, Modal
} from 'react-native';

const codes = [{id: 0, name: 'mainland', code: '86'}, {
    id: 1,
    name: 'hong_kong',
    code: '852'
}, {id: 2, name: 'macao', code: '853'}, {
    id: 3,
    name: 'taiwan',
    code: '886'
}];

export default class ExtArea extends Component {

    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    _separator = () => {
        return <View style={{width: '100%', height: 1, backgroundColor: '#F3F3F3'}}/>
    };

    _renderItem = (item,index) => {
        const {id, name, code} = item;
        return (
            <TouchableOpacity style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: 50}}
                              onPress={() => {
                                  this.props.changed_ext(code);
                                  this.toggle();
                              }}>
                <Text style={{color: "#666666", fontSize: 14, marginLeft: 17}}>{global.lang.t(name)}</Text>
                <View style={{flex: 1}}/>
                <Text style={{color: "#666666", fontSize: 14, marginRight: 17}}>{code}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                onRequestClose={() => {

                }}
                visible={this.state.visible}
                style={{alignItems: 'center'}}
            >
                <View style={this.props.type && this.props.type === 'ModalPrompt' ? {
                    width: 300,
                    alignSelf: 'center',
                    backgroundColor: 'rgba(0,0,0,0.8)'
                } : {flex: 1}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.toggle}
                        style={{height: this.props.type && this.props.type === 'ModalPrompt' ? 290 : 110}}/>

                    {codes.map(this._renderItem)}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.toggle} style={{flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.8)'}}/>
                </View>
            </Modal>
        )
    }
}