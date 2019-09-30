import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics, px2dp} from "../../configs/Theme";
import {register} from "../../services/accountDao";
import {isStrNull, showToast} from "../../utils/utils";


@connect(({UploadDocument}) => ({
    ...UploadDocument,
}))
export default class UploadDocument extends Component {

    state = {
        truth_name: '',
        cer_no: ''
    }


    componentDidMount() {

    }

    render() {
        const {truth_name,cer_no} = this.state;
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
                                value={truth_name.trim()}
                                secureTextEntry={this.state.truth_name}
                                onChange={txt => {
                                    this.setState({
                                        truth_name: txt.nativeEvent.text
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
                                value={cer_no.trim()}
                                secureTextEntry={this.state.cer_no}
                                onChange={txt => {
                                    this.setState({
                                        cer_no: txt.nativeEvent.text
                                    })

                                }}
                            />
                        </View>
                    </KeyboardAvoidingView>

                    <Text style={styles.upload_text}>{global.lang.t('upload_text')}</Text>
                    <TouchableOpacity style={styles.example_view}>
                        <Image style={styles.example_img} source={Images.example_upload}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', width: Metrics.screenWidth,alignSelf:'center'}}>
                        <View style={{width:px2dp(34)}}/>
                        <Text style={styles.upload_text2}>{global.lang.t('example')}</Text>
                        <View style={{width:px2dp(44)}}/>
                        <Image style={styles.example_img} source={Images.example_upload2}/>
                    </View>

                    <Text style={styles.upload_text3}>{global.lang.t('upload_prompt')}</Text>

                    <TouchableOpacity style={styles.confirm_btn2} onPress={() => {

                    }}>
                        <Text style={{color: '#FFE9AD', fontSize: 17}}>{global.lang.t('upload')}</Text>
                    </TouchableOpacity>
                </ScrollView>


            </View>
        )
    }
}
