import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ImagePicker from 'react-native-image-crop-picker';
import {Images} from "../../configs/Theme";
import {isStrNull, getCurrentDate, isEmptyObject} from "../../utils/utils";
import {ActionSheet} from '../../components';
import {uploadAvatar} from "../../services/accountDao";

const picker = {
    width: 500,
    height: 500,
    cropping: true,
    cropperCircleOverlay: true,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.5,
};

@connect(({ModifyData,common}) => ({
    ...ModifyData,
    ...common
}))
export default class ModifyData extends Component {

    constructor(props){
        super(props)

        const {profile} = props
        let avatar = isEmptyObject(profile)?Images.home_avatar:isStrNull(profile.avatar)?Images.home_avatar
            :{uri:"http://test.pokerking_api.deshpro.com"+profile.avatar}

        let genderTxt = profile.gender === 1?global.lang.t('male'):global.lang.t('female')
        if(profile.gender === 0)
            genderTxt = ''
        this.state = {
            avatar,
            genderTxt:genderTxt
        }
    }

    _getGender =(gender)=> {
        if(gender !== 0){
            this.gender = gender
            this.setState({
                genderTxt:gender === 1?global.lang.t('male'):global.lang.t('female')
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
        uploadAvatar(formData,ret=>{
            this.setState({
                avatar:{uri:"http://test.pokerking_api.deshpro.com"+ret.avatar}
            })
        });
    }

    _fileName = (o) => {
        let pos=o.lastIndexOf("/")
        return o.substring(pos+1);

    }




    selectPhotoTapped = () => {
        this.ActionSheet.show()
    };

    render() {
        const {avatar,genderTxt} = this.state
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
                            // onChangeText={text => {
                            //     const edit = profile;
                            //     edit.nick_name = text;
                            //
                            //
                            // }}
                            // placeholder={profile.nick_name ? '请输入昵称' : ''}
                            // defaultValue={profile.nick_name}
                                   testID="input_nick"/>
                        <View style={{flex: 1}}/>
                        <Image style={{height: 20, width: 10}}
                               source={Images.is_right}/>

                    </View>

                    <View style={styles.line2}/>

                    <TouchableOpacity activeOpacity={1}
                                      style={styles.item_view}
                                      onPress={()=>{
                                          this.actionGender && this.actionGender.show()
                                      }}
                                      >
                        <Text style={styles.text_label}>{global.lang.t('gender')}</Text>

                        <View style={{flex: 1}}/>
                        <Image style={{height: 20, width: 10}}
                               source={Images.is_right}/>
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
