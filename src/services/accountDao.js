import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg,showToast} from '../utils/utils';

/*检验验证码是否正确*/
export function postVerifyCode(body, resolve, reject) {
    post(api.account_verify, body, resolve, reject);
}
export function postCode(body, resolve, reject) {
    post(api.v_codes, body, (ret) => {
        resolve(ret.data);
    }, reject);
}