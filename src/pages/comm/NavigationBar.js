import React from "react";
import {Image, Text, TouchableOpacity, View,StyleSheet,SafeAreaView} from "react-native";
import {Images, Metrics, px2dp} from "../../configs/Theme";


const NavigationBar = ({title,leftOnPress,rightOnPress})=>(
  <View style={{}}>
      <SafeAreaView forceInset={{ top: 'always' }}/>
      <View style={styles.navTop}>
          <TouchableOpacity
              onPress={() => leftOnPress && leftOnPress()}
              style={styles.left2}>
              <Image
                  style={{height: px2dp(48), width: px2dp(120)}}
                  source={Images.puke_icon}
              />

          </TouchableOpacity>
          <TouchableOpacity
              style={styles.navTitle}>
              <Image style={{height: px2dp(44), width: px2dp(32),marginRight:5}} source={Images.hot_races}/>
              <Text
                  style={{fontSize: 17, color: '#FFE9AD'}}
                  numberOfLines={1}>{title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => rightOnPress && rightOnPress()}
              style={styles.right2}>
              <Image
                  style={{height: px2dp(38), width: px2dp(36)}}
                  source={Images.setting}
              />

          </TouchableOpacity>
      </View>
  </View>
)

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1A1B1F'
    },
    navTop: {
        height:44,
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left2: {
        // height: 44,
        paddingLeft: 17,
        justifyContent: 'center'
    },
    right2: {
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        alignItems: 'center',
        paddingLeft: 17,
        paddingRight: 42
    },
    navTitle: {
        flex: 1,
        marginLeft:10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'center',
        justifyContent: 'center'
    },
})

export default NavigationBar