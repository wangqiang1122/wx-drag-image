// pages/play/components/previewImage1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataUrls: {
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
       observer: function(imageList) {
           let jiamarginTop = '15rpx';
           let jiamarginLeft = '15rpx' 
           if (imageList.length==3) {
            jiamarginTop = '0rpx'
           } else if (imageList.length==4||imageList.length==8) {
            jiamarginLeft = '0rpx' 
           } else if (imageList.length>=1&&imageList.length<=3) {
            jiamarginTop = '0rpx' 
           } 
           this.setData({
            jiamarginTop,
            jiamarginLeft,
           })
       }
    },
    isImageInit: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 9
    },
    pageScroll: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     movableViewInfo: {
      y: 500,
      x: 500,
      showClass: 'none',
      data: {},
      height: 0,
    },
    rowNumber:0,
    zwidth: 0,
    pageTop: 0, // 距离的高度
    pageLeft: 0,
    pageInfo: {
      rowHeight: 0,
      rowWidth:0,
      scrollHeight: 85,

      startIndex: null,
      scrollY: true,
      readyPlaceIndex: null,
      startY: 0,
      selectedIndex: null,
    },
    packUp: true, // 收起 展开
    packUptext: '查看更多图片',
    imglist: [], // 上传图片存储位置
    dargging: false, //
    jiamarginTop: '15px',
    jiamarginLeft: '15px',
    isfiexd: false, // 是否固定定位
    fixedTop: 0, // 固定高度
  },

  /**
   * 组件的方法列表
   */
  observers: {
    dataUrls: function(numberA, numberB) {
      // console.log(numberA)
      // console.log(this.properties.isImageInit)
      if (this.data.dargging||this.properties.isImageInit) return
      if (numberA.length>4) {
         this.setData({
          packUp: false,
          packUptext:'查看更多图片' 
         })
      } else {
        this.setData({
          packUp: true,
          packUptext:'收起' 
        })
        //  this.spread()
      }
    } 
  },
  methods: {
    dragStart: function (event) {
      console.log(event)
      if (!this.data.packUp) return
      // 组件事件传递
      this.triggerEvent('dragStart')
      var query = wx.createSelectorQuery().in(this);
       // 图片一共几行
      let rowNumber = Math.ceil(this.data.dataUrls.length/4);
      // console.log(rowNumber)
      this.setData({
        rowNumber
      })
      console.log()
      // 获取dom宽度和高度
      query.select('.dragImage').boundingClientRect().exec(datares=>{
        console.log(datares[0])
         // 长按 变成固定定位
        //  console.log(event.changedTouches[0].clientY - datares[0].height)
        this.setData({
          // isfiexd: true,
          // fixedTop:(event.changedTouches[0].clientY - datares[0].height)+'px'
        })  
        // 展开才可以拖拽
        let h= datares[0].top;
        this.setData({
          pageTop: h
        })
        query.select('.v1').boundingClientRect().exec((res)=>{
          console.log(res)
          this.setData({
            'movableViewInfo.height': res[0].height,
            pageLeft: res[0].left,
          })
          query.select('.imgitem').boundingClientRect().exec((rest)=>{
            var startIndex = event.currentTarget.dataset.index
            console.log('获取到的元素为', this.data.dataUrls[startIndex])
            console.log(rest)
            var pageInfo = this.data.pageInfo
            pageInfo.startY = event.changedTouches[0].clientY-h;
            pageInfo.startX = event.changedTouches[0].clientX-this.data.pageLeft
            pageInfo.readyPlaceIndex = startIndex
            pageInfo.selectedIndex = startIndex
            pageInfo.scrollY = false
            pageInfo.startIndex = startIndex
            // console.log(rest)
            this.data.pageInfo.rowHeight = rest[2].height;
            this.data.pageInfo.rowWidth = rest[2].width;
            console.log(pageInfo)
            console.log(pageInfo.startY )
            // pageInfo.startY - (pageInfo.rowHeight / 2)
            //  pageInfo.startX - (pageInfo.rowWidth / 2)
            console.log(pageInfo.startY - (pageInfo.rowHeight / 2))
            this.setData({
              'movableViewInfo.y': pageInfo.startY - (pageInfo.rowHeight / 2),
              'movableViewInfo.x': pageInfo.startX - (pageInfo.rowWidth / 2),
              zwidth:  rest[1].width*4
            })
            // 初始化拖动控件数据
            var movableViewInfo = this.data.movableViewInfo
            movableViewInfo.src = this.data.dataUrls[startIndex].path
            movableViewInfo.showClass = "inline"
            console.log(movableViewInfo)
            this.setData({
              movableViewInfo: movableViewInfo,
              pageInfo: pageInfo
            })
          })
        })
      })
       // 初始化页面数据
    },
    dragMove: function(event) {
      if (!this.data.packUp) return
      var optionList = this.data.dataUrls
      var pageInfo = this.data.pageInfo
  
       // 计算拖拽距离
       var movableViewInfo = this.data.movableViewInfo
       var movedDistanceY = event.touches[0].clientY - pageInfo.startY-this.data.pageTop
       var movedDistanceX = event.touches[0].clientX - pageInfo.startX-this.data.pageLeft
       movableViewInfo.y = pageInfo.startY - (pageInfo.rowHeight / 2) + movedDistanceY
       movableViewInfo.x = pageInfo.startX - (pageInfo.rowWidth / 2) + movedDistanceX
      //  console.log('移动的距离为X', movedDistanceX)
      //  console.log('移动的距离为Y', movedDistanceY)
      //  console.log(movableViewInfo)
  
       // 修改预计放置位置
       var movedIndexY = parseInt( movableViewInfo.y / pageInfo.rowHeight)
       var movedIndexX = parseInt( movableViewInfo.x / pageInfo.rowWidth)
      //  console.log(movedIndexY)
      //  console.log(movedIndexX)
       // y为0时不加0 y为1时加3 y为2时加6 y为3时加9 3*y
       var readyPlaceIndex = movedIndexY+movedIndexX+(movedIndexY*3)
       if (readyPlaceIndex < 0 ) {
        readyPlaceIndex = 0
      }
      else if (readyPlaceIndex >= optionList.length){
        readyPlaceIndex = optionList.length - 1
      }
      if (readyPlaceIndex != pageInfo.selectedIndex ) {
        var selectedData = optionList[pageInfo.selectedIndex]
        if (!selectedData) return
        optionList.splice(pageInfo.selectedIndex, 1)
        optionList.splice(readyPlaceIndex, 0, selectedData)
        pageInfo.selectedIndex = readyPlaceIndex
      }
      // 移动movableView
      pageInfo.readyPlaceIndex = readyPlaceIndex
       this.setData({
        movableViewInfo: movableViewInfo,
        dataUrls: optionList,
        pageInfo: pageInfo,
        dargging: true,
      })
    },
    dragEnd: function(event) {
      if (!this.data.packUp) return
       // 初始化拖动控件数据
       var movableViewInfo = this.data.movableViewInfo
       var pageInfo = this.data.pageInfo
       pageInfo.readyPlaceIndex = null
       pageInfo.startY = null
       pageInfo.selectedIndex = null
       pageInfo.startIndex = null
       pageInfo.scrollY = true
      movableViewInfo.showClass = "none"
      this.triggerEvent('dragEnd',{ dataUrls: this.data.dataUrls })
      this.setData({
        pageInfo:pageInfo,
        movableViewInfo: movableViewInfo,
        // isfiexd: false
      })
    },
    // 展开 收起
    spread: function() {
       console.log('ddd')
       let packUp = this.data.packUp;
       console.log(packUp)
       let packUptext = '';
       if (!packUp) {
        packUptext='收起' 
        packUp = true
       } else {
        packUptext='查看更多图片' 
        packUp = false
       }
       this.setData({
        packUp,
        packUptext,
       })
    },
    // 单点
    tap: function(e) {
      console.log(e)
      this.triggerEvent('imagetap',{ index: e.currentTarget.dataset.index })
    },
    // 图片选择
    chooseImage(){
      var _this=this;
      console.log(_this.properties.count)
      wx.chooseImage({
        count: _this.properties.count, // 默认9
        sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success:  (res) =>{
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          this.getImageinfo(tempFilePaths)
        }
      })
    },
    getImageinfo(tempFilePaths) {
      if (tempFilePaths.length==0) {
        this.triggerEvent('ImageListinfo',this.data.imglist)
        // console.log(this.data.imglist)
        return
      }
      wx.getImageInfo({
        src:tempFilePaths[0],
        success: (res) =>{
          this.data.imglist.push(res)
          if (tempFilePaths.length!=0) {
            tempFilePaths.shift()
            this.getImageinfo(tempFilePaths)
          }
        }
      })
    }
  }
})
