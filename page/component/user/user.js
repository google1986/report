//获取应用实例
const app = getApp()

Page({
  data:{
  },
  onLoad(){        
  },
  bitphone: function () {
    wx.makePhoneCall({
      phoneNumber: '12544556545'
    })
  },
  /**
   * 退出系统
   */
  loginOut: function () {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (sm) {
        if (sm.confirm) {
          //退出系统后，清空全局变量并跳转到首页
          if (app.globalData.hasLogin) {
            app.globalData.userInfo = null;
            app.globalData.hasLogin = false;
          }
          wx.reLaunch({
            url: '../login/login'
          })
          
        }
      }
    })
  }
})