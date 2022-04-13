// pages/play/components/label/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    store: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    labelcli: function() {
      this.triggerEvent('labelTap', '数据')
    },
  }
})
