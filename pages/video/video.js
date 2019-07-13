const { videoSearchAPI } = require('../../constants/config.js');

Page({
  data: {
    results: []
  },

  onPicSelectSuccess(e) {
    const { selectedPath } = e.detail;
    console.log(selectedPath);
    wx.getFileSystemManager().readFile({
      filePath: selectedPath, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        console.log('res', res);
        const imageBase64 = 'data:image/png;base64,' + res.data;
        console.log(imageBase64);

        wx.request({
          url: videoSearchAPI,
          method: 'POST',
          data: {
            image: imageBase64
          },
          success: (res) => {
            const { docs } = res.data;
            this.setData({
              results: docs
            });
          }
        })
      }
    })
  }

})