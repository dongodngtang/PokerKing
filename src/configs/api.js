import {getUserId, isEmptyObject} from "../utils/utils";

const api = {
    //内部测试
    dev: 'http://192.168.2.10:3000/v1/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.pokerking_api.deshpro.com/v1',
    //production 用来发布正式生产环境
    production: 'http://pokerking_api.deshpro.com/v1',
    v_codes: 'account/v_codes',//获取验证码
    cash_games:"cash_games",//现金桌列表
    cash_queues:cash_queues,//现金桌排队进程列表
    cash_queues_number:cash_queues_number,//现金桌排队进程报名人列表
    verify:'account/verify',//查询该账户是否被注册过
    register:'account/register',//用户注册
    login:'account/login',//登陆
    verify_vcode:'account/verify_vcode',//检查该验证码是否正确
    profile:_profile,
    uploadAvatar:uploadAvatar,
    homne_banners:'homepage_banners',//获取首页banners
    info_list:'infos',//获取热门资讯列表
    info_detail:info_detail,//获取热门资讯详情
    main_events:'main_events/recent_events',
    feed_backs:"feedbacks",//用户反馈
    event_list:event_list,//获取主赛的新闻列表
}


function uploadAvatar() {
    return `account/users/${getUserId()}/avatar`
}

function _profile() {
    return `account/users/${getUserId()}/profile`
}

function event_list(body){
    const {event_id,page} = body;
    return `main_events/${event_id}/infos?page=${page}`;
}

function info_detail(body){
    const {id} = body;
    return `infos/${id}`;
}

function cash_queues(body){
    const {cash_game_id} = body;
    return `cash_games/${cash_game_id}/cash_queues`;
}

function cash_queues_number(body){
    const {cash_game_id,cash_queue_id} = body;
    return `cash_games/${cash_game_id}/cash_queues/${cash_queue_id}/cash_queue_members`;
}

export default api