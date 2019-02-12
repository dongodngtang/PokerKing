# Pokerking
一、登陆
1、手机+验证码登录

二、注册
1、手机验证码+密码注册

三、主页


pokekingIos
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ Xx4G7wZpniIhYHnScBqUcNxQeLST4ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ knkZFibJScPadn_S8OnCHBMMPif04ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
└────────────┴──────────────────────────────────────────────────────────────────┘

pokekingAndroid
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ 8L1zOJbZ29sDwn4ZlNcZzZEqVDBG4ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ HwzbQzvi_tIn-WWPt0Z_wriLpnLA4ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
└────────────┴──────────────────────────────────────────────────────────────────┘


发布热ios更新:
code-push release-react pokekingIos ios -m --description "热更新测试-点击更新后请稍等片刻-修复bug" -d Production

code-push release-react pokekingIos ios -m -d Production &&
code-push release-react pokekingAndroid android -m -d Production

发布热android更新:
code-push release-react pokekingAndroid android -m --description "热更新测试-点击更新后请稍等片刻-修复bug" -d Production
code-push release-react pokekingAndroid android  -d Production

查看ios发布情况K
 code-push deployment h pokekingIos Production
┌───────┬────────────────┬─────────────┬───────────┬──────────────────────────┬──────────────────────┐
│ Label │ Release Time   │ App Version │ Mandatory │ Description              │ Install Metrics      │
├───────┼────────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v1    │ 2 hours ago    │ 4.6         │ Yes       │ 热更新测试                    │ Active: 17% (1 of 6) │
│       │                │             │           │                          │ Total: 3             │
├───────┼────────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v2    │ an hour ago    │ 4.6         │ Yes       │ 热更新测试-点击更新后请稍等片刻-首页输入框变化 │ Active: 50% (3 of 6) │
│       │                │             │           │                          │ Total: 4             │
├───────┼────────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v3    │ 30 minutes ago │ 4.6         │ Yes       │ 热更新测试-抽奖问题               │ Active: 33% (2 of 6) │
│       │                │             │           │                          │ Total: 2             │
└───────┴────────────────┴─────────────┴───────────┴──────────────────────────┴──────────────────────┘


查看android发布情况
 code-push deployment h pokekingAndroid Production
┌───────┬──────────────┬─────────────┬───────────┬──────────────────────────┬──────────────────────┐
│ Label │ Release Time │ App Version │ Mandatory │ Description              │ Install Metrics      │
├───────┼──────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v1    │ an hour ago  │ 4.7         │ Yes       │ 热更新测试-点击更新后请稍等片刻-首页输入框变化 │ No installs recorded │
└───────┴──────────────┴─────────────┴───────────┴──────────────────────────┴──────────────────────┘

