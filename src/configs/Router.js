/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import {Actions} from 'react-native-router-flux';
import SwitchApi from "../pages/SwitchApi";

export default class Router {
    popTo({sceneKey, params}) {
        Actions.popTo(sceneKey, {params})
    }

    push({sceneKey, params}) {
        Actions.push(sceneKey, {params})
        console.log('当前界面类名：' + Actions.currentScene)
    }

    pop() {
        Actions.pop()
    }

    replace({sceneKey, params}) {
        Actions.replace(sceneKey, params)
    }



    toDetail() {
        this.push({
            sceneKey: 'Detail'
        })
    }

    toRegister(param) {
        this.push({
            sceneKey: 'Register',
            params:param
        })
    }

    toLogin() {
        this.push({
            sceneKey: 'Login'
        })
    }

    toHotRaceList() {
        this.push({
            sceneKey: 'HotNewsList'
        })
    }

    toRaces() {
        this.push({
            sceneKey: 'Races'
        })
    }

    toRaceNew() {
        this.push({
            sceneKey: 'RaceNew'
        })
    }

    toRaceSchedule() {
        this.push({
            sceneKey: 'RaceSchedule'
        })
    }

    toCashTable() {
        this.push({
            sceneKey: 'CashTable'
        })
    }

    toQueueProcess(type) {
        this.push({
            sceneKey: 'QueueProcess',
            params: {
                type
            }
        })
    }

    toFeedback() {
        this.push({
            sceneKey: 'Feedback'
        })
    }

    toModifyData() {
        this.push({
            sceneKey: 'ModifyData'
        })
    }

    toSwitchApi(){
        this.push({
            sceneKey: 'SwitchApi'
        })
    }
}