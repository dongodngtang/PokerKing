/**
 *作者：lorne
 *时间：2018/12/3
 *功能：
 */
//test分支用来发布版本
let test=  'http://test.pokerking_api.deshpro.com/v1'
//production 用来发布正式生产环境
let production = 'http://pokerking_api.deshpro.com/v1'

export default  {
  noConsole:false,
  baseUrl:production

}


function getBaseUrl(type) {
   return type === 'test'?test:production
}

