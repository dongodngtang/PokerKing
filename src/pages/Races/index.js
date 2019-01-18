import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Styles} from "../../configs/Theme";

@connect(({Races}) => ({
    ...Races,
}))
export default class Races extends Component {


    componentDidMount() {

    }

    topBar=()=>{
        return(
            <View style={styles.navTop}>
                <TouchableOpacity
                    onPress={() => {
                        router.pop()
                    }}
                    style={Styles.left}>
                    <Image
                        style={{height: 14, width: 18}}
                        source={Images.left_back}
                    />

                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.navTitle}>
                    <Text
                        style={{fontSize: 18, color: '#FFE9AD'}}>OPC</Text>

                </TouchableOpacity>
                <View style={{flex: 1}}/>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.topBar()}
                <Text>Races</Text>
            </View>
        )
    }
}
