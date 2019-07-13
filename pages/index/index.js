//index.js
//获取应用实例
const app = getApp();
const { picSearchAPI } = require('../../constants/config.js');
const apiKey = require('../../constants/apiKey.js');
const mock = require('../../mock/picMock.js');

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
      // url: 'http://localhost:4444/search.php',
      filePath: selectedPath,
      name: 'file',
      formData: {
        'output_type': 2,
        'api_key': apiKey
      },
      success: (res) => {
        console.log('res', res);
        const { statusCode } = res;
        if (statusCode === 200) {
          const data = JSON.parse(res.data);
          console.log(data);
          this.setData({
            results: data.results,
            highSimilarityResults: data.results.slice(0, 3),
            lowSimilarityResults: data.results.slice(3)
          })
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
        wx.showToast({
          title: '搜索失败',
          icon: 'none',
          duration: 2500
        })

      },
      complete: () => {
        console.log('complete');
        wx.hideLoading();
      }
    })
  },

  preveiwPic() {
    wx.previewImage({
      current: 'https://files.yande.re/sample/161c4f06c0348be10f58142ba9a502d7/yande.re%20552005%20sample%20loundraw%20seifuku.jpg',
      urls: ['https://files.yande.re/sample/161c4f06c0348be10f58142ba9a502d7/yande.re%20552005%20sample%20loundraw%20seifuku.jpg', "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=60581467"],
      success(res) {
        console.log(res);
      }
    })
  }
})
