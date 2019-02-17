import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {getInfoDetail} from '../../services/accountDao'
import {logMsg} from "../../utils/utils";
import Html from 'react-native-render-html';
import {Metrics} from "../../configs/Theme";

const stylesheet = {
    p: {
        color: "#444444",
        fontSize: 16,
        lineHeight:22,
        letterSpacing:1.5,
        paddingTop:0,
        paddingBottom:0
    },
    img:{
        marginTop:10,
        marginBottom:10,
        marginRight:18
    }
}

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
                <View style={{
                    marginTop: 20,
                    marginLeft: 18,
                    marginRight: 18,
                    paddingBottom: 80,
                    width:Metrics.screenWidth - 36
                }}>
                    <HTMLView
                        value={info_detail.description}
                        stylesheet={stylesheet}
                    />
                </View>
            </ScrollView>
        )
    }
}
