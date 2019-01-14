import React, {Component} from 'react';
import {View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ExtArea from '../comm/ExtArea';
import {Metrics} from "../../configs/Theme";

@connect(({Login}) => ({
    ...Login,
}))
export default class Login extends Component {

    state = {
        iphone_show: false,
        vcode_show: false,
        iphone: '',
        vcode: '',
        ext: '86'
    }

    componentDidMount() {

    }


    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.areaView} onPress={() => {
                    this.areaAction && this.areaAction.toggle();
                }}>
                    <Text
                        style={{width: 180, marginLeft: 8, height: 28}}>
                        {`中国（China） (+${this.state.ext})`}
                    </Text>
                    <View style={{flex: 1}}/>


                </TouchableOpacity>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 230,
                                height: 35,
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: this.state.email_show ? '#444444' : '#F3F3F3'
                            }}
                            maxLength={11}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={'手机号码'}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.state.iphone_show = true;
                                this.setState({
                                    iphone: txt
                                })
                            }}

                        />

                    </View>
                    <View style={styles.textView}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 200,
                                height: 35,
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: this.state.name_show ? '#444444' : '#F3F3F3'
                            }}
                            maxLength={11}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={'验证码'}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.state.vcode_show = true;
                                this.setState({
                                    vcode: txt
                                })
                            }}

                        />
                        <View style={{flex: 1}}/>
                        <View style={{height: 22, width: 1, backgroundColor: '#444444', marginRight: 10}}/>
                        <TouchableOpacity style={{marginRight:8}}>
                            <Text style={{color: '#afbed6', fontSize: 12}}>获取验证码</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
                <Button
                    style={styles.confirm_btn}
                    color="#000000"
                    onPress={() => {
                        router.toRegister()
                    }}
                    title={'同意并继续'}/>

                <ExtArea
                    ref={ref => this.areaAction = ref}
                    changed_ext={this.changed_ext}/>
            </View>
        )
    }

    changed_ext = (code) => {
        this.setState({
            ext: code
        })
    }
}
