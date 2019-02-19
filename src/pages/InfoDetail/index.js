import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {getInfoDetail} from '../../services/accountDao'
import {isEmptyObject, logMsg} from "../../utils/utils";
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
            // title: this.props.params.info.title
        })
    }

    componentDidMount() {
        const {id} = this.props.params;
        getInfoDetail({id: id}, data => {
            logMsg("info_detail", data);
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
