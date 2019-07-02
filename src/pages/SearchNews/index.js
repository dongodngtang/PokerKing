import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images} from "../../configs/Theme";
import SearchBar from '../comm/SearchBar'

@connect(({SearchNews}) => ({
    ...SearchNews,
}))
export default class SearchNews extends Component {

    state = {
        search: true,
        show_content: true,
        reject_problem: ''
    };

    refresh = () => {
        this.setState({
            reject_problem: ''
        });
        this.listView && this.listView.refresh();
    };


    componentDidMount() {

    }

    topBar = () => {
        return (
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.btn_search}
                    onPress={() => {
                        router.pop()
                    }}>

                    <Image
                        style={{height: 19, width: 11, marginLeft: 17, marginRight: 17}}
                        source={Images.left}/>

                </TouchableOpacity>
                {this.state.search ? null : <View style={{flex: 1}}/>}
                {this.state.search ? <SearchBar
                    keyword={keyword => {
                        this.keyword = keyword;
                        // this.listView && this.listView.refresh()

                    }}/> : <Text style={styles.nar_text} numberOfLines={1}>2019</Text>}
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={[styles.btn_search, {marginLeft: 17}]}
                    onPress={() => {
                        this.setState({
                            search: !this.state.search
                        })
                        this.keyword = undefined;
                        // this.listView && this.listView.refresh()
                    }}>
                    <Text style={styles.cancel_text}>{global.lang.t('cancel')}</Text>

                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                {this.topBar()}
                <Text>SearchNews</Text>
            </View>
        )
    }
}
