import React, { Component } from 'react';
import { View,Text,Image,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import NotData from "../comm/NotData";
import {logMsg, unix_format} from "../../utils/utils";
import {getInfoList, initLoginUser} from "../../services/accountDao";
import {Images, Metrics,px2dp,px2sp} from "../../configs/Theme";
import styles from './index.style';
import ImageLoad from "../../components/ImageLoad";

@connect(({RankList}) => ({
  ...RankList,
}))
export default class RankList extends Component {
  

  componentDidMount(){

  }

  render() {
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

    _separator = () => {
        return (
            <View
                style={{height: 20,  width: Metrics.screenWidth, alignSelf: 'center'}}/>
        )
    };

    _renderItem = (item, index) => {
        return (
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={styles.time_text}>{`2109年5月30日 13:34`}</Text>
                <View
                    key={`rank_list${index}`}
                    style={styles.item}>

                    <Text style={styles.title}>{'您所参加的 '}<Text style={styles.title2}>扑克王威尼斯扑克房 </Text></Text>
                    <Text style={styles.title3}>{'盲注300/600NLH '}<Text style={styles.title}> 前面还有</Text><Text style={styles.title4}> 5</Text><Text style={styles.title}> 位在排队等候！</Text></Text>
                    <Text style={styles.title}>请及时赶往现场办理入场手续！ </Text>
                </View>
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            startFetch([1,2,3,4,5,6], 18)

        } catch (err) {
            abortFetch();
        }
    };
}
