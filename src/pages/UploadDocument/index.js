import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics, px2dp} from "../../configs/Theme";
import LinearGradient from 'react-native-linear-gradient'
import {ActionSheet} from '../../components';
import Permissions from "react-native-permissions";
import ImagePicker from 'react-native-image-crop-picker';
import {isEmptyObject, logMsg, showToast, strNotNull} from "../../utils/utils";

const picker = {
    width: 800,
    height: 800,
    cropping: false,
    cropperCircleOverlay: false,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.5,
};

@connect(({UploadDocument}) => ({
    ...UploadDocument,
}))
export default class UploadDocument extends Component {

    state = {
        realname: '',
        cert_no: '',
        avatar:{}
    }


    handlePress = (i) => {
        switch (i) {
            case 1:
                Permissions.check('camera').then(ret => {
                    logMsg('照相权限', ret)
                    if (ret === 'authorized' || ret === 'undetermined') {
                        ImagePicker.openCamera(picker).then(image => {
                            this.setState({
                                avatar: {uri: image.path}
                            })
                        }).catch(e => {
                            // Alert.alert(e.message ? e.message : e);
                        });
                    } else {
                        showToast(global.lang.t('photo_message'))
                        Permissions.request('camera').then(status => {
                            logMsg('申请照相权限', status)
                            if (status !== 'authorized') {
                                // showToast(global.lang.t('alert_message'))
                            }

                        })
                    }
                })

                break;
            case 2:
                Permissions.check('photo').then(ret => {
                    logMsg('通知权限', ret)
                    if (ret === 'authorized' || ret === 'undetermined') {
                        ImagePicker.openPicker(picker).then(image => {
                            this.setState({
                                avatar: {uri: image.path}
                            })
                        }).catch(e => {
                            // Alert.alert(e.message ? e.message : e);
                        });
                    } else {
                        showToast(global.lang.t('photo_message'))
                        Permissions.request('photo').then(status => {
                            logMsg('申请通知权限', status)
                            if (status !== 'authorized') {
                                // showToast(global.lang.t('alert_message'))
                            }

                        })
                    }
                })


                break;
        }
    };

    comfirm =()=>{
        const {realname,cert_no,avatar} = this.state;
       if(!strNotNull(realname)){
           showToast('真实姓名不能为空！')
           return
       }
       if(!strNotNull(cert_no)){
           showToast('证件号不能为空！')
           return
       }
       if(isEmptyObject(avatar)){
           showToast('证件图片不能为空！')
           return
       }
       const {certObjChange} = this.props.params
        let obj = {
           realname,
            cert_no,
            avatar
        }
        certObjChange && certObjChange(obj)
        router.pop()
    }

    render() {
        const {realname,cert_no,avatar} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: "#ECECEE", flexDirection: 'column'}}>
                <ScrollView style={{flex: 1, backgroundColor: "#ECECEE", flexDirection: 'column'}}>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                        <View style={styles.message_view}>
                            <Text style={styles.message_text}>{global.lang.t('truth_name')}</Text>
                            <TextInput
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    paddingLeft: 0,
                                    marginLeft: 8,
                                    width: '67%',
                                    height: 50,
                                    fontSize: 16,
                                    color: '#666666',
                                }}
                                maxLength={25}
                                numberOfLines={1}
                                placeholderTextColor={'#CCCCCC'}
                                placeholder={global.lang.t('input_truth_name')}
                                clearTextOnFocus={true}
                                underlineColorAndroid={'transparent'}
                                value={realname.trim()}
                                onChange={txt => {
                                    this.setState({
                                        realname: txt.nativeEvent.text
                                    })

                                }}
                            />
                        </View>
                        <View style={[styles.message_view, {marginTop: 1}]}>
                            <Text style={styles.message_text}>{global.lang.t('cer_no')}</Text>
                            <TextInput
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    paddingLeft: 0,
                                    marginLeft: 8,
                                    width: '67%',
                                    height: 50,
                                    fontSize: 16,
                                    color: '#666666'
                                }}
                                numberOfLines={1}
                                placeholderTextColor={'#CCCCCC'}
                                placeholder={global.lang.t('input_cer_no')}
                                clearTextOnFocus={true}
                                underlineColorAndroid={'transparent'}
                                value={cert_no.trim()}
                                onChange={txt => {
                                    this.setState({
                                        cert_no: txt.nativeEvent.text
                                    })

                                }}
                            />
                        </View>
                    </KeyboardAvoidingView>

                    <Text style={styles.upload_text}>{global.lang.t('upload_text')}</Text>
                    <TouchableOpacity
                        onPress={()=>{
                            this.ActionSheet && this.ActionSheet.show()
                        }}
                        style={styles.example_view}>
                        <Image style={styles.example_img} source={isEmptyObject(avatar)?Images.example_upload:avatar}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', width: Metrics.screenWidth,alignSelf:'center'}}>
                        <View style={{width:px2dp(34)}}/>
                        <Text style={styles.upload_text2}>{global.lang.t('example')}</Text>
                        <View style={{width:px2dp(44)}}/>
                        <Image style={styles.example_img} source={Images.example_upload2}/>
                    </View>

                    <Text style={styles.upload_text3}>{global.lang.t('upload_prompt')}</Text>

                    <LinearGradient
                        colors={['#E1BB8D', '#8B6941']}
                        style={[{marginTop: px2dp(42)},styles.confirm_btn2]}>
                        <TouchableOpacity style={styles.confirm_btn2} onPress={this.comfirm}>
                            <Text style={{color: '#FFF', fontSize: 17}}>{global.lang.t('upload')}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={global.lang.t('chose_image')}
                        options={[global.lang.t('cancel'), global.lang.t('camera'), global.lang.t('pictures')]}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={2}
                        onPress={this.handlePress}
                    />

                </ScrollView>


            </View>
        )
    }
}
