import {getUserId, isEmptyObject} from "../utils/utils";

const api = {
    //内部测试
    dev: 'https://192.168.2.10:3000/v1/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'https://test.pokerking_api.deshpro.com/v1',
    //production 用来发布正式生产环境
    production: 'https://api.pokerkinglive.com/v1',
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
    event_list:event_list,//获取主赛的新闻列表,
    schedules_dates:schedules_dates,//获取赛程的所有日期
    schedules_events:schedules_events,//获取某个日期的赛程
    event_detail:event_detail,//获取主赛的新闻详情
    event_info:event_info,//获取主赛详情
}


function uploadAvatar() {
    return `account/users/${getUserId()}/avatar`
}

function _profile() {
    return `account/users/${getUserId()}/profile`
}

function event_info(body){
    const {id} = body;
    return `main_events/${id}`;
}

function event_detail(body){
    const {event_id,id} = body;
    return `main_events/${event_id}/infos/${id}`;
}

function schedules_events(body){
    const {event_id,date} = body;
    return `main_events/${event_id}/schedules?date=${date}`;
}

function schedules_dates(body){
    const {event_id} = body;
    return `main_events/${event_id}/schedules/dates`;
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