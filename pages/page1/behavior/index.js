module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    myBehaviorData: 'my-behavior-data'
  },
  created: function () {
    console.log('[my-behavior] created')
  },
  attached: function () {
    console.log('[my-behavior] attached')
  },
  ready: function () {
    console.log('[my-behavior] ready')
  },

  methods: {
    computeImagewh: function(winWid,currentImageInfo) {
      console.log(winWid)
      console.log(currentImageInfo)
      
      let width = '0px';
      let height = '0px';
      let h = 400;
      if (winWid>currentImageInfo.width) {
        width = currentImageInfo.width+'px';
        height = currentImageInfo.height+"px"
        h = '400px'
      } else if (winWid<currentImageInfo.width) {
        width = winWid+'px';
        height =  currentImageInfo.height*winWid/currentImageInfo.width+'px'
        h = currentImageInfo.height*winWid/currentImageInfo.width+100+'px'
      }
      console.log(h)
      this.setData({
        heightImage: height,
        widthImage: width,
        Height: h
      })
    }
  }
})