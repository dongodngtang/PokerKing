/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import {Actions} from 'react-native-router-flux';
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

    replace({sceneKey, params}){
        Actions.replace(sceneKey,params)
    }

}