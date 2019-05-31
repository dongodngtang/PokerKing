import React, {Component} from 'react';
import {View, Text, Image,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Pdf from 'react-native-pdf';
import {Metrics} from "../../configs/Theme";
import {isStrNull, logMsg} from "../../utils/utils";
import NotData from "../comm/NotData";

@connect(({Structure}) => ({
    ...Structure,
}))
export default class Structure extends Component {


    componentDidMount() {

    }

    render() {
        const {pdf} = this.props.params;
        if(isStrNull(pdf)){
            return <NotData/>
        }
        const source = {uri: this.props.params.pdf, cache: true};
        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    loadProgress={(p=>{logMsg(p)})}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom:50
    },
    pdf: {
        flex: 1,
        width: Metrics.screenWidth,
    }
});
