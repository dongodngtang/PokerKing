import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {getInfoDetail} from '../../services/accountDao'
import {isEmptyObject, logMsg, shareHost, shareTo} from "../../utils/utils";
import RenderHtml from '../comm/RenderHtml';
import {Metrics} from "../../configs/Theme";
import NotData from '../comm/NotData'
import {getBaseUrl} from "../../configs/fetch";

@connect(({InfoDetail}) => ({
    ...InfoDetail,
}))
export default class InfoDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info_detail: {},
            err:false
        };
    }

    componentDidMount() {
       this.refresh()
    }

    refresh = ()=>{
        const {id} = this.props.params;
        getInfoDetail({id: id}, data => {
            logMsg("info_detail", data);
            this.props.navigation.setParams({
                title: data.info.title,
                onRight: () => {
                    let param = {
                        shareLink: `${shareHost()}/infos/${this.props.params.id}`,
                        shareTitle: data.info.title,
                        shareText: data.info.title,
                        shareImage: data.info.image
                    };
                    shareTo(param)
                    logMsg('分享')

                }
            })
            this.setState({
                info_detail: data.info
            })
        },err=>{
            this.setState({
                err:true
            })
        })
    }
    render() {
        const {info_detail,err } = this.state;
        if (isEmptyObject(info_detail) && err) {
            return <NotData
                onPress={()=>{
                    this.refresh()
                }}
                backgroundColor={'#FFFFFF'}/>
        }
        return (
            <ScrollView style={styles.detail_view}>
                <View style={{height:20}}/>
                <View style={{
                    marginLeft: 18,
                    marginRight: 18,
                    paddingBottom: 80,
                    width: Metrics.screenWidth - 36
                }}>
                    <RenderHtml
                        html={info_detail.description}/>
                </View>
            </ScrollView>
        )
    }
}
