//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectedPath: ''
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

  selectPicFromAlbum() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
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
        const tempFilePaths = res.tempFiles.map(item => item.path);
        console.log(tempFilePaths);
        this.setData({
          selectedPath: tempFilePaths[0]
        }, this.searchResult);
      }
    })
  },

  searchResult() {
    wx.showLoading({
      title: '搜索中',
    });
    const { selectedPath} = this.data;
    wx.uploadFile({
      url: 'https://www.whitealbum.cc/search.php',
      filePath: selectedPath,
      name: 'file',
      formData: {
        'output_type': 2
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        console.log(data);
        this.setData({
          results: data.results
        })
      },
      fail: () => {
        wx.showToast({
          title: '搜索失败',
          icon: 'none',
          duration: 1500
        })

      },
      complete: () => {
        wx.hideLoading();
      }
    })
  }
})
