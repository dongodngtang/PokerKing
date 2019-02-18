import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ImagePicker from 'react-native-image-crop-picker';
import {Images} from "../../configs/Theme";
import {isStrNull, getCurrentDate, isEmptyObject, showToast, logMsg} from "../../utils/utils";
import {ActionSheet} from '../../components';
import {putProfile, uploadAvatar} from "../../services/accountDao";

const picker = {
    width: 500,
    height: 500,
    cropping: true,
    cropperCircleOverlay: true,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.5,
};

@connect(({ModifyData,Home}) => ({
    ...ModifyData,
    ...Home
}))
export default class ModifyData extends Component {

    constructor(props) {
        super(props)

        const {profile} = props
        let avatar = isEmptyObject(profile) ? Images.home_avatar : isStrNull(profile.avatar) ? Images.home_avatar
            : {uri: profile.avatar}

        let genderTxt = profile.gender === '1' ? global.lang.t('male') : global.lang.t('female')
        if (profile.gender === '0')
            genderTxt = global.lang.t('gender')

        this.inputNick = profile ? profile.nickname : '';
        this.inputMail = profile ? profile.email : ''
        this.gender = profile.gender
        this.state = {
            avatar,
            genderTxt: genderTxt,
            nickname: this.inputNick,
            email: this.inputMail,
            avatar_modify: false,
            gender_modify: false
        }

        props.navigation.setParams({
            onLeft: () => {
                let edit = {}
                if (profile.nickname !== this.inputNick) {
                    edit.nickname = this.inputNick
                }
                if (profile.email !== this.inputMail) {
                    edit.email = this.inputMail
                }
                edit.gender = this.gender
                putProfile(edit, ret => {
                    router.pop();
                    if (profile.nickname !== this.inputNick || profile.email !== this.inputMail ||
                        this.state.gender_modify || this.state.avatar_modify) {
                    }
                }, err => {
                    router.pop()
                })

            }
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

    _update = (image) => {
        let formData = new FormData();
        let file = {
            uri: image.path,
            name: this._fileName(image.path)
        };
        formData.append("avatar", file);
        uploadAvatar(formData, ret => {
            this.setState({
                avatar: {uri:ret.avatar},
                avatar_modify: true
            })
        });
    }

    _fileName = (o) => {
        let pos = o.lastIndexOf("/")
        return o.substring(pos + 1);

    }


    selectPhotoTapped = () => {
        this.ActionSheet.show()
    };

    render() {
        const {avatar, genderTxt, nickname, email} = this.state
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
                            marginRight: 35
                        }}>
                            <Image style={{
                                height: 64, width: 64,
                                borderRadius: 32
                            }}
                                   source={avatar}
                            />
                        </View>


                        <Image style={{height: 20, width: 10}}
                               source={Images.is_right}/>


                    </TouchableOpacity>
                    <View style={styles.line2}/>
                    <View style={styles.item_view}>

                        <Text style={styles.text_label}>{global.lang.t('nick')}</Text>
                        <TextInput style={[styles.text_value, {marginRight: 17}]}
                                   clearTextOnFocus={true}
                                   maxLength={8}
                                   returnKeyType={'done'}
                                   placeholderTextColor={"#666666"}
                                   underlineColorAndroid='transparent'
                                   onChangeText={text => {
                                       this.inputNick = text
                                   }}
                                   placeholder={nickname}
                                   testID="input_nick"/>

                        <Image style={{height: 20, width: 10}}
                               source={Images.is_right}/>

                    </View>

                    <View style={styles.line2}/>

                    <TouchableOpacity activeOpacity={1}
                                      style={styles.item_view}
                                      onPress={() => {
                                          this.actionGender && this.actionGender.show()
                                      }}
                    >
                        <Text style={styles.text_label}>{global.lang.t('gender')}</Text>
                        <Text style={styles.text_label}>{this.state.genderTxt}</Text>

                        <View style={{flex: 1}}/>
                        <Image style={{height: 20, width: 10}}
                               source={Images.is_right}/>
                    </TouchableOpacity>

                    <View style={styles.line2}/>
                    <View style={styles.item_view}>

                        <Text style={styles.text_label}>{global.lang.t('mailbox')}</Text>
                        <TextInput style={[styles.text_value, {marginRight: 17}]}
                                   clearTextOnFocus={true}
                                   maxLength={20}
                                   returnKeyType={'done'}
                                   placeholderTextColor={"#666666"}
                                   underlineColorAndroid='transparent'
                                   onChangeText={text => {
                                       this.inputMail = text
                                   }}
                                   placeholder={email}
                                   testID="input_mailbox"/>

                        <Image style={{height: 20, width: 10}}
                               source={Images.is_right}/>

                    </View>
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

            </View>
        )
    }

    handlePress = (i) => {
        switch (i) {
            case 1:
                ImagePicker.openCamera(picker).then(image => {
                    this._update(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
                break;
            case 2: {
                ImagePicker.openPicker(picker).then(image => {
                    this._update(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
            }
        }
    };
}
