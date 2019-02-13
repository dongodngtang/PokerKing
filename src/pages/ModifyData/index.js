import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Metrics} from "../../configs/Theme";
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Images} from "../../configs/Theme";
import {isStrNull, getCurrentDate} from "../../utils/utils";
import {ActionSheet} from '../../components';

@connect(({ModifyData}) => ({
    ...ModifyData,
}))
export default class ModifyData extends Component {

    _getGender(gender) {
        switch (gender) {
            case 0:
                return global.lang.t('male');
            case 1:
                return global.lang.t('female');
            default:
                return '';
        }
    }


    componentDidMount() {

    }

    _update = (image) => {
        const {postAvatar} = this.props;
        let formData = new FormData();
        let file = {
            uri: image.path,
            type: 'image/jpeg',
            name: this._fileName(image.fileName)
        };
        formData.append("avatar", file);
        postAvatar(formData);
    }

    _fileName = (filename) => {
        if (isStrNull(filename)) {
            return filename;
        } else {
            return getCurrentDate() + '.jpg'
        }
    }




    selectPhotoTapped = () => {
        this.ActionSheet.show()
    };

    render() {
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
                                   source={Images.home_avatar}
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
                    onPress={this.handlePress}
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
