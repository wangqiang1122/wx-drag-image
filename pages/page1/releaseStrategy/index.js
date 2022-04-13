// pages/play/releaseStrategy/index.js
import { RequestWithUpload } from '../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataUrls: [
      // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/e9d737ec-cc53-44a5-b2a5-8e0c1d9dcf82.jpeg',
      // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/97efe118-3f62-4449-a3b5-84b8d6c5e517.png',
      // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/e9d9e7e3-3424-4201-b74c-3ced5cc6dd6e.png',
      // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/f371c157-b260-4aa8-a1d7-33b3bec3a913.png',
      // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/5b163c03-1875-48db-9172-6f1bc9b9eff4.png',
      // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/f62da404-1c34-4a45-9303-0ed641554f94.png',
      // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/bde7f2db-30ad-425b-8fd4-520cca6265e4.png',
     ],
     isShow: false,
     imagelist: [],
     len: 0, // 上传图片数量
     currentImageIndex: 0,// 当前图片位置
     winWid: 0, // 当前屏幕高度
     isCurrent: true, 
     isImageInit: false,
     inputData: '',
     count: 9,
     pageScroll: 0,
     textfixed: 'static', // 是否是固定定位
     textTop: '0px',// top位置
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 获取当前屏幕高度
     var winWid = wx.getSystemInfoSync().windowWidth
     console.log(winWid)
     this.setData( {
      winWid: winWid
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 滚动条位置
  onPageScroll:function(e){ // 获取滚动条当前位置
    console.log(e)
    this.setData({
      pageScroll: e.scrollTop,
    })
  },
  // 获取上传图片的信息
  ImageListinfo: function(imagelist) {
     console.log(imagelist)
     this.makeImageList(imagelist.detail)
     
  },
  imagetap: function(e) {
    // console.log('图片')
    console.log(e)
    // console.log(this.data.imagelist)
    this.setData({
      isShow: true,
      currentImageIndex: e.detail.index,
    })
  },
  backImage: function() {
    this.setData({
      isShow: false
    })
  },
  // 删除图片
  delteleImage: function(e) {
    // console.log(e)
    // let imagelist = da
    let imagelist = this.data.imagelist
    imagelist.splice(e.detail.index,1)
    this.makeImageList(imagelist)
    if (e.detail.index>=imagelist.length-1) {
      this.setData({
         currentImageIndex: imagelist.length-1,
      })
    } 
    this.setData({
      isImageInit: true
    })
  }, 
  // 图片处理方法(公共)
  makeImageList(imagelist) {
    // let imagelist = this.data.imagelist
    let arrtlist = [];
    imagelist.forEach(item=>{
      arrtlist.push(item.path)
    }) 
    let len = imagelist.length
    console.log(len)
    this.setData({
      dataUrls: arrtlist,
      imagelist: imagelist,
      len: len,
      isCurrent: true,
    }) 
    if (imagelist.length==0) {
      this.setData({
       isShow: false
      })  
    }
    this.makeCount()
  },
  // 输入框监听事件
  input: function() {

  },
  // 剩余可以上传的图片
  makeCount: function() {
    let count = 10-this.data.imagelist.length;
    this.setData({
      count: count
    })
  },
  // 长按拖动
  dragStart: function() {
    console.log(this.data.pageScroll)
    // this.setData({
    //   textfixed: 'fixed',
    //   textTop: -this.data.pageScroll+'px'
    // }) 
    wx.pageScrollTo({
      scrollTop: this.data.pageScroll,
      duration: 0,
      success: function(e) {
        console.log(e)
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },
  // 拖动结束
  dragEnd: function(e) {
    console.log(e.detail.dataUrls)
    this.makeImageList(e.detail.dataUrls)
    // this.setData({
    //   textfixed: 'relative',
    //   textTop: 'auto',
    // }) 
  },
  // 点击上传
  submit: function() {
     let arrlist = [];
     let imagelist = this.data.imagelist;
     let currentImage = imagelist.shift();
     this.uploadImage(currentImage.path).then((res)=>{
       arrlist.push(res)
       if (imagelist.length!=0) {
         currentImage = imagelist.shift();
         this.uploadImage(currentImage.path)
       } else {
         console.log(arrlist)
       }
     })
  },
  uploadImage: function(path) {
    return RequestWithUpload(path)
  }
})