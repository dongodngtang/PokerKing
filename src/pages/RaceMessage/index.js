import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Metrics} from "../../configs/Theme";
import RenderHtml from '../comm/RenderHtml';

@connect(({RaceMessage}) => ({
    ...RaceMessage,
}))
export default class RaceMessage extends Component {


    componentDidMount() {

    }

    render() {
        const {description} = this.props.params;
        return (
            <ScrollView style={styles.message_view}>
                <View style={{
                    marginTop: 20,
                    marginLeft: 18,
                    marginRight: 18,
                    paddingBottom: 80,
                    width: Metrics.screenWidth - 36
                }}>
                    <RenderHtml
                        html={description}/>
                </View>
            </ScrollView>
        )
    }
}
