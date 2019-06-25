/**
 *作者：lorne
 *时间：2019/6/25
 *功能：
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import {Image} from 'react-native';


export default class TabBarItem extends PureComponent {
    static props = {
        normalImage: PropTypes.number.isRequired,
        selectedImage: PropTypes.number.isRequired,
    }


    render() {
        let {focused, normalImage, selectedImage, iconStyle} = this.props;
        iconStyle = iconStyle || {}
        return (
            <Image
                source={focused ? selectedImage : normalImage}
                style={iconStyle}/>
        );
    }
}