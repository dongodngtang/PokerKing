import React, {Component} from 'react';
import {View, Text,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {getInfoDetail} from '../../services/accountDao'
import {logMsg} from "../../utils/utils";

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
            title: this.props.params.info.title
        })
    }

    componentDidMount() {
        const {id} = this.props.params.info;
        getInfoDetail({id: id}, data => {
            logMsg("info_detail", data);
            this.setState({
                info_detail: data.info
            })
        })
    }

    render() {
        const {info_detail} = this.state;
        return (
            <ScrollView style={styles.detail_view}>

            </ScrollView>
        )
    }
}
