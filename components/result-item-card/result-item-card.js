// components/result-item-card/result-item-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: Object,
    cardType: {
      type: String,
      value: 'picture',
    }
  },

  options: {
    styleIsolation: 'apply-shared' // 能被页面级别或者设成了shared的其他组件影响
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
    clipboard(e) {
      const content = e.currentTarget.dataset.content;
      wx.setClipboardData({
        data: content
      })
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
    },
    hide: function () { },
    resize: function () { },
  },
})
