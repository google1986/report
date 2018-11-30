// 服务器域名
const baseUrl = 'http://192.168.8.101:8989/';
// 更新用户信息
const updateUsersUrl = baseUrl + 'greek/user/update';
//注册用户信息
const registerUrl = baseUrl + 'greek/user/register';
// 获取项目信息
const getProjectUrl = baseUrl + 'greek/project/list';
// 登录接口
const loginUrl = baseUrl + 'greek/user/login';
//获取所有可用的机构信息
const getOrgUrl = baseUrl + "greek/org/list";
//添加工作日志信息
const addWorkLogUrl = baseUrl + "greek/work/add";
//获取所有可用的机构信息
const getProjectIdAndnameUrl = baseUrl + "greek/project/listIdAndName";


module.exports = {
  updateUsersUrl: updateUsersUrl,
  getProjectUrl: getProjectUrl,
  loginUrl: loginUrl,
  getOrgUrl: getOrgUrl,
  registerUrl: registerUrl,
  getProjectIdAndnameUrl: getProjectIdAndnameUrl,
  addWorkLogUrl: addWorkLogUrl
};