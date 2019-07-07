/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import {Actions} from 'react-native-router-flux';
import SwitchApi from "../pages/SwitchApi";
import EventDetail from "../pages/EventDetail";
import Structure from "../pages/Structure";
import ProtocolPage from "../pages/ProtocolPage";
import {needLogin} from "../utils/utils";

export default class Router {
    popTo({sceneKey, params}) {
        Actions.popTo(sceneKey, {params})
    }

    push({sceneKey, params}) {
        Actions.push(sceneKey, {params})
        console.log('当前界面类名：' + sceneKey)
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

    toRaceNew(event_id) {
        needLogin(()=>{
            this.push({
                sceneKey: 'RaceNew',
                params:{
                    event_id
                }
            })
        })

    }

    toRaceSchedule(event) {
        needLogin(()=>{
            this.push({
                sceneKey: 'RaceSchedule',
                params:{
                    event
                }
            })
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
        needLogin(()=>{
            this.push({
                sceneKey: 'Feedback'
            })
        })
    }

    toModifyData() {
        needLogin(()=>{
            this.push({
                sceneKey: 'ModifyData'
            })
        })

    }

    toSwitchApi() {
        this.push({
            sceneKey: 'SwitchApi'
        })
    }

    toQueueList(item) {
        this.push({
            sceneKey: 'QueueList',
            params: {
                item
            }
        })
    }

    toInfoDetail(id) {
        needLogin(()=>{
            this.push({
                sceneKey: 'InfoDetail',
                params: {
                    id
                }
            })
        })

    }
    toEventDetail(id,event_id) {
        this.push({
            sceneKey: 'EventDetail',
            params: {
                id,
                event_id
            }
        })
    }

    toImageGalleryPage(images, index) {
        this.push({
            sceneKey: 'ImageGallery',
            params: {
                images: images,
                index: index
            }
        })
    }

    toWebViewPage(props, url) {
        this.push({
            sceneKey: 'WebViewPage',
            params: {
                url: url
            }

        })
    }
    toStructure(pdf) {
        this.push({
            sceneKey: 'Structure',
            params: {
                pdf
            }

        })
    }
    toRaceMessage(id) {
        needLogin(()=>{
            this.push({
                sceneKey: 'RaceMessage',
                params: {
                    id
                }

            })
        })

    }
    toFAQ() {
        this.push({
            sceneKey: 'FAQ'

        })
    }
    toFoundBeauti() {
        this.push({
            sceneKey: 'FoundBeauti'

        })
    }
    toNotices() {
        needLogin(()=>{
            this.push({
                sceneKey: 'NoticesPage'
            })
        })

    }
    toProtocolPage() {
        this.push({
            sceneKey: 'ProtocolPage'

        })
    }
    toSearchNews() {
        this.push({
            sceneKey: 'SearchNews'

        })
    }
    toInstantList() {
        this.push({
            sceneKey: 'InstantList'

        })
    }
    toRankList() {
        this.push({
            sceneKey: 'RankList'

        })
    }
    toSetting() {
        this.push({
            sceneKey: 'Setting'

        })
    }
    toAccountSecurity() {
        needLogin(()=>{
            this.push({
                sceneKey: 'AccountSecurity'

            })
        })

    }
    toMobile() {
        needLogin(()=>{
            this.push({
                sceneKey: 'Mobile'

            })
        })

    }
    toModifyPWD() {
        needLogin(()=>{
            this.push({
                sceneKey: 'ModifyPWD'

            })
        })
    }

    toChangePhone(){
        this.push({sceneKey:'ChangePhone'})
    }


}