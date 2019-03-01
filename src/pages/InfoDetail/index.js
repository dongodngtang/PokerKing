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
            info_detail: {}
        };
    }

    componentDidMount() {
        const {id} = this.props.params;
        getInfoDetail({id: id}, data => {
            logMsg("info_detail", data);
            this.props.navigation.setParams({
                title: data.info.title,
                onRight: () => {
                    let param = {
                        shareLink: `${shareHost()}/infos/${this.props.params.id}`,
                        shareTitle: data.info.title,
                        shareText: 'Pokerkinglive',
                        shareImage: data.info.image
                    };
                    shareTo(param)
                    logMsg('分享')

                }
            })
            this.setState({
                info_detail: data.info
            })
        })
    }

    render() {
        const {info_detail} = this.state;
        if (isEmptyObject(info_detail)) {
            return <NotData backgroundColor={'#FFFFFF'}/>
        }
        return (
            <ScrollView style={styles.detail_view}>
                <View style={{
                    marginTop: 20,
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
