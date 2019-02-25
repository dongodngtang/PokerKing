import React, {Component} from 'react';
import {View, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';
import styles from "../Login/index.style";
import {Images} from "../../configs/Theme";
import {ActionSheet} from '../../components';
import {register} from "../../services/accountDao";
import ImagePicker from "react-native-image-crop-picker";
import {isStrNull, logMsg, showToast} from "../../utils/utils";

const reg = /[^a-zA-Z]+/;

@connect(({Register}) => ({
    ...Register,
}))
export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name_show: false,
            email_show: false,
            genderTxt:global.lang.t('gender'),
            nickStr:''
        }
        this.user_name = ''
        this.email = ''
        this.gender= 0
    }



    _getGender =(gender)=> {
        logMsg(gender)
        if(gender !== 0){
            this.gender = gender
            this.setState({
                genderTxt:gender === 1?global.lang.t('male'):global.lang.t('female')
            })
        }


    }

     trimNumber = (str)=> {
        return str.replace(/\d+/g,'');
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
                                height: 50,
                                fontSize: 16,
                                color:'#444444'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('username_EC')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {

                                this.user_name = txt

                            }}
                        />

                    </View>

                    <View style={[styles.textView,{height:50}]}>
                        <TouchableOpacity style={{width:'100%',flexDirection:'row',alignItems:'center'}}
                                          onPress={()=>{
                                              this.actionGender && this.actionGender.show()
                                          }}>
                            <Text style={{
                                color: this.state.genderTxt === global.lang.t('gender') ? '#CCCCCC' : '#444444',
                                marginLeft: 8,
                                fontSize:16,
                                fontWeight: 'bold',
                            }}>{this.state.genderTxt}</Text>
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
                                height: 50,
                                fontSize: 16,
                                color:'#444444'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('mailbox')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.email = txt
                            }}
                        />
                        <View style={{flex: 1}}/>
                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity style={styles.btn} onPress={()=>{
                    let body = this.props.params;
                    body.nickname = this.user_name;
                    body.gender = this.gender;
                    body.email = this.email;
                    if (isStrNull(this.user_name)) {
                        showToast(global.lang.t('input_nick_name'))
                    }else if (this.gender === 0){
                        showToast(global.lang.t('select_gender'))
                    }else if (isStrNull(this.email)){
                        showToast(global.lang.t('input_email'))
                    }else{
                        if (reg.test(this.user_name)) {
                            showToast(global.lang.t('nick_name_english'));
                        }else{
                            register(body,ret=>{
                                global.lang.t('login_success')
                                this.props.navigation.popToTop()
                            },err=>{

                            })
                        }
                    }
                }}>
                    <Text style={{color:'#FFE9AD',fontSize:18}}>{global.lang.t('determine')}</Text>
                </TouchableOpacity>

                <Text style={{color:'#AAAAAA',fontSize:14,position:'absolute',bottom:70}}>{global.lang.t('prompt')}</Text>

                <ActionSheet
                    ref={o => this.actionGender = o}
                    title={global.lang.t('choose_gender')}
                    options={[global.lang.t('cancel'), global.lang.t('male'), global.lang.t('female')]}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={this._getGender}
                />
            </View>
        )
    }
}
