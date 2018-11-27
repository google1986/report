// 获取服务器接口地址
const api = require('../../../config/config.js');
const utils = require('../../../utils/util.js');
// 获取app应用实例
const app = getApp()

Page({
  data: {  
    max: 200,//最多字数 
    currentWordNumber:0, 
    date: "2018-11-12",    
    departments: [
      
    ],
    departmentIndex: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: api.getOrgUrl,
      method: "GET",      
      //接收后台回调函数
      success: function (res) {
        let currentDate = utils.formatDate(new Date());
        var resData = res.data.success;
        if (resData == true) {
          self.setData({   
            date: currentDate,         
            departments: res.data.orgList           
          });         
        }
      }
    })
  },
  /**
      * 验证用户登录信息
      */
  formSubmitUser(e) {
    var that = this;
    const value = e.detail.value;
    debugger
  },
 
 /**
  * 改变部门下拉选项
  */
  bindPickerChange:function(e){
    this.setData({
      departmentIndex: e.detail.value
    })
  },  
   /**
  * 改变注册日期下拉选项
  */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
  * 改变textarea字数限制
  */
  inputText:function(e){
    //获取输入框的内容
    const value = e.detail.value;
    //获取textarea输入框内容的长度
    const len = parseInt(value.length);
    //最多字数限制
    if(len > this.data.max)return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  }
});