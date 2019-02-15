const api = {
    //内部测试
    dev: 'http://192.168.2.10:3000/v1/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.pokerking_api.deshpro.com/',
    //production 用来发布正式生产环境
    production: 'http://pokerking_api.deshpro.com/',
    account_verify: 'account/verify_vcode',//
    v_codes: 'account/v_codes',//获取验证码
}


export default api