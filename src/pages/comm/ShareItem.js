import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Clipboard
} from 'react-native';
import JShareModule from "jshare-react-native";

const DEVICE_WIDTH = Dimensions.get('window').width;
import {
    strNotNull, showToast, logMsg
} from '../../utils/utils';
import * as fs from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';



export default class ShareItem extends Component {

    static props = {
        item: null,//分享平台
        itemClick: null,//分享事件
        shareTitle: null,//分享标题
        shareText: null,//分享内容
        shareLink: null,//分享链接
        shareImage: null,//分享图片
        shareType: null,//分享的类型
    };


    //分享
    shareAction = async () => {
        let item = this.props.item;
        //是否允许分享
        let isAllowShare = true;

        let platform = item.platform;
        if (platform === "wechat_session" || platform === "wechat_timeLine") {
            //检查是否安装微信客户端
            JShareModule.isWeChatInstalled((isInstalled) => {
                if (isInstalled !== true) {
                    isAllowShare = false;
                    showToast(global.lang.t('unInstall_wechat'));
                }
            });
        }
        else if (platform === "facebook") {

            JShareModule.isFacebookInstalled((isInstalled) => {
                if (isInstalled !== true) {
                    isAllowShare = false;
                    showToast(global.lang.t('unInstall_facebook'));
                }
            });
        }else if (platform === "Twitter") {
            JShareModule.isTwitterInstalled((isInstalled) => {
                if (isInstalled !== true) {
                    isAllowShare = false;
                    showToast(global.lang.t('unInstall_twitter'));
                }
            });

        }else if (platform === "copy_link") {
            Clipboard.setString(this.props.shareLink);
            showToast(global.lang.t('copy_success'))
        }


        if (isAllowShare) {

            let rootPath = fs.DocumentDirectoryPath;
            let unix = new Date() / 1000;
            let savePath = rootPath + `/${unix}temp_share.jpg`;

            console.log(this.props.shareImage);


            if (strNotNull(this.props.shareImage)) {
                fs.downloadFile({
                    fromUrl: this.props.shareImage,
                    toFile: savePath
                }).promise.then(resp => {
                    if (resp.statusCode === 200) {
                        if (Platform.OS === 'ios') {
                            ImageResizer
                                .createResizedImage(savePath, 100, 100, 'JPEG', 0.7)
                                .then((response) => {
                                    this.shareUrl(item.platform, response.path)
                                }).catch((err) => {
                                console.log('ImageResizer错误', err)
                            });
                        } else {
                            this.shareUrl(item.platform, savePath)
                        }


                    }
                });
            } else {
                if(platform !== "favorites")
                this.shareUrl(item.platform, '')
            }


        }


    };

    // shareUrl = (platform, imagePath) => {
    //     let message = {
    //         platform: platform,
    //         type: "link",
    //         url: this.props.shareLink,
    //         title: this.props.shareTitle,
    //         text: this.props.shareText,
    //         imagePath: imagePath,
    //     };
    //     console.log('分享参数', message);
    //     if (Platform.OS === 'android' && platform === 'wechat_timeLine') {
    //         WeChat.shareToTimeline({
    //             thumbImage: "file://" + imagePath,
    //             type: 'news',
    //             webpageUrl: this.props.shareLink,
    //             description: this.props.shareText,
    //             title: this.props.shareTitle
    //         }).then(data => {
    //             console.log('分享成功', data);
    //             this._share_success()
    //         }).catch(err => {
    //             console.log('分享失败', err);
    //         })
    //     } else if (Platform.OS === 'android' && platform === 'wechat_session') {
    //         WeChat.shareToSession({
    //             thumbImage: "file://" + imagePath,
    //             type: 'news',
    //             webpageUrl: this.props.shareLink,
    //             description: this.props.shareText,
    //             title: this.props.shareTitle
    //         }).then(data => {
    //             console.log('分享成功', data);
    //             this._share_success()
    //
    //         }).catch(err => {
    //             console.log('分享失败', err);
    //         })
    //     } else {
    //         JShareModule.share(message, (map) => {
    //             console.log('分享成功', map);
    //             this._share_success()
    //         }, (map) => {
    //             console.log('分享失败', map);
    //         });
    //
    //     }
    //
    //     if (this.props.itemClick === null) return;
    //     this.props.itemClick();
    // };
    shareUrl = (platform, imagePath) => {
        let message = {
            platform: platform,
            type: "link",
            url: this.props.shareLink,
            title: this.props.shareTitle,
            text: this.props.shareText,
            imagePath: imagePath,
        };
        console.log('分享参数', message);

        JShareModule.share(message, (map) => {
            console.log('分享成功', map);

        }, (map) => {
            console.log('分享失败', map);
        });

        this.props.itemClick && this.props.itemClick();
    };




    render() {
        const {item} = this.props;
        return (
            <TouchableOpacity onPress={this.shareAction}>
                <View style={styles.container}>
                    <View style={styles.subView}>
                        <View style={styles.imageSuper}>
                            <Image style={styles.image} source={item.icon}/>
                        </View>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: (DEVICE_WIDTH - 40) / 4,
        height: (DEVICE_WIDTH - 40) / 4,
        alignItems: "center",
        justifyContent: "center",
    },
    subView: {
        width: (DEVICE_WIDTH - 90) / 4,
        height: (DEVICE_WIDTH - 90) / 4,
        alignItems: "center",
        justifyContent: "center",
    },
    imageSuper: {
        width: (DEVICE_WIDTH - 140) / 4,
        height: (DEVICE_WIDTH - 140) / 4,
        backgroundColor: "white",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 40,
        height: 40,
    },
    text: {
        marginTop: 10,
        fontSize: 15,
    }
});