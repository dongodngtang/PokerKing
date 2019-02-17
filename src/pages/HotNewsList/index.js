import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Metrics} from "../../configs/Theme";
import HotItem from '../Home/HotItem';
import {initLoginUser, logMsg} from "../../utils/utils";
import {getInfoList} from "../../services/accountDao";

@connect(({HotNewsList}) => ({
  ...HotNewsList,
}))
export default class HotNewsList extends Component {
  

  componentDidMount(){

  };

    _separator = () => {
        return (
            <View
                style={{height: 1, backgroundColor: "#ECECEE", width: Metrics.screenWidth - 34, alignSelf: 'center'}}/>
        )
    };

    _renderItem = (item, index) => {
        return (
            <HotItem item={item}/>
        )
    };

  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
          <UltimateFlatList
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

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            initLoginUser(() => {
                getInfoList({
                    page,
                    page_size: 20
                }, data => {
                    logMsg("InfoList:", data)
                    startFetch(data.infos, 18)
                }, err => {
                    logMsg("reject:", err)
                    abortFetch()
                })
            })

        } catch (err) {
            abortFetch();
        }
    };
}
