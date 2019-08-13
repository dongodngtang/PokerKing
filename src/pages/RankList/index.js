import React, { Component } from 'react';
import { View,Text,Image,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import NotData from "../comm/NotData";
import {isEmptyObject, logMsg, unix_format} from "../../utils/utils";
import {getInfoList, initLoginUser} from "../../services/accountDao";
import {Images, Metrics,px2dp,px2sp} from "../../configs/Theme";
import styles from './index.style';
import ImageLoad from "../../components/ImageLoad";

@connect(({RankList}) => ({
  ...RankList,
}))
export default class RankList extends Component {
  

  componentDidMount(){
      this.props.navigation.setParams({
          onLeft: () => {
              this.props.params.refresh()
              router.pop()
          }
      });
  }

  render() {
      const {applies} = this.props.params;
      if (isEmptyObject(applies)) {
          return <NotData/>
      }
    return (
      <View style={{flex:1,backgroundColor:"#F5F0F0"}}>
          <UltimateFlatList
              style={{paddingTop:20}}
              ref={(ref) => this.listView = ref}
              onFetch={this.onFetch}
              separator={this._separator}
              keyExtractor={(item, index) => `instantList${index}`}
              item={this._renderItem}
              refreshableTitlePull={global.lang.t('pull_refresh')}
              refreshableTitleRelease={global.lang.t('release_refresh')}
              dateTitle={global.lang.t('last_refresh')}
              allLoadedText={global.lang.t('no_more')}
              waitingSpinnerText={global.lang.t('loading')}
              emptyView={() => <NotData/>}
          />
      </View>
    )
  }

    getTime=(created_at,type)=>{
        let race_start_time = global.localLanguage === 'en' ? `${global.lang.t(`month${month}`)}` + unix_format(created_at, type) :
            unix_format(created_at, `YYYY${global.lang.t('year')}MM${global.lang.t('month')}DD${global.lang.t('day2')}`);
        return race_start_time;
    }

    _separator = () => {
        return (
            <View
                style={{height: 20,  width: Metrics.screenWidth, alignSelf: 'center'}}/>
        )
    };

    _renderItem = (item, index) => {
        return (
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={styles.time_text}>{this.getTime(item.created_at,`MM DD,YYYY hh:mm`)}</Text>
                <View
                    key={`rank_list${index}`}
                    style={styles.item}>

                    <Text style={styles.title}>{global.lang.t('notice1')}<Text style={styles.title2}>{item.title}</Text></Text>
                    <Text style={styles.title3}>{'盲注300/600NLH '}<Text style={styles.title}> {global.lang.t('notice2')}</Text><Text style={styles.title4}> 5</Text><Text style={styles.title}> {global.lang.t('notice3')}</Text></Text>
                    <Text style={styles.title}>{global.lang.t('notice2')}</Text>
                </View>
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {applies} = this.props.params;
        try {
            startFetch(applies, 18)

        } catch (err) {
            abortFetch();
        }
    };
}
