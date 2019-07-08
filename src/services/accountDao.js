import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg, isEmptyObject} from '../utils/utils';
import dva from '../utils/dva'

global.loginUser = null

export function storageLoginUser(loginUser) {
    logMsg('登录用户数据', loginUser)
    global.storage.save({
        key: 'LoginUser',
        data: loginUser
    })
    setToken(loginUser.access_token ? loginUser.access_token : '')
    global.loginUser = loginUser
    getProfile()

}

export function initLoginUser(callback) {
    storage.load({
        key: 'LoginUser'
    }).then(ret => {
        if (isEmptyObject(global.loginUser))
            storageLoginUser(ret)
        callback && callback()
    }).catch(err => {
        callback && callback()
    })
}

/*发送验证码*/
export function postCode(body, resolve, reject) {
    post(api.v_codes, body, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function verify(body, resolve, reject) {
    get(api.verify, body, ret => {
        resolve(ret.data)
    }, reject)
}

/*获取首页banner*/
export function getHomeBanners(resolve, reject) {
    get(api.homne_banners, {}, ret => {
        resolve(ret.data)
    }, reject)
}

/*获取热门资讯列表*/
export function getInfoList(body, resolve, reject) {
    get(api.info_list, body, ret => {
        resolve(ret.data)
    }, reject)
}

/*获取热门资讯详情*/
export function getInfoDetail(body, resolve, reject) {
    get(api.info_detail(body), body, ret => {
        resolve(ret.data)
    }, reject)
}


export function register(body, resolve, reject) {
    post(api.register, body, ret => {

        storageLoginUser(ret.data)
        resolve(ret.data)
    }, reject)
}

export function login(body, resolve, reject) {
    post(api.login, body, ret => {
        storageLoginUser(ret.data)
        resolve(ret.data)
    }, reject)
}

export function verify_code(body, resolve, reject) {
    post(api.verify_vcode, body, ret => {
        resolve(ret.data)
    }, reject)
}

export function getProfile(resolve, reject) {
    if (global.loginUser && global.loginUser.user_id) {
        get(api.profile(), {}, ret => {
            resolve && resolve(ret.data)
            dva.getDispatch()({type: 'MinePage/setProfile', params: ret.data})

        }, reject)
    } else {
        dva.getDispatch()({type: 'MinePage/setProfile', params: {}})
    }

}

export function putProfile(body, resolve, reject) {
    put(api.profile(), body, ret => {
        dva.getDispatch()({type: 'MinePage/setProfile', params: ret.data})
        resolve(ret.data)
    }, reject)
}

export function uploadAvatar(body, resolve, reject) {
    put(api.uploadAvatar(), body, ret => {
        dva.getDispatch()({type: 'MinePage/setProfile', params: ret.data})
        resolve(ret.data)
    }, reject)
}

/*用户反馈*/
export function postFeedBacks(body, resolve, reject) {
    post(api.feed_backs, body, ret => {
        resolve(ret.data)
    }, reject)
}


/*查看是否收藏*/
export function isCollect(body, resolve, reject) {
    post(api.isCollect(), body, ret => {
        resolve(ret.data)
    }, reject)
}
/*收藏资讯 或者 收藏主赛*/
export function postCollect(body, resolve, reject) {
    post(api.collect_item(), body, ret => {
        resolve(ret.data)
    }, reject)
}
/*收藏资讯 或者 收藏主赛*/
export function postCancelCollect(body, resolve, reject) {
    post(api.cancel_collect(), body, ret => {
        resolve(ret.data)
    }, reject)
}
/*查看收藏列表*/
export function getCollectionList(body, resolve, reject) {
    get(api.collection_list(), body, ret => {
        resolve(ret.data)
    }, reject)
}
