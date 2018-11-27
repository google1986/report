// 服务器域名
const baseUrl = 'http://127.0.0.1:8001/';
// 更新用户信息
const updateUsersUrl = baseUrl + 'greek/user/update';
// 获取项目信息
const getProjectUrl = baseUrl + 'greek/project/list';
// 登录接口
const loginUrl = baseUrl + 'greek/user/login';
//获取所有可用的机构信息
const getOrgUrl = baseUrl + "greek/org/list";

module.exports = {
  updateUsersUrl: updateUsersUrl,
  getProjectUrl: getProjectUrl,
  loginUrl: loginUrl,
  getOrgUrl: getOrgUrl
};