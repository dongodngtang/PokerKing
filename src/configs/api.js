const api = {
    //内部测试
    dev: 'http://192.168.2.10:3000/v1/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.kkapi.deshpro.com/v1/',
    //production 用来发布正式生产环境
    production: 'http://kkapi.deshpro.com/v1/',
    account_verify: 'account/verify_vcode'
}


export default api