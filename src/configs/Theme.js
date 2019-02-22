/**
 * Theme.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/5/19.
 *
 */


import {Dimensions, Platform, StatusBar} from 'react-native';
import {reallySize} from "../themes/Metrics";

const {height, width} = Dimensions.get('window');
/**
 * 状态栏高度
 * @type {number}
 */
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? width === 375 && height === 812 ? 44 : 20 : 0;
/**
 * 导航栏高度
 * @type {number}
 */
const navBarHeight = Platform.OS === "ios" ? width === 375 && height === 812 ? 88 : 64 : 44;

/**
 * 底部导航栏高度
 * @type {number}
 */
const tabBarHeight = Platform.OS === "ios" ? width === 375 && height === 812 ? 84 : 50 : 50;

export function realSize(size) {
    return size * width / 375;
}

/**
 * 内容高度
 * @type {number}
 */
const PartHeight = height - (Platform.OS === 'android' ? navBarHeight + StatusBar.currentHeight : navBarHeight);

export const Metrics = {
    reallySize: reallySize,
    screenHeight: height,
    screenWidth: width,
    navBarHeight: navBarHeight,
    statusBarHeight: STATUSBAR_HEIGHT,
    PartHeight: PartHeight,
    tabBarHeight: tabBarHeight,
    toolbar: {
        height: 44,
        paddingTop: Platform.Version >= 21 ? 20 : 0,
        //barColor: favoriteColor,
        titleColor: 'white',
        titleSize: 18,
        textBtnSize: 15
    }
}

export const Images = {
    left_back: require('../asserts/left_back.jpg'),
    gray_feed: require('../asserts/races/gray_feed.png'),
    bottom: require('../asserts/home/bottom.png'),
    close: require('../asserts/home/close.png'),
    feiji: require('../asserts/home/feiji.png'),
    homepage_side: require('../asserts/home/homepage_side.png'),
    is_bottom: require('../asserts/home/is_bottom.png'),
    is_right: require('../asserts/home/is_right.png'),
    is_top: require('../asserts/home/is_top.png'),
    left: require('../asserts/home/left.png'),
    rili: require('../asserts/home/rili.png'),
    rili_gray: require('../asserts/home/rili_gray.png'),
    top: require('../asserts/home/top.png'),
    wenti: require('../asserts/home/wenti.png'),
    xiugaiziliao: require('../asserts/home/xiugaiziliao.png'),
    yduigantanhaoshixin: require('../asserts/home/yduigantanhaoshixin.png'),
    yijian: require('../asserts/home/yijian.png'),
    zixun: require('../asserts/home/zixun.png'),
    ziyuan: require('../asserts/home/ziyuan.png'),
    other_more: require('../asserts/other_more.png'),
    race_img: require('../asserts/race_img.png'),
    xianjinzhuo: require('../asserts/xianjinzhuo.png'),
    home_avatar: require('../asserts/home/home_avatar.png'),
    jinsha: require('../asserts/jinsha.png'),
    weini: require('../asserts/weini.png'),
    close_block: require('../asserts/close.png'),
    load_no_data: require('../asserts/load/load_no_data.png'),
    empty_bg: require('../asserts/empty_ticket.png'),
    web_left: require('../asserts/web_left.png'),
    web_right: require('../asserts/web_right.png'),
    web_refresh: require('../asserts/web_refresh.png'),
    web_page: require('../asserts/web_page.png'),
    shuhcu: require('../asserts/shuhcu.png'),
    jiegou: require('../asserts/jiegou.png'),
    right_gray: require('../asserts/right_gray.png'),
    default_bg: require('../asserts/default_bg.png'),
    delete_img: require('../asserts/delete.png'),
    add_image: require('../asserts/add_image.png'),
    question_bottom: require('../asserts/question_bottom.png')


}


export const Colors = {
    _06c: '#06c8d0',
    _000: "#000000",
    _ECE: "#ECECEC",//背景色
    _333: '#333333',
    _666: '#666666',
    _999: '#999999',
    _D1D: '#D1D1D1',
    _3CB: '#3CB371',
    _00F: '#00FF00',
    _FF8: '#FF8C00',
    _02A: '#02A9EA',
    _009: '#0090C1',
    _CD5: '#CD5D67',
    _494: '#494949',//一级标题
    _818: "#818181",//二级标题
    _AEA: "#AEAEAE",//一级内容
    _B5B: "#B5B5B5",//二级内容
    _D8D: "#D8D8D8",//三级内容
    _00B: "#00BD70",//主颜色
    _BBBB: '#BBBBBB',
    _E5E5: '#E5E5E5',
    txt_666: '#666666',
    _E54: '#E54A2E',
    _CCC: '#CCCCCC',
}

export const Styles = {
    row_center: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column_center: {
        alignItems: 'center'
    },
    flex_center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ECECEC'
    },
    navTop: {
        height: isIphoneX ? Metrics.navBarHeight + 10 : Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#13151C',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    left: {
        height: 44,
        justifyContent: 'center',
        width: 70,
        paddingRight: 10,
        paddingLeft: 17
    },
    navTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    right: {
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        height: 44,
        alignItems: 'center',
        paddingLeft: 17,
        width: 90
    }
}


export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height >= 812 || dimen.width >= 812)
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight
    });
}
  
  