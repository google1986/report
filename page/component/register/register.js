// 获取服务器接口地址
const api = require('../../../config/config.js');
const utils = require('../../../utils/util.js');
import WxValidate from '../../../utils/WxValidate.js'
// 获取app应用实例
const app = getApp()

Page({
     data: {
          userName: '',
          trueName: '',
          orgName: '',
          orgId: '',
          registerDate: '',
          password:'',
          remark: '',
          max: 200, //最多字数 
          currentWordNumber: 0,
          date: "2018-11-12",
          departments: [],
          departmentIndex: 0
     },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          var self = this;
          wx.request({
               url: api.getOrgUrl,
               method: "GET",
               //接收后台回调函数
               success: function(res) {
                    let currentDate = utils.formatDate(new Date());
                    var resData = res.data.success;
                    if (resData == true) {
                         self.setData({
                              date: currentDate,
                              departments: res.data.orgList,
                              orgId: res.data.orgList[0].orgId
                         });
                    }
               }
          }); 
          //验证规则函数
          self.initValidate()         
     },
     /**
      * 报错
      */
      showModal(error){
           wx.showModal({
                content: error.msg,
                showCancel: false
           })
      },
     /**
      * 验证函数
      */
      initValidate(){
           const rules = {
                userName: {
                     required: true,
                     minlength: 5
                },
                trueName: {
                     required: true,
                     minlength: 2
                },
                password:{
                     required :true,
                     minlength:5
                }
           }
           const messages = {
                userName: {
                     required: '请填写登录名称',
                     minlength: '登录名称长度不少于5个字符'
                },
                trueName: {
                     required: '请填写真实名称',
                     minlength: '真实名称长度不少于2个字符'
                },
                password: {
                     required: "请输入密码",
                     minlength: "密码长度不少于5个字符"
                }
           }
           this.WxValidate = new WxValidate(rules, messages);
      },
     /**
      * 验证用户登录信息
      */
     formSubmitUser(e) {
          var self = this;
          const params = e.detail.value;
          //校验表单
          if(!self.WxValidate.checkForm(params)){
               const error = self.WxValidate.errorList[0]
               self.showModal(error)
               return false
          }
          //提交表单
          wx.request({
               url: api.registerUrl,
               method: "POST",
               header: {
                    "Content-Type": "application/x-www-form-urlencoded"
               },
               data: {
                    userName: self.data.userName,
                    trueName: self.data.trueName,
                    orgId: self.data.orgId,
                    password: self.data.password,
                    registerDate: self.data.registerDate,
                    remark: self.data.remark
               },
               //接收后台回调函数
               success: function (res) {
                    var resData = res.data.success;
                    if (resData == true) {
                         //记录用户登录信息
                         app.globalData.userInfo = null;
                         app.globalData.hasLogin = false;

                         //调用弹窗组件提示成功
                         wx.showToast({
                              title: '注册成功',
                              icon: 'success',
                              size: 40,
                              color: 'green'
                         });
                         // 这里修改成跳转的页面
                         wx.reLaunch({
                              url: '../login/login'
                         })
                         
                    } else {
                         wx.showToast({
                              title: '注册失败',
                              icon: 'warn',
                              size: 40,
                              duration: 2000
                         })
                    }
               }
          })
     },
     bindUserNameInput: function (e) {
          this.setData({
               userName: e.detail.value
          })
     },
     bindTrueNameInput: function (e) {
          this.setData({
               trueName: e.detail.value
          })
     },
     bindPasswordInput: function (e) {
          this.setData({
               password: e.detail.value
          })
     },
     /**
      * 改变部门下拉选项
      */
     bindPickerChange: function(e) {
          const self = this;
          self.setData({
               departmentIndex: e.detail.value,
               orgId : self.data.departments[e.detail.value].orgId,
               orgName: self.data.departments[e.detail.value].orgName
          })
     },
     /**
      * 改变注册日期下拉选项
      */
     bindDateChange: function(e) {
          debugger
          this.setData({
               date: e.detail.value,
               registerDate : e.detail.value
          })
     },
     /**
      * 改变textarea字数限制
      */
     inputText: function(e) {
          //获取输入框的内容
          const value = e.detail.value;
          //获取textarea输入框内容的长度
          const len = parseInt(value.length);
          //最多字数限制
          if (len > this.data.max) return;
          // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
          this.setData({
               currentWordNumber: len, //当前字数  
               remark : value
          });
     }
});