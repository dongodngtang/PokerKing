import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics} from "../../configs/Theme";
import {register} from "../../services/accountDao";
import {isStrNull, showToast} from "../../utils/utils";


@connect(({UploadDocument}) => ({
    ...UploadDocument,
}))
export default class UploadDocument extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#ECECEE", flexDirection: 'column'}}>
                <Text style={styles.upload_text}>{global.lang.t('upload_text')}</Text>
                <TouchableOpacity style={styles.example_view}>
                    <Image style={styles.example_img} source={Images.example_upload}/>
                </TouchableOpacity>
                <View style={{flexDirection:'row',width:Metrics.screenWidth}}>
                    <Text style={styles.upload_text2}>{global.lang.t('example')}</Text>

                    <Image style={styles.example_img} source={Images.example_upload2}/>
                </View>

                <TouchableOpacity style={styles.confirm_btn2} onPress={() => {

                }}>
                    <Text style={{color: '#FFE9AD', fontSize: 17}}>{global.lang.t('upload')}</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
