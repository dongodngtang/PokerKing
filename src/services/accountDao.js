import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg, showToast, storageLoginUser} from '../utils/utils';
import dva from '../utils/dva'

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

export function getProfile(resolve,reject) {
    get(api.profile(),{},ret=>{
        resolve && resolve(ret.data)
        dva.getDispatch()({type:'common/setProfile',params:ret.data})

    },reject)
}

export function putProfile(body, resolve, reject) {
    put(api.profile(),body,ret=>{
        resolve(ret.data)
    },reject)
}

export function uploadAvatar(body, resolve, reject) {
    put(api.uploadAvatar(),body,ret=>{
        dva.getDispatch()({type:'common/setProfile',params:ret.data})
        resolve(ret.data)
    },reject)
}