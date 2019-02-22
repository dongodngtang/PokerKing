/**
 *作者：lorne
 *时间：2019/1/16
 *功能：
 */
import {logMsg} from "../utils/utils";
import dva from '../utils/dva'


export default class Language {

    langObj = require('./zh.json')

    constructor(){
        global.localLanguage = 'zh'

    }

    switchLang(language){
        if(language === 'en'){
            this.langObj = require('./en.json')
        }else if(language === 'zh-e'){
            this.langObj = require('./zh-e.json')
        }else {
            this.langObj = require('./zh.json')
        }
        global.localLanguage = language
        dva.getDispatch()({type:'common/switchLang',params:language})

    }

    t(key){
        return this.langObj[key]
    }




}