import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {isEmptyObject, logMsg, shareTo} from "../../utils/utils";
import styles from "./index.style";
import {getEventDetail} from '../../services/raceDao'
import {Metrics} from "../../configs/Theme";
import RenderHtml from '../comm/RenderHtml';
import NotData from "../comm/NotData";
import {getBaseUrl} from "../../configs/fetch";

@connect(({EventDetail}) => ({
    ...EventDetail,
}))
export default class EventDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event_detail: {}
        };
        props.navigation.setParams({
            onRight: () => {
                let param = {
                    shareTitle: '【澳门旅行APP】下载后免费抽奖，最高可获得iPhone XS！',
                    shareText: '在这里，可以随时随地找美食、定酒店！更有幸运大转盘——百万大奖等你拿！',
                    shareImage: 'http://kkh5.deshpro.com/images/default_img.png',
                    shareLink: `${getBaseUrl()}/main_events/${this.props.params.event_id}/infos/${this.props.params.id}`
                };
                shareTo(param)
                logMsg('分享')

            }
        })
    }

    componentDidMount() {
        const {id, event_id} = this.props.params;
        getEventDetail({event_id: event_id, id: id}, data => {
            logMsg("event_detail", data);
            this.props.navigation.setParams({
                title: data.info.title
            });
            this.setState({
                event_detail: data.info
            })
        })
    }

    render() {
        const {event_detail} = this.state;
        if (isEmptyObject(event_detail)) {
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
                        html={event_detail.description}/>
                </View>
            </ScrollView>
        )
    }
}
