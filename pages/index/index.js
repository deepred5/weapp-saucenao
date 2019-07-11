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
        })
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
        });
      }
    })
  }
})
