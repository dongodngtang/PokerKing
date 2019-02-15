import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg,showToast} from '../utils/utils';

/*现金桌列表*/
export function getCashGames(resolve, reject) {
    get(api.cash_games, {}, ret => {
        resolve(ret.data)
    }, reject)
}
/*现金桌排队进程列表*/
export function getCashQueues(body,resolve, reject) {
    get(api.cash_queues(body), body, ret => {
        resolve(ret.data)
    }, reject)
}
