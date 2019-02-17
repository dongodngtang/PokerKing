/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import {Actions} from 'react-native-router-flux';
import SwitchApi from "../pages/SwitchApi";
import EventDetail from "../pages/EventDetail";

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
            params: param
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

    toQueueProcess(item) {
        this.push({
            sceneKey: 'QueueProcess',
            params: {
                item
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

    toSwitchApi() {
        this.push({
            sceneKey: 'SwitchApi'
        })
    }

    toQueueList(item, cash_game_id) {
        this.push({
            sceneKey: 'QueueList',
            params: {
                item,
                cash_game_id
            }
        })
    }

    toInfoDetail(info) {
        this.push({
            sceneKey: 'InfoDetail',
            params: {
                info
            }
        })
    }
    toEventDetail(info) {
        this.push({
            sceneKey: 'EventDetail',
            params: {
                info
            }
        })
    }
}