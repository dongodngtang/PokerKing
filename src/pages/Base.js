/**
 *作者：lorne
 *时间：2019/6/26
 *功能：
 */

import React, {Component} from 'react';
import {View, ScrollView, Text, RefreshControl, StyleSheet, StatusBar} from 'react-native';
import Loading from './comm/Loading'
import {logMsg} from "../utils/utils";
import PropTypes from 'prop-types';
import {NavBar} from "./index";

const StatusBarStyle = {
    default: 'default',
    lightcontent: 'light-content'
};


export default class Base extends Component {

    static propTypes = {
        showNav: PropTypes.bool,
        statusBarStyle: PropTypes.oneOf([StatusBarStyle.default, StatusBarStyle.lightcontent]),
    };

    state = {
        isRefreshing: false
    }

    static defaultProps = {
        statusBarStyle: StatusBarStyle.lightcontent,
    };

    open = () => {
        this.loading && this.loading.open()
    }

    close = () => {
        this.loading && this.loading.close()
    }

    render() {
        const {style, scrollable, pedding, onRefresh, isRefreshing, statusBarStyle, showNav} = this.props;
        if (scrollable) {
            return <View style={[{flex: 1, backgroundColor: '#1A1B1F'}, style]}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    refreshControl={this.renderRefreshControl()}>
                    <StatusBar barStyle={statusBarStyle}/>
                    {pedding ? <View style={[styles.flex_center, {flex: 1}]}>
                        <Text>加载中...</Text>

                    </View> : this.props.children}

                    <Loading
                        ref={ref => this.loading = ref}/>
                </ScrollView>

            </View>
        }
        return (
            <View style={[{flex: 1, backgroundColor: '#1A1B1F'}, style]}>
                <StatusBar barStyle={statusBarStyle}/>
                {showNav ? <NavBar {...this.props}/> : null}

                {pedding ? <View style={[styles.flex_center, {flex: 1}]}>
                    <Text>加载中...</Text>

                </View> : this.props.children}

                <Loading
                    ref={ref => this.loading = ref}/>

            </View>
        );
    }

    renderRefreshControl = () => {
        if (this.props.onRefresh)
            return (
                <RefreshControl
                    onRefresh={() => {
                        logMsg('下拉刷新')
                        this.props.onRefresh && this.props.onRefresh()
                        this.setState({
                            isRefreshing: true
                        })
                        setTimeout(() => {
                            this.setState({
                                isRefreshing: false
                            })

                        }, 1000)


                    }}
                    refreshing={this.state.isRefreshing}
                    colors={['dimgray', 'tomato', 'limegreen']}
                    progressBackgroundColor={'white'}
                    tintColor={'lightgray'}
                />
            )
        return null
    }
}

const styles = StyleSheet.create(({
    flex_center: {
        justifyContent: 'center',
        alignItems: 'center'
    }

}))


