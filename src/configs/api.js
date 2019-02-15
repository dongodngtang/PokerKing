const api = {
    //内部测试
    dev: 'http://192.168.2.10:3000/v1/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.pokerking_api.deshpro.com/v1',
    //production 用来发布正式生产环境
    production: 'http://pokerking_api.deshpro.com/v1',
    v_codes: 'account/v_codes',//获取验证码
    verify:'account/verify',//查询该账户是否被注册过
    register:'account/register',//用户注册
    login:'account/login'
}


export default api