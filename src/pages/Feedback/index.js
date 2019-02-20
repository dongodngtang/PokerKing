import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {postFeedBacks} from '../../services/accountDao'
import {logMsg, showToast, strNotNull,isStrNull,fileName} from "../../utils/utils";
import ImagePicker from 'react-native-image-crop-picker';
import ImageLoad from "../../components/ImageLoad";

const picker = {
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.4,
};

@connect(({Feedback}) => ({
    ...Feedback,
}))
export default class Feedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
            app_list: [{id: 0, isSelect: false, name: global.lang.t('not_satisfied')}, {
                id: 1,
                isSelect: false,
                name: global.lang.t('general')
            }, {
                id: 2,
                isSelect: false,
                name: global.lang.t('satisfied')
            }, {
                id: 3,
                isSelect: true,
                name: global.lang.t('very_satisfied')
            }],
            images:[]
        };
        this.mailbox = '';
        this.report_problem = ''
    }


    componentDidMount() {

    };

    _check = () => {
        const {app_list,images} = this.state;
        let sense = 3;
        app_list.forEach((x) => {
            if (x.isSelect === true) {
                sense = x.id
            }
        });
        if(isStrNull(this.mailbox)){
            showToast("请填写邮箱")
        }else if(isStrNull(this.report_problem)){
            showToast("请填写报告问题")
        }else {
            let formData = new FormData();

             images.forEach(img=>{
                let item = {
                    uri: img,
                    name: fileName(img)
                }
                formData.append('images[]',item)
            })


            formData.append('content',this.report_problem)
            formData.append('email',this.mailbox)
            formData.append('sense',sense)


            postFeedBacks(formData,data=>{
                logMsg("feedbacks",data)
                showToast('提交成功');
                router.pop();
            },err=>{
                showToast(err)
            })
        }
    };

 localFilePath =(path)=> {
        if (Platform.OS === 'android')
            return 'file://' + path;
        return path;
    }

    render() {
        const {app_list,images} = this.state;
        return (
            <View style={styles.feedback_view}>
                <View style={styles.feedback_view2}>
                    <Text style={styles.answer_question}>{global.lang.t('answer_question')}</Text>
                    <Text style={styles.your_mailbox}>{global.lang.t('your_mailbox')}</Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        onChangeText={txt => {
                            this.mailbox = txt
                        }}
                        style={styles.input}/>
                    <Text style={[styles.your_mailbox, {
                        marginTop: 22,
                        marginBottom: 17
                    }]}>{global.lang.t('poker_TV_app')}</Text>
                    <View style={[styles.list_view, {fontSize: 14}]}>
                        {app_list.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => {
                                    app_list.forEach((x) => {
                                        x.isSelect = item.id ===x.id
                                    });
                                    this.setState({
                                        app_list: [...app_list]
                                    });
                                }}
                                                  style={{marginRight: 20}}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: item.isSelect ? "#4A90E2" : "#888888"
                                    }}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <Text style={[styles.your_mailbox, {
                        marginTop: 26
                    }]}>{global.lang.t('report_problem')}</Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        onChangeText={report_problem => {
                            this.report_problem = report_problem
                        }}
                        multiline={true}
                        style={[styles.input, {height: 112}]}/>

                    <Text style={[styles.your_mailbox, {
                        marginTop: 28,
                        marginBottom: 7
                    }]}>{global.lang.t('upload_photos')}</Text>

                    <TouchableOpacity
                        onPress={()=>{
                            if(images && images.length<3){
                                ImagePicker.openPicker(picker).then(image => {
                                    images.push(image.path)
                                    this.setState({
                                        images
                                    })

                                }).catch(e => {
                                    // Alert.alert(e.message ? e.message : e);
                                });
                            }else{
                                showToast('最多上传3张图片')
                            }

                        }}
                        style={styles.browse_documents_btn}>
                        <Text style={styles.browse_documents}>{global.lang.t('browse_documents')}</Text>
                    </TouchableOpacity>

                    <View style={{height:80,flexDirection:'row',alignItems: 'center',marginTop:5}}>
                        {images.length>0 && images.map((img,index)=>{
                            return <View style={{marginRight: 10}}
                            key={`img_${index}`}>
                                <Text onPress={()=>{
                                    delete images[index]
                                    this.setState({
                                        images
                                    })
                                }}
                                    style={{position:'absolute',right:-5,top:-5}}>删除</Text>
                                <ImageLoad style={{height:70,width: 60}}
                                source={{uri:this.localFilePath(img)}}/>
                            </View>
                        })}


                    </View>
                </View>

                <TouchableOpacity style={styles.bottom_btn} onPress={() => {
                    this._check()
                }}>
                    <Text style={[styles.browse_documents, {fontSize: 14}]}>{global.lang.t("send_feedback")}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
