// pages/play/components/previewImage/index.js
var myBehavior = require('../../behavior/index')
Component({
  // 混入
  behaviors: [myBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array,
      value: [
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/e9d737ec-cc53-44a5-b2a5-8e0c1d9dcf82.jpeg',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/97efe118-3f62-4449-a3b5-84b8d6c5e517.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/e9d9e7e3-3424-4201-b74c-3ced5cc6dd6e.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/f371c157-b260-4aa8-a1d7-33b3bec3a913.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/5b163c03-1875-48db-9172-6f1bc9b9eff4.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/f62da404-1c34-4a45-9303-0ed641554f94.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/bde7f2db-30ad-425b-8fd4-520cca6265e4.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/552553f1-07f6-4d07-844c-eda00846f66b.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/ddfeade8-763f-4166-84a3-e2a82fb5d759.png',
        // 'http://crm-dev-itrigger.oss-cn-beijing.aliyuncs.com/article_images/9242bb5a-d031-4e66-ba57-887e1d85c381.png',
      ],
    },
    len: {
      type: String,
      value: '0',
      observer: function(val) {
        console.log(val)
        this.setData({
          len: val
        }) 
      }
    },
    current: {
      type: Number,
      value: -1,
      observer: function(val) {
        // console.log(this.properties.imgUrls[val])
        // console.log(this.properties.winWid)
        console.log(val)
        if (!this.properties.imgUrls[val]) return 
        this.computeImagewh(this.properties.winWid,this.properties.imgUrls[val])
        this.setData({
          current: val
        }) 
      }
    },
    isCurrent: {
      type: Boolean,
      value: true,
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: function() {
        if (this.properties.current==0) {
          this.computeImagewh(this.properties.winWid,this.properties.imgUrls[this.properties.current])
        }
      }
    },
    winWid: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    circular:true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    Height: '400px',
    currentIndex: 0,
    isChange: false,
    widthImage: '100px',
    heightImage: '100px'
  },
  observers: {
    imgUrls: function(list) {
      console.log(list)
    },
    // current: function(index) {
    //   console.log(index)
    //   console.log(this.properties.imgUrls[index])
    // } 
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change1: function(e) {
      console.log(this.properties.imgUrls[this.data.currentIndex])
      this.computeImagewh(this.properties.winWid,this.properties.imgUrls[e.detail.current])
      this.setData({
        currentIndex: e.detail.current+1,
        isCurrent: false,
        isChange: true,
      })   
    },
    delteleImage: function(e) {
       console.log('删除')
       console.log(this.data.currentIndex)
       let index = this.data.isChange? this.data.currentIndex-1:this.properties.current;
       console.log(index)
       this.setData({
        isChange: false,
       })
       this.triggerEvent('delteleImage',{index: index})
    },
    backImage: function() {
      this.triggerEvent('backImage')
    }
  }
})
