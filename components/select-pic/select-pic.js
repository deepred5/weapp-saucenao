// components/select-pic/select-pic.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconType: {
      type: String,
      value: 'phone'
    }
  },

  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedPath: '',
  },

  /**
   * 组件的方法列表
   * 最外层的函数不要用箭头函数
   */
  methods: {
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
          const size = res.tempFiles[0].size;
          const result = this.checkFileSize(size);
          if (!result) {
            return;
          }
          this.setData({
            selectedPath: tempFilePaths[0]
          }, this.selectSuccess)
        }
      })
    },
    selectPicFromChat() {
      if (!wx.chooseMessageFile) {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        });
        return;
      }
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
          }, this.selectSuccess);
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
    selectSuccess() {
      const myEventDetail = {
        selectedPath: this.data.selectedPath
      };
      this.triggerEvent('picSelectSuccess', myEventDetail);
    }
  }
})
