import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';
import {Metrics} from '../../themes';

const banners = [{
    source_id: 0,
    image: 'https://cdn-upyun.deshpro.com/kk/uploads/banner/3510d22b09c5ed9eae82b860cb4eeea5.png'
},{
    source_id: 1,
    image: 'https://cdn-upyun.deshpro.com/kk/uploads/banner/5b8614d7e0d1e32575134bf681a408fc.jpg'
},{
    source_id: 2,
    image: 'https://cdn-upyun.deshpro.com/kk/uploads/banner/64aaf57f7701d04761cedcc4210a7a65.jpg'
}];

const Height = Metrics.reallySize(164)
export default class MainBanner extends Component {

    render() {
        if (banners && banners.length > 0)
            return (
                <View style={{height: Height,marginTop:-1}}>
                    <Swiper
                        activeDotStyle={stylesM.activeDot}
                        dotStyle={stylesM.dot}
                        autoplayTimeout={3}
                        autoplay>
                        {banners.map((item, key) => {
                            return <TouchableOpacity
                                key={`banner${item.source_id}`}
                                activeOpacity={1}>
                                <Image style={{height: Height, width: '100%'}} source={{uri: item.image}}/>
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