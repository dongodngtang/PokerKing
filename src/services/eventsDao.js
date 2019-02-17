import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'


export function mainEvents(resolve, reject) {
    get(api.main_events,{},ret=>{
        resolve(ret.data)
    },reject)
}