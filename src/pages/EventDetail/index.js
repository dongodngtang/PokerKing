import React, { Component } from 'react';
import { View,Text,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {logMsg} from "../../utils/utils";
import styles from "./index.style";


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
            title: this.props.params.info.title
        })
    }

    componentDidMount() {
        const {id} = this.props.params.info;

    }

    render() {
        const {info_detail} = this.state;
        return (
            <ScrollView style={styles.detail_view}>

            </ScrollView>
        )
    }
}
