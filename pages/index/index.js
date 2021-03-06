//index.js
//获取应用实例
const app = getApp();
const { picSearchAPI } = require('../../constants/config.js');
// https://saucenao.com/user.php?page=search-api 网站自行注册获取apiKey
const apiKey = require('../../constants/apiKey.js').sauceNAO;
// const mock = require('../../mock/picMock.js');
let interstitialAd = null;

Page({
  data: {
    results: [],
    highSimilarityResults: [],
    lowSimilarityResults: [],
    showMore: false
  },
  onPicSelectSuccess(e) {
    // 清空上次数据
    this.setData({
      results: [],
      highSimilarityResults: [],
      lowSimilarityResults: [],
      showMore: false
    });
    wx.showLoading({
      title: '搜索中',
    });
    const { selectedPath } = e.detail;
    wx.uploadFile({
      url: picSearchAPI,
      filePath: selectedPath,
      name: 'file',
      formData: {
        'output_type': 2,
        'api_key': apiKey
      },
      success: (res) => {
        console.log('res', res);
        wx.hideLoading();
        const { statusCode } = res;
        if (statusCode === 200) {
          try {
            const data = JSON.parse(res.data);
            console.log(data);
            this.setData({
              results: data.results,
              highSimilarityResults: data.results.slice(0, 3),
              lowSimilarityResults: data.results.slice(3)
            });
          } catch(err) {
            wx.showToast({
              title: '解析失败: ' + err,
              icon: 'none',
              duration: 2500
            });
          }
        } else {
          let title = `搜索异常: ${statusCode}`;
          if (statusCode === 413) {
            title = '上传图片太大';
          }
          wx.showToast({
            title,
            icon: 'none',
            duration: 2500
          })
        }

      },
      fail: (err) => {
        console.log('err', err);
        wx.hideLoading();
        wx.showToast({
          title: '搜索失败',
          icon: 'none',
          duration: 2500
        });

      },
      complete: () => {
        console.log('complete');
        if (interstitialAd) {
          interstitialAd.show().catch((err) => {
            console.error(err)
          })
        }
      }
    })
  },
  onShareAppMessage() {
    // 当前页面可分享
  },
  onLoad() {
    if(wx.createInterstitialAd && app.globalData.showAd){
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-eb9d1b1618da92ac'
      });
    }
  }
})
