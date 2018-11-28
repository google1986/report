// 获取服务器接口地址
const api = require('../../../config/config.js');
const utils = require('../../../utils/util.js');
import WxValidate from '../../../utils/WxValidate.js'
// 获取app应用实例
const app = getApp()

Page({
  data: {
    startDate: '',
    endDate: '',
    workContent: '',
    projectName: '',
    projectId: '',
    userId: '',
    max: 64, //最多字数 
    currentWordNumber: 0,
    projects: [],
    projectIndex: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.request({
      url: api.getProjectIdAndnameUrl,
      method: "GET",
      //接收后台回调函数
      success: function(res) {
        let currentDate = utils.formatDate(new Date());
        var resData = res.data.success;
        if (resData == true) {
          self.setData({
            startDate: currentDate,
            endDate: currentDate,
            projects: res.data.projectList,
            projectId: res.data.projectList[0].projectId
          });
        }
      }
    });
    
    if (app.globalData.hasLogin) {
      self.setData({
        userId: app.globalData.userInfo.userId
      })
    }
  },
  /**
   * 提交工作记录信息
   */
  formSubmitWorkLog(e) {
    var self = this;
    const params = e.detail.value;

    //提交表单
    wx.request({
      url: api.addWorkLogUrl,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        startDate: self.data.startDate,
        endDate: self.data.endDate,
        workContent: self.data.workContent,
        projectId: self.data.projectId,
        userId: self.data.userId
      },
      //接收后台回调函数
      success: function(res) {
        var resData = res.data.success;    
        if (resData == true) {          
          //调用弹窗组件提示成功
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            size: 40,
            color: 'green',
            duration: 2000
          });
          // 这里修改成跳转的页面
          wx.reLaunch({
            url: '../index/index'
          })

        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'warn',
            size: 40,
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 改变项目下拉选项
   */
  bindPickerProjectChange: function(e) {
    const self = this;
    self.setData({
      projectIndex: e.detail.value,
      projectId: self.data.projects[e.detail.value].projectId,
      projectName: self.data.projects[e.detail.value].projectName
    })
  },
  /**
   * 改变工作开始时间下拉选项
   */
  bindStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  /**
   * 改变工作结束时间下拉选项
   */
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  /**
   * 改变textarea字数限制
   */
  inputWorkLogText: function(e) {
    //获取输入框的内容
    const value = e.detail.value;
    //获取textarea输入框内容的长度
    const len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数  
      workContent: value
    });
  }
});