import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'

@connect(({Feedback}) => ({
    ...Feedback,
}))
export default class Feedback extends Component {

    state = {
        mailbox: "",
        app_list: [{id: 0, isSelect: false, name: global.lang.t('not_satisfied')}, {
            id: 1,
            isSelect: false,
            name: global.lang.t('general')
        }, {
            id: 2,
            isSelect: false,
            name: global.lang.t('satisfied')
        }, {
            id: 3,
            isSelect: true,
            name: global.lang.t('very_satisfied')
        }],
        report_problem: ""
    }


    componentDidMount() {

    }

    render() {
        const {app_list} = this.state;
        return (
            <ScrollView style={styles.feedback_view}>
                <View style={styles.feedback_view2}>
                    <Text style={styles.answer_question}>{global.lang.t('answer_question')}</Text>
                    <Text style={styles.your_mailbox}>{global.lang.t('your_mailbox')}</Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        onChangeText={mailbox => {
                            this.setState({mailbox})
                        }}
                        style={styles.input}/>
                    <Text style={[styles.your_mailbox, {
                        marginTop: 22,
                        marginBottom: 17
                    }]}>{global.lang.t('poker_TV_app')}</Text>
                    <View style={[styles.list_view, {fontSize: 14}]}>
                        {app_list.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => {
                                    app_list.forEach((x) => {
                                        if (x.id === index) {
                                            x.isSelect = true
                                        } else {
                                            x.isSelect = false
                                        }
                                    });
                                    this.setState({
                                        app_list: [...app_list]
                                    });
                                }}
                                                  style={{marginRight: 20}}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: item.isSelect ? "#4A90E2" : "#888888"
                                    }}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <Text style={[styles.your_mailbox, {
                        marginTop: 26
                    }]}>{global.lang.t('report_problem')}</Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        onChangeText={report_problem => {
                            this.setState({report_problem})
                        }}
                        multiline={true}
                        style={[styles.input, {height: 112}]}/>

                    <Text style={[styles.your_mailbox, {
                        marginTop: 28,
                        marginBottom: 7
                    }]}>{global.lang.t('upload_photos')}</Text>

                    <TouchableOpacity style={styles.browse_documents_btn}>
                        <Text style={styles.browse_documents}>{global.lang.t('browse_documents')}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.bottom_btn}>
                    <Text style={styles.browse_documents}>{global.lang.t("send_feedback")}</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
