// page/component/info/info.js
// 获取服务器接口地址
const api = require('../../../config/config.js');
// 获取app应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: false,
    personInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    if (app.globalData.hasLogin) {
      self.setData({
        hasLogin: true,
        personInfo: app.globalData.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 修改用户密码信息
   */
  modifyUserInfo(e) {
    var that = this;
    const value = e.detail.value;
    if (value.firstPassword && value.secondPassword) {
      if (value.firstPassword != value.secondPassword) {
        wx.showToast({
          title: '两次密码不一致',
          icon: 'warn',
          duration: 2000,
          mask: true
        })
      } else {
        wx.request({
          url: api.updateUsersUrl,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            "userId": app.globalData.userInfo.userId,
            "password": value.secondPassword
          },
          //接收后台回调函数
          success: function(res) {
            var resData = res.data.success;
            if (resData == true) {
              //调用弹窗组件提示成功
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                size: 40,
                color: 'green',
                duration: 20000
              });
              // 这里修改成跳转的页面
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: '修改失败',
                icon: 'warn',
                size: 40,
                duration: 2000
              })
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})