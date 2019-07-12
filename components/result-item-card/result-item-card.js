// components/result-item-card/result-item-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: Object
  },

  options: {
    styleIsolation: 'apply-shared'
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
      const content = e.target.dataset.content;

      wx.setClipboardData({
        data: content,
        success(res) {
          console.log('res', res);
        }
      })
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log('show');
      console.log(this.data)
    },
    hide: function () { },
    resize: function () { },
  },
})