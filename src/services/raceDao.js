import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg, showToast, storageLoginUser} from '../utils/utils';
import dva from '../utils/dva';

/*获取热门资讯列表*/
export function getMainEventList(body,resolve, reject) {
    get(api.event_list(body),body,ret=>{
        resolve(ret.data)
    },reject)
}

/*获取赛程的所有日期*/
export function getSchedulesDates(body,resolve, reject) {
    get(api.schedules_dates(body),body,ret=>{
        resolve(ret.data)
    },reject)
}