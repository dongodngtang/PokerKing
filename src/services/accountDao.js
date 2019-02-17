import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg, showToast, storageLoginUser} from '../utils/utils';


/*发送验证码*/
export function postCode(body, resolve, reject) {
    post(api.v_codes, body, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function verify(body, resolve, reject) {
    get(api.verify,body,ret=>{
        resolve(ret.data)
    },reject)
}

/*获取首页banner*/
export function getHomeBanners(resolve, reject) {
    get(api.homne_banners,{},ret=>{
        resolve(ret.data)
    },reject)
}

/*获取热门资讯列表*/
export function getInfoList(body,resolve, reject) {
    get(api.info_list,body,ret=>{
        resolve(ret.data)
    },reject)
}

export function register(body, resolve, reject) {
    post(api.register,body,ret=>{

        storageLoginUser(ret.data)
        resolve(ret.data)
    },reject)
}

export function login(body, resolve, reject) {
    post(api.login,body,ret=>{
        storageLoginUser(ret.data)
        resolve(ret.data)
    },reject)
}

export function verify_code(body, resolve, reject) {
    post(api.verify_vcode,body,ret=>{
        resolve(ret.data)
    },reject)
}