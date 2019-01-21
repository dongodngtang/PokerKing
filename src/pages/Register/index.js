import React, {Component} from 'react';
import {View, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';
import styles from "../Login/index.style";
import {Images} from "../../configs/Theme";


@connect(({Register}) => ({
    ...Register,
}))
export default class Register extends Component {

    state = {
        name_show: false,
        email_show: false,
        user_name: '',
        email: '',
        gender: global.lang.t('gender')
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
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: this.state.email_show ? '#444444' : '#F3F3F3'
                            }}
                            maxLength={11}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('username_EC')}
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
                        <TouchableOpacity style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                            <Text style={{
                                color: this.state.gender === global.lang.t('gender') ? '#CCCCCC' : '#444444',
                                marginLeft: 8,
                                fontSize:16,
                                fontWeight: 'bold',
                            }}>{global.lang.t('gender')}</Text>
                            <View style={{flex: 1}}/>
                            <Image style={{width:6,height:16,marginRight:10}} source={Images.is_right}/>
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
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: this.state.name_show ? '#444444' : '#F3F3F3'
                            }}
                            maxLength={11}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('mailbox')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.state.name_show = true;
                                this.setState({
                                    user_name: txt
                                })
                            }}
                        />
                        <View style={{flex: 1}}/>
                        <Image style={{width:6,height:16,marginRight:10}} source={Images.is_right}/>
                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity style={styles.btn} onPress={()=>{

                }}>
                    <Text style={{color:'#FFE9AD',fontSize:18}}>{global.lang.t('determine')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
