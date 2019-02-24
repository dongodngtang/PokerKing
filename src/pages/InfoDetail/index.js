import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {getInfoDetail} from '../../services/accountDao'
import {isEmptyObject, logMsg, shareTo} from "../../utils/utils";
import RenderHtml from '../comm/RenderHtml';
import {Metrics} from "../../configs/Theme";
import NotData from '../comm/NotData'

@connect(({InfoDetail}) => ({
    ...InfoDetail,
}))
export default class InfoDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info_detail: {}
        };

        props.navigation.setParams({
            onRight: () => {
                let param = {
                    shareTitle: '【澳门旅行APP】下载后免费抽奖，最高可获得iPhone XS！',
                    shareText: '在这里，可以随时随地找美食、定酒店！更有幸运大转盘——百万大奖等你拿！',
                    shareImage: 'http://kkh5.deshpro.com/images/default_img.png',
                    shareLink: "https://kkh5.deshpro.com/loadApp"
                };
              shareTo(param)
                logMsg('分享')

            },
            rightTitle:'分享'
        })
    }

    componentDidMount() {
        const {id} = this.props.params;
        getInfoDetail({id: id}, data => {
            logMsg("info_detail", data);
            this.props.navigation.setParams({
                title: data.info.title
            })
            this.setState({
                info_detail: data.info
            })
        })
    }

    render() {
        const {info_detail} = this.state;
        if(isEmptyObject(info_detail)){
            return <NotData backgroundColor={'#FFFFFF'}/>
        }
        return (
            <ScrollView style={styles.detail_view}>
                <View style={{
                    marginTop: 20,
                    marginLeft: 18,
                    marginRight: 18,
                    paddingBottom: 80,
                    width:Metrics.screenWidth - 36
                }}>
                    <RenderHtml
                        html={info_detail.description}/>
                </View>
            </ScrollView>
        )
    }
}
