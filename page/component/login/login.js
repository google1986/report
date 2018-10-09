//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/image/bb2.jpg',
      '/image/bb1.jpg',
      '/image/bb3.jpg',
      '/image/bb4.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800
  },
  /**
   * 验证用户登录信息
   */
  formSubmit(e) {
    var that = this;
    const value = e.detail.value;
    if (value.name && value.password) {      
      wx.request({
        url: 'http://192.168.8.100:8001/greek/user/login',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "userName": value.name,
          "password": value.password
        },
        //接收后台回调函数
        success: function (res) {
          var resData = res.data.success;
          if (resData == true) {
            //记录用户登录信息
            app.globalData.userInfo = res.data.userInfo;
            app.globalData.hasLogin = true;
            
            //调用弹窗组件提示成功
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              size: 40,
              color: 'green',
              duration: 2000
            });
            // 这里修改成跳转的页面
            wx.switchTab({
              url: '../index/index'
            })
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'warn',
              size: 40,
              duration: 2000
            })
          }
        }
      })      
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  },
  /**
   * 注册用户信息
   */
  registerUser :function(){
    wx.navigateTo({
      url: '../register/register'
    })

  }
})