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

@connect(({InstantList}) => ({
  ...InstantList,
}))
export default class InstantList extends Component {
  

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
               <TouchableOpacity
                   key={`instants_list${index}`}
                   style={styles.item}>
                   <ImageLoad style={styles.img}
                              source={{uri:item.img}}/>
                   <View style={styles.content}>
                       <Text style={styles.title}>{'TPTS中扑免费专属赛，20万奖池门票等你抢！'}</Text>
                       <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 5}}>
                           <Text style={[styles.time, {marginLeft: px2dp(14)}]}>{`#TPTS`}</Text>
                           <Text style={[styles.time, {marginLeft: px2dp(28)}]}>{unix_format(1562121862, "MM DD,YYYY")}</Text>
                           <View style={{flex: 1}}/>
                           <Image style={{height: px2dp(46), width: px2dp(46), marginRight: px2dp(36)}}
                                  source={Images.collection_gray}/>
                           <TouchableOpacity>
                               <Image style={{height: px2dp(32), width: px2dp(40), marginRight: px2dp(20)}}
                                      source={Images.share_gray}/>
                           </TouchableOpacity>

                       </View>

                   </View>

               </TouchableOpacity>
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
