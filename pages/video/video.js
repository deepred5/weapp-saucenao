const { videoSearchAPI } = require('../../constants/config.js');
// const mock = require('../../mock/videoMock.js');

Page({
  data: {
    results: [],
    highSimilarityResults: [],
    lowSimilarityResults: [],
    showMore: false
  },

  onPicSelectSuccess(e) {
    const { selectedPath } = e.detail;
    // 清空上次数据
    this.setData({
      results: [],
      highSimilarityResults: [],
      lowSimilarityResults: [],
      showMore: false
    });
    wx.getFileSystemManager().readFile({
      filePath: selectedPath,
      encoding: 'base64',
      success: res => {
        const imageBase64 = 'data:image/png;base64,' + res.data;
        wx.showLoading({
          title: '搜索中',
        });
        wx.request({
          url: videoSearchAPI,
          method: 'POST',
          data: {
            image: imageBase64
          },
          success: (res) => {
            const { statusCode, data } = res;
            if (statusCode === 200) {
              const { docs } = data;
              console.log(docs);
              this.setData({
                results: docs,
                highSimilarityResults: docs.slice(0, 3),
                lowSimilarityResults: docs.slice(3)
              });
            } else {
              let title = `搜索异常: ${statusCode}`;
              const map = {
                413: '上传图片太大',
                429: '请求太频繁'
              };
              if (map[statusCode]) {
                title = map[statusCode];
              }
              wx.showToast({
                title,
                icon: 'none',
                duration: 2500
              })
            }
          },
          fail: () => {
            wx.showToast({
              title: '搜索失败',
              icon: 'none',
              duration: 2500
            });
          },
          complete: () => {
            console.log('complete');
            wx.hideLoading();
          }
        })
      },
      fail: () => {
        wx.showToast({
          title: '读取文件失败',
          icon: 'none',
          duration: 2500
        })
      }
    })
  }

})