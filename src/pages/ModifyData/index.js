import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Platform} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ImagePicker from 'react-native-image-crop-picker';
import {Images, px2dp} from "../../configs/Theme";
import {isStrNull, getCurrentDate, isEmptyObject, getAvatar, logMsg, showToast} from "../../utils/utils";
import {ActionSheet} from '../../components';
import {putProfile, uploadAvatar} from "../../services/accountDao";
import Permissions from "react-native-permissions";
import Loading from "../comm/Loading";

const picker = {
    width: 500,
    height: 500,
    cropping: true,
    cropperCircleOverlay: true,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.5,
};

@connect(({ModifyData, MinePage}) => ({
    ...ModifyData,
    ...MinePage
}))
export default class ModifyData extends Component {

    constructor(props) {
        super(props)

        let {profile} = props
        profile = profile || {}
        let avatar = isEmptyObject(profile) ? Images.home_avatar : isStrNull(profile.avatar) ? Images.home_avatar
            : {uri: profile.avatar}

        let genderTxt = profile.gender === '1' ? global.lang.t('male') : global.lang.t('female')
        if (profile.gender === '0')
            genderTxt = global.lang.t('gender')

        this.inputNick = profile ? profile.account : '';
        this.inputBith = profile ? profile.birthday : '';
        this.inputCountry = profile ? profile.country : '';
        this.inputCertNo = profile ? profile.cert_no : '';
        this.inputMail = profile ? profile.email : ''
        this.gender = profile.gender
        this.state = {
            avatar,
            genderTxt: genderTxt,
            user_account: this.inputNick,
            user_birth: this.inputBith,
            user_country: this.inputCountry,
            user_cert_no: this.inputCertNo,
            email: this.inputMail,
            avatar_modify: false,
            gender_modify: false
        }

        props.navigation.setParams({
            onLeft: () => {
                router.pop();
            },
            onRight: () => {
                let edit = {}
                let next = false
                if (profile.user_account !== this.inputNick) {
                    edit.user_account = this.inputNick
                }
                if (profile.email !== this.inputMail) {
                    edit.email = this.inputMail
                }
                if (profile.gender !== this.gender.toString()) {
                    edit.gender = this.gender
                }

                if(isEmptyObject(edit)){
                    if (this.state.avatar && this.state.avatar.uri && !this.state.avatar.uri.includes("http")) {
                        this.loading && this.loading.open()
                        this._update(this.state.avatar.uri,{})
                    }
                }else{
                    if (this.state.avatar && this.state.avatar.uri && !this.state.avatar.uri.includes("http")) {
                        this.loading && this.loading.open()
                        this._update(this.state.avatar.uri,edit)
                    }else{
                        this.putProfile(edit)
                    }
                }

            }
        });

    }

    putProfile = (edit) => {
        const {profile} = this.props;
        putProfile(edit, ret => {
            if (profile.email !== this.inputMail ||
                this.state.gender_modify) {
                this.loading && this.loading.close()
                showToast(global.lang.t('successfully_modified'))
                router.pop();
            }
        }, err => {
            this.loading && this.loading.close()
        })
    }

    _getGender = (gender) => {
        if (gender !== 0) {
            this.gender = gender
            this.setState({
                genderTxt: gender === 1 ? global.lang.t('male') : global.lang.t('female'),
                gender_modify: true
            })
        }
    }

    _update = (path,edit) => {
        let formData = new FormData();
        let file = {
            uri: path,
            name: this._fileName(path)
        };
        if (Platform.OS === 'android')
            file.type = 'image/jpeg'
        formData.append("avatar", file);
        uploadAvatar(formData, ret => {
            this.setState({
                avatar: {uri: ret.avatar},
                avatar_modify: true
            }, () => {

            })
            if(isEmptyObject(edit)){
                this.loading && this.loading.close()
                showToast(global.lang.t('successfully_modified'))
                router.pop();
            }else{
                this.putProfile(edit)
            }
        }, err => {
            this.loading && this.loading.close()
        });
        // this.loading && this.loading.close()
    }

    _fileName = (o) => {
        let pos = o.lastIndexOf("/")
        return o.substring(pos + 1);

    }


    selectPhotoTapped = () => {
        this.ActionSheet.show()
    };


    render() {
        const {profile} = this.props;
        const {nickname} = profile;
        const {avatar, genderTxt, user_account, email,user_birth,user_country,user_cert_no} = this.state
        return (
            <View style={styles.modifyData_view}>
                <View style={{paddingLeft: 20, paddingRight: 17, backgroundColor: "#FFFFFF"}}>
                    {/*头像*/}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{height: 111, flexDirection: 'row', alignItems: 'center'}}
                        onPress={this.selectPhotoTapped}>
                        <Text style={styles.text_label}>{global.lang.t('edit_avatar')}</Text>
                        <View style={{flex: 1}}/>
                        <View style={{
                            height: 64, width: 64, alignItems: 'center', justifyContent: 'center',
                            marginRight: px2dp(35)
                        }}>
                            <Image style={{
                                height: 64, width: 64,
                                borderRadius: 32,
                                borderColor: "#ECECEE", borderWidth: 4
                            }}
                                   source={getAvatar(avatar)}
                            />
                        </View>


                        <Image style={{height: 20, width: 10}}
                               source={Images.right_gray}/>


                    </TouchableOpacity>

                    {/*昵称 不可修改*/}
                    <View style={styles.line2}/>
                    <View style={styles.item_view}>
                        <Text style={styles.text_label}>{global.lang.t('username_EC')}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.text_value2}>{nickname}</Text>
                    </View>

                    {/*账号 可修改*/}
                    <View style={styles.line2}/>
                    <View style={styles.item_view}>

                        <Text style={styles.text_label}>{global.lang.t('userName')}</Text>
                        <View style={{flex: 1}}/>
                        <TextInput style={[styles.text_value, {marginRight: 17}]}
                                   clearTextOnFocus={true}
                                   maxLength={8}
                                   returnKeyType={'done'}
                                   placeholderTextColor={"#666666"}
                                   underlineColorAndroid='transparent'
                                   onChangeText={text => {
                                       this.inputNick = text
                                   }}
                                   placeholder={user_account}
                                   testID="input_nick"/>

                        <Image style={{height: 20, width: 10}}
                               source={Images.right_gray}/>

                    </View>

                    {/*出生日期 可修改*/}
                    <View style={styles.line2}/>
                    <TouchableOpacity activeOpacity={1} style={styles.item_view}>

                        <Text style={styles.text_label}>{global.lang.t('birth')}</Text>
                        <Text style={styles.text_label}>{this.state.user_birth}</Text>

                        <View style={{flex: 1}}/>
                        <Image style={{height: 20, width: 10}}
                               source={Images.right_gray}/>

                    </TouchableOpacity>

                    <View style={styles.line2}/>
                    <TouchableOpacity activeOpacity={1}
                                      style={styles.item_view}
                                      onPress={() => {
                                          this.actionGender && this.actionGender.show()
                                      }}
                    >
                        <Text style={styles.text_label}>{global.lang.t('gender')}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={[styles.text_label,{marginRight:17}]}>{this.state.genderTxt}</Text>
                        <Image style={{height: 20, width: 10}}
                               source={Images.right_gray}/>
                    </TouchableOpacity>

                    {/*邮箱 可修改*/}
                    <View style={styles.line2}/>
                    <View style={styles.item_view}>

                        <Text style={styles.text_label}>{global.lang.t('mailbox')}</Text>
                        <TextInput style={[styles.text_value, {marginRight: 17}]}
                                   clearTextOnFocus={true}
                                   returnKeyType={'done'}
                                   placeholderTextColor={"#666666"}
                                   underlineColorAndroid='transparent'
                                   onChangeText={text => {
                                       this.inputMail = text
                                   }}
                                   placeholder={email}
                                   testID="input_mailbox"/>

                        <Image style={{height: 20, width: 10}}
                               source={Images.right_gray}/>

                    </View>

                    {/*国籍 可修改*/}
                    <View style={styles.line2}/>
                    <TouchableOpacity activeOpacity={1} style={styles.item_view}>

                        <Text style={styles.text_label}>{global.lang.t('country')}</Text>
                        <Text style={styles.text_label}>{this.state.user_country}</Text>

                        <View style={{flex: 1}}/>
                        <Image style={{height: 20, width: 10}}
                               source={Images.right_gray}/>

                    </TouchableOpacity>

                    {/*实名信息 不可修改*/}
                    <View style={styles.line2}/>
                    <TouchableOpacity activeOpacity={1} style={styles.item_view}>

                        <Text style={styles.text_label}>{global.lang.t('cert_message')}</Text>
                        <Text style={styles.text_label}>{this.state.user_cert_no}</Text>

                        <View style={{flex: 1}}/>
                        <Image style={{height: 20, width: 10}}
                               source={Images.right_gray}/>

                    </TouchableOpacity>

                </View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={global.lang.t('chose_image')}
                    options={[global.lang.t('cancel'), global.lang.t('camera'), global.lang.t('pictures')]}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={this.handlePress}
                />
                <ActionSheet
                    ref={o => this.actionGender = o}
                    title={global.lang.t('choose_gender')}
                    options={[global.lang.t('cancel'), global.lang.t('male'), global.lang.t('female')]}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={this._getGender}
                />

                <Loading
                    ref={ref => this.loading = ref}/>

            </View>
        )
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
}
