import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Modal, Text} from 'react-native';
import propTypes from 'prop-types';


export default class PopAction extends PureComponent {

    static propTypes = {
        btnArray: propTypes.array
    }

    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }




    render() {
        return (<Modal
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => {
            }}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.toggle} style={{flex: 1}}/>

                {this.props.children}

            </View>

        </Modal>)
    }
}