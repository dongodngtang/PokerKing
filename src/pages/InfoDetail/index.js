import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {getInfoDetail} from '../../services/accountDao'
import {logMsg} from "../../utils/utils";

@connect(({InfoDetail}) => ({
    ...InfoDetail,
}))
export default class InfoDetail extends Component {

    state = {
        info_detail: {}
    };

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
            <View style={styles.detail_view}>

            </View>
        )
    }
}
