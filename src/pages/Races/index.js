import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Styles} from "../../configs/Theme";
import Carousel from 'react-native-snap-carousel';
import {Metrics} from "../../configs/Theme";
import RaceModal from './RaceModal';

@connect(({Races}) => ({
    ...Races,
}))
export default class Races extends Component {

    state = {
        list_show: false
    }

    componentDidMount() {

    }

    topBar = () => {
        return (
            <View style={styles.navTop}>
                <TouchableOpacity
                    onPress={() => {
                        router.pop()
                    }}
                    style={styles.left2}>
                    <Image
                        style={{height: 14, width: 18}}
                        source={Images.left}
                    />

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navTitle}
                    onPress={() => {
                        this.raceModal && this.raceModal.toggle();
                    }}>
                    <Text
                        style={{fontSize: 18, color: '#FFE9AD'}}>OPC</Text>
                    <Image style={{width: 12, height: 6, marginLeft: 10}}
                           source={this.state.list_show ? Images.top : Images.bottom}/>
                </TouchableOpacity>
                <View style={{flex:1}}/>
            </View>
        )
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide_view}>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt}>{global.lang.t('race_time')}</Text>
                    <Text style={styles.race_time_txt}>99天02时23分34秒</Text>
                </View>
                <Image
                    style={styles.slide_img}
                    source={{uri: "https://cdn-upyun.deshpro.com/kk/uploads/banner/64aaf57f7701d04761cedcc4210a7a65.jpg"}}/>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt2}>OPC2019</Text>
                    <Text style={styles.race_time_txt}>2019年3月23日</Text>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.race_view}>
                {this.topBar()}
                <View style={styles.carousel_view}>
                    <Carousel
                        layout={'default'}
                        ref={(c) => {
                            this._carousel = c
                        }}
                        data={[1, 2, 3, 4, 5, 6]}
                        renderItem={this._renderItem}
                        sliderWidth={Metrics.screenWidth}
                        itemWidth={Metrics.screenWidth - 80}
                    />
                </View>
                {this._item(styles.item_view, Images.rili_gray, styles.img_dy,
                    'OPC2019赛程表', () => {
                        router.toRaceSchedule();
                    })}
                {this._item(styles.item_view, Images.zixun, styles.img_dy,
                    global.lang.t('race_message'), () => {


                    })}
                {this._item(styles.item_view, Images.ziyuan, styles.img_dy,
                    global.lang.t('race_news'), () => {
                        router.toRaceNew();
                    })}

                <RaceModal ref={ref => this.raceModal = ref}/>
            </View>
        )
    }

    _item = (itemStyle, img, imgStyle, title, onPress) => {
        const {profile} = this.props;
        return <TouchableOpacity
            activeOpacity={1}
            style={itemStyle} onPress={onPress}>
            <Image style={imgStyle} source={img}/>
            <Text style={styles.personalText}>{title}</Text>
            <View style={{flex: 1}}/>

            <Image style={styles.personalImg} source={Images.is_right}/>
        </TouchableOpacity>
    };
}
