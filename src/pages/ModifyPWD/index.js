import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, px2dp} from "../../configs/Theme";
import {strNotNull} from "../../utils/utils";

@connect(({ModifyPWD}) => ({
    ...ModifyPWD,
}))
export default class ModifyPWD extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_show: false,
            old_show: false
        }
        this.old_pwd = ''
        this.new_pwd = ''
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#161718"}}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={[styles.old_pwd_view, {marginTop: 5}]}>
                        <Text style={styles.left_text}>{global.lang.t('old_pwd')}</Text>
                        <View style={{flex: 1}}/>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                maxWidth: '60%',
                                height: 50,
                                fontSize: 14,
                                color: '#DDDDDD',
                                textAlign: 'right'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#DDDDDD'}
                            placeholder={global.lang.t('pwd_change')}
                            clearTextOnFocus={true}
                            autoCapitalize={'characters'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.old_pwd = txt

                            }}
                        />
                        {strNotNull(this.old_pwd) ?
                            <TouchableOpacity activeOpacity={1} style={{marginLeft: 28}} onPress={() => {
                                this.old_pwd = ''
                            }}>
                                <Image style={{width: px2dp(32), height: px2dp(32)}}
                                       source={Images.delete_pwd}/>
                            </TouchableOpacity> : null}

                        <TouchableOpacity activeOpacity={1} style={{marginLeft: 30, marginRight: 17}} onPress={() => {
                            this.setState({
                                old_show: !this.state.old_show
                            })
                        }}>
                            <Image style={{width: px2dp(36), height: this.state.old_show ? px2dp(34) : px2dp(18)}}
                                   source={this.state.old_show ? Images.set_eye : Images.set_eye_close}/>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.old_pwd_view, {marginTop: 1}]}>
                        <Text style={styles.left_text}>{global.lang.t('new_pwd')}</Text>
                        <View style={{flex: 1}}/>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                maxWidth: '60%',
                                height: 50,
                                fontSize: 14,
                                color: '#DDDDDD',
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#DDDDDD'}
                            clearTextOnFocus={true}
                            autoCapitalize={'characters'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.new_pwd = txt

                            }}
                        />
                        {strNotNull(this.old_pwd) ?
                            <TouchableOpacity activeOpacity={1} style={{marginLeft: 28}} onPress={() => {
                                this.old_pwd = ''
                            }}>
                                <Image style={{width: px2dp(32), height: px2dp(32)}}
                                       source={Images.delete_pwd}/>
                            </TouchableOpacity> : null}
                        <TouchableOpacity activeOpacity={1} style={{marginLeft: 30, marginRight: 17}} onPress={() => {
                            this.setState({
                                new_show: !this.state.new_show
                            })
                        }}>
                            <Image style={{width: px2dp(36), height: this.state.new_show ? px2dp(34) : px2dp(18)}}
                                   source={this.state.new_show ? Images.set_eye : Images.set_eye_close}/>
                        </TouchableOpacity>
                    </View>


                </KeyboardAvoidingView>
                <TouchableOpacity activeOpacity={1} style={styles.confirm_view}>
                    <Text style={styles.determine}>{global.lang.t('determine')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
