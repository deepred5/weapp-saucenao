//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectedPath: '',
    results: [],
    highSimilarityResults: [],
    lowSimilarityResults: [],
    showMore: false
  },
  showMore() {
    this.setData({
      showMore: true
    })
  },
  selectPic() {
    wx.showActionSheet({
      itemList: ['从相册中选择', '从聊天中选择'],
      success: (res) => {
        const { tapIndex } = res;
        if (tapIndex === 0) {
          this.selectPicFromAlbum();
        } else if (tapIndex === 1) {
          this.selectPicFromChat();
        }
      }
    })
  },

  checkFileSize(size) {
    if (Math.round(size / 1024 / 1024) > 6) {
      wx.showToast({
        title: '上传图片太大',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

  selectPicFromAlbum() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        const size = res.tempFiles[0].size;
        const result = this.checkFileSize(size);
        if (!result) {
          return;
        }
        this.setData({
          selectedPath: tempFilePaths[0]
        }, this.searchResult)
      }
    })
  },

  selectPicFromChat() {
    wx.chooseMessageFile({
      count: 1,
      type: 'image',
      success: (res) => {
        const tempFilePaths = res.tempFiles[0].path;
        const size = res.tempFiles[0].size;
        const result = this.checkFileSize(size);
        if (!result) {
          return;
        }
        this.setData({
          selectedPath: tempFilePaths
        }, this.searchResult);
      }
    })
  },

  searchResult() {
    // 清空上次数据
    this.setData({
      results: [],
      highSimilarityResults: [],
      lowSimilarityResults: [],
      showMore: false
    });
    wx.showLoading({
      title: '搜索中',
      mask: true, // 搜索时禁止点击
    });
    const { selectedPath } = this.data;
    wx.uploadFile({
      url: 'https://www.whitealbum.cc/search.php',
      // url: 'http://localhost:4444/search.php',
      filePath: selectedPath,
      name: 'file',
      formData: {
        'output_type': 2
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
      current: 'http://pic.deepred5.com/lerna1.png',
      urls: ['http://pic.deepred5.com/lerna1.png', "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=60581467"],
      success(res) {
        console.log(res);
      }
    })
  }
})
