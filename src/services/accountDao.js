import { post, setToken } from '../utils/request'
import api from '../configs/api'
import { logMsg } from '../utils/utils';

/*检验验证码是否正确*/
export function postVerifyCode(body, resolve, reject) {
    post(api.account_verify, body, resolve, reject);
}
