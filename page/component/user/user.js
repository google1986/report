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
  }
})