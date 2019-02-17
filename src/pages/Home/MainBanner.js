import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';
import {Metrics} from '../../themes';
import {logMsg} from "../../utils/utils";
import {getBaseUrl} from "../../configs/fetch";



const Height = Metrics.reallySize(164)
export default class MainBanner extends Component {

    render() {
        let base_url = "";
        const {home_banners} = this.props;
        let base_urls = getBaseUrl();
        if(base_urls.indexOf('test') !== -1){
            base_url = "http://test.pokerking_cms.deshpro.com";
        }else{
            base_url = "http://pokerking_cms.deshpro.com";
        }
        if (home_banners && home_banners.length > 0)
            return (
                <View style={{height: Height,marginTop:-1}}>
                    <Swiper
                        activeDotStyle={stylesM.activeDot}
                        dotStyle={stylesM.dot}
                        autoplayTimeout={3}
                        autoplay>
                        {home_banners.map((item, key) => {
                            return <TouchableOpacity
                                key={`banner${item.source_id}`}
                                activeOpacity={1}>
                                <Image style={{height: Height, width: '100%'}} source={{uri: `${base_url}${item.image}`}}/>
                            </TouchableOpacity>

                        })}

                    </Swiper>
                </View>


            );
        else
            return <View style={{height: Height}}/>
    }


}

const stylesM = StyleSheet.create({
    activeDot: {
        backgroundColor: 'white',
        width: 18,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    }

});