// components/result-list/result-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    highSimilarityResults: {
      type: Array,
      value: []
    },
    lowSimilarityResults: {
      type: Array,
      value: []
    },
    showMore: {
      type: Boolean,
      value: false
    },
    cardType: {
      type: String,
      value: 'picture'
    }
  },

  options: {
    styleIsolation: 'shared' // 设置成shared，才可以影响到其他组件
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
    showMore() {
      this.setData({
        showMore: true
      });
    }
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log('list show');
     },
    hide: function () { 
      console.log('list hide');
    },
    resize: function () { },
  },
})
