import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {isEmptyObject, logMsg} from "../../utils/utils";
import styles from "./index.style";
import {getEventDetail} from '../../services/raceDao'
import {Metrics} from "../../configs/Theme";
import RenderHtml from '../comm/RenderHtml';
import NotData from "../comm/NotData";

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
            // title: this.props.params.info.title
        })
    }

    componentDidMount() {
        const {id, event_id} = this.props.params;
        getEventDetail({event_id: event_id, id: id},data=>{
            logMsg("event_detail",data)
            this.setState({
                event_detail:data.info
            })
        })
    }

    render() {
        const {event_detail} = this.state;
        if(isEmptyObject(event_detail)){
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
                        html={event_detail.description}/>
                </View>
            </ScrollView>
        )
    }
}
