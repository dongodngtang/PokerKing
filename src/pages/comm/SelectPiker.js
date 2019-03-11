import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, Modal} from 'react-native';
import {Metrics} from "../../configs/Theme";
import Picker from 'react-native-wheel-picker'

let PickerItem = Picker.Item;


export default class SelectPiker extends Component {

    state = {
        visible: false,
        index: 1
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
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
                <TouchableOpacity style={{flex:1}} onPress={()=>{
                    const {index} = this.state;
                    if (index === 0) {
                        global.lang.switchLang('en')
                    } else if (index === 1) {
                        global.lang.switchLang('zh')
                    } else if (index === 2) {
                        global.lang.switchLang('zh-e')
                    } else {
                        global.lang.switchLang('zh')
                    }
                    this.toggle();
                }}/>

                <View style={{
                    width: Metrics.screenWidth,
                    backgroundColor: 'white',
                    borderWidth: 0.5,
                    borderColor: "#AAAAAA",
                    position: 'absolute',
                    bottom: 0
                }}>
                    <View style={{
                        marginTop: 24,
                        flexDirection: 'row',
                        marginLeft: 17,
                        marginRight: 17,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.toggle();
                        }}>
                            <Text style={{color: "#444444", fontSize: 18}}>{global.lang.t('cancel')}</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={() => {
                            const {index} = this.state;
                            if (index === 0) {
                                global.lang.switchLang('en')
                            } else if (index === 1) {
                                global.lang.switchLang('zh')
                            } else if (index === 2) {
                                global.lang.switchLang('zh-e')
                            } else {
                                global.lang.switchLang('zh')
                            }
                            this.toggle();
                        }}>
                            <Text style={{color: "#444444", fontSize: 18}}>{global.lang.t('determine')}</Text>
                        </TouchableOpacity>

                    </View>
                    <Picker style={{width: Metrics.screenWidth,height: 180}}
                            selectedValue={this.props.selectedItem}
                            itemStyle={{color: "#444444", fontSize: 20,borderWidth:0}}
                            onValueChange={(index) => {
                                this.props.onPickerSelect(index);
                                this.setState({
                                    index: index
                                })
                            }}>
                        {this.props.itemList.map((value, i) => (
                            <PickerItem label={value} value={i} key={value}
                                        color={i === this.state.index ? "#333333" : "#888888"}/>
                        ))}
                    </Picker>
                    <View style={{height: 40}}/>
                </View>
            </Modal>

        )
    }
}