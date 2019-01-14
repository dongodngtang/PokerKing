import React, {Component} from 'react';
import {View, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from "../Login/index.style";


@connect(({Register}) => ({
    ...Register,
}))
export default class Register extends Component {

    state = {
        name_show: false,
        email_show: false,
        user_name: '',
        email: '',
        gender: '性别'
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={[styles.textView, {marginTop: 30}]}>
                        <TextInput
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
                            placeholder={'用户名'}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.state.email_show = true;
                                this.setState({
                                    email: txt
                                })
                            }}

                        />

                    </View>

                    <View style={[styles.textView,{paddingTop:10,paddingBottom:10}]}>
                        <TouchableOpacity style={{width:'100%'}}>
                            <Text style={{
                                color: this.state.gender === '性别' ? '#CCCCCC' : '#444444',
                                marginLeft: 8,
                                fontSize:14,
                                fontWeight: 'bold',
                            }}>性别</Text>
                            <View style={{flex: 1}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textView}>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 230,
                                height: 35,
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: this.state.name_show ? '#444444' : '#F3F3F3'
                            }}
                            maxLength={11}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={'邮箱'}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.state.name_show = true;
                                this.setState({
                                    user_name: txt
                                })
                            }}

                        />

                    </View>
                </KeyboardAvoidingView>

                <Button
                    style={styles.confirm_btn}
                    color="#000000"
                    onPress={() => {
                        // router.toRegister()
                    }}
                    title={'完成'}/>
            </View>
        )
    }
}
