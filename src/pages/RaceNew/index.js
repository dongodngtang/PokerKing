import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from "./index.style";
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Metrics} from "../../configs/Theme";
import HotItem from '../Home/HotItem';
import {getMainEventList} from '../../services/raceDao'
import {logMsg} from "../../utils/utils";

@connect(({RaceNew}) => ({
    ...RaceNew,
}))
export default class RaceNew extends Component {


    componentDidMount() {
    };

    _renderItem = (item, index) => {
        return (
            <HotItem item={item} type={'event'} event_id={this.props.params.event_id}/>
        )
    };

    render() {
        return (
            <View style={styles.raceNew_view}>
                <UltimateFlatList
                    style={{backgroundColor: 'white'}}
                    firstLoader={true}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    separator={this._separator}
                    keyExtractor={(item, index) => `hot_race${index}`}
                    item={this._renderItem}
                    refreshableTitlePull={global.lang.t('pull_refresh')}
                    refreshableTitleRelease={global.lang.t('release_refresh')}
                    dateTitle={global.lang.t('last_refresh')}
                    allLoadedText={global.lang.t('no_more')}
                    waitingSpinnerText={global.lang.t('loading')}
                    emptyView={() => <View/>}
                />
            </View>
        )
    }

    _separator = () => {
        return (
            <View
                style={{height: 1, backgroundColor: "#ECECEE", width: Metrics.screenWidth - 34, alignSelf: 'center'}}/>
        )
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            getMainEventList({
                event_id: this.props.params.event_id,
                page,
                page_size: 20
            }, data => {
                logMsg("eventList:", data)
                startFetch(data.infos, 18)
            }, err => {
                logMsg("reject:", err)
                abortFetch()
            })
        } catch (err) {
            abortFetch();
        }
    };
}
