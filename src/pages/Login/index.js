import React, {Component} from 'react';
import {View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ExtArea from '../comm/ExtArea';
import {Images, Metrics, Colors} from "../../configs/Theme";
import {isStrNull, logMsg, showToast} from "../../utils/utils";
import {verify, postCode, register, login, verify_code} from "../../services/accountDao";
import CountDownButton from '../../components/CountDownButton'
import TopMenu from "../../components/dropdown/TopMenu";
import SelectPiker from "../comm/SelectPiker";


@connect(({Login}) => ({
    ...Login,
}))
export default class Login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文'],
            ext: '86',
            areaName: global.lang.t('mainland'),
            data: {}
        };
        this.iphone = ''
        this.vcode = ''
        props.navigation.setParams({
            onRight: () => {
                this.selectPiker && this.selectPiker.toggle()
            }
        })
    };

    onPickerSelect = (index) => {
        this.setState({
            selectedItem: index,
        })
    };

    componentDidMount() {

    }

    _next = () => {

        const {ext} = this.state;
        let iphone = this.iphone
        let vcode = this.vcode
        if (iphone.length > 1 && vcode.length > 1 && !isStrNull(ext)) {
            //核查验证码是否正确
            verify_code({
                account: iphone,
                country_code: ext,
                option_type: 'login',
                vcode_type: 'mobile',
                vcode: vcode
            }, res => {
                // 查询该账户是否被注册过¶
                verify({
                    account: iphone,
                    country_code: ext
                }, ret => {
                    if (ret && ret.exist && ret.exist === 1) {
                        // 登录
                        login({
                            type: 'vcode',
                            mobile: iphone,
                            vcode,
                            country_code: ext
                        }, ret => {
                            showToast('登录成功')
                            this.props.navigation.popToTop()
                        }, err => {

                        })
                    } else {
                        // 注册
                        router.toRegister({
                            type: 'mobile',
                            mobile: iphone,
                            vcode,
                            country_code: ext
                        })

                    }

                }, err => {

                })
            })
        }
        else
            showToast(`${global.lang.t('fillWhole')}`);
    };


    render() {
        const CONFIG = [
            {
                type: 'subtitle',
                selectedIndex: 0,
                data: [
                    {title: global.lang.t('mainland'), subtitle: '86'},
                    {title: global.lang.t('hong_kong'), subtitle: '852'},
                    {title: global.lang.t('macao'), subtitle: '853'},
                    {title: global.lang.t('taiwan'), subtitle: '886'}
                ]
            }
        ];
        const {ext, areaName} = this.state;
        return (
            <View style={styles.container}>

                <Text style={styles.top_txt}>{global.lang.t('sign_vscode')}</Text>

                <View style={styles.areaView}>
                    {/*<Text*/}
                        {/*style={{width: 180, marginLeft: 8, height: 28, fontSize: 16, color: '#666666'}}>*/}
                        {/*{`${areaName} (+${this.state.ext})`}*/}
                    {/*</Text>*/}
                    {/*<View style={{flex: 1}}/>*/}
                    {/*<Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>*/}

                </View>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 230,
                                height: 50,
                                fontSize: 16,
                                color: '#444444'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('cellphone')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.iphone = txt
                            }}

                        />

                    </View>
                    <View style={styles.textView}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 160,
                                height: 35,
                                fontSize: 16,
                                color: '#444444'
                            }}
                            maxLength={6}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('vscode')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.vcode = txt
                            }}

                        />
                        <View style={{flex: 1}}/>
                        <View style={{height: 22, width: 1, backgroundColor: '#ECECEE', marginRight: 16}}/>
                        <CountDownButton
                            disableBg={'#F3F3F3'}
                            disableColor={'#747474'}
                            style={{
                                marginRight: 8,
                                height: 50,
                                backgroundColor: 'white'
                            }}
                            textStyle={styles.down_txt}
                            enable
                            onClick={counting => {
                                let iphone = this.iphone
                                if (isStrNull(iphone)) {
                                    showToast(global.lang.t('please_input_phone'))
                                    return
                                }
                                postCode({
                                    mobile: iphone,
                                    country_code: ext,
                                    option_type: 'login',
                                    vcode_type: "mobile",
                                }, data => {
                                    counting(true)
                                }, err => {
                                    showToast(err)
                                })

                            }}/>

                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity style={styles.btn} onPress={() => {
                    this._next();
                }}>
                    <Text style={{color: '#FFE9AD', fontSize: 18}}>{global.lang.t('login_continue')}</Text>
                </TouchableOpacity>

                <TopMenu config={CONFIG} onSelectMenu={this.onSelectMenu}/>

                <SelectPiker
                    ref={ref => this.selectPiker = ref}
                    onPickerSelect={this.onPickerSelect}
                    selectedItem={this.state.selectedItem}
                    itemList={this.state.itemList}/>
            </View>
        )
    };

    onSelectMenu = (index, subindex, data) => {
        this.setState({
            ext: data.subtitle,
            areaName: data.title
        });
    };

    // renderContent=()=>{
    //     return (
    //         <TouchableOpacity >
    //             <Text style={styles.text}>index:{this.state.index} subindex:{this.state.subindex} title:{this.state.data.title}</Text>
    //         </TouchableOpacity>
    //     );
    // };


    changed_ext = (code, name) => {
        this.setState({
            ext: code,
            areaName: name
        })
    }
}
