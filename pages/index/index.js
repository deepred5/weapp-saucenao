//index.js
//获取应用实例
const app = getApp();
const { picSearchAPI } = require('../../constants/config.js');
const apiKey = require('../../constants/apiKey.js');

const mock = [{
  "header": {
    "similarity": "95.57",
    "thumbnail": "https:\/\/img1.saucenao.com\/res\/pixiv\/7514\/75140670_p0_master1200.jpg?auth=CTwAep7ckK1faK57rZf83Q\u0026exp=1562940106",
    "index_id": 5,
    "index_name": "Index #5: Pixiv Images - 75140670_p0_master1200.jpg"
  },
  "data": {
    "ext_urls": ["https:\/\/www.pixiv.net\/member_illust.php?mode=medium\u0026illust_id=75140670"],
    "title": "\u7406\u6027",
    "pixiv_id": 75140670,
    "member_name": "\u307f\u3064\u3069\u3046\u3048",
    "member_id": 6526081
  }
}, {
  "header": {
    "similarity": "95.44",
    "thumbnail": "https:\/\/img3.saucenao.com\/booru\/0\/3\/03946f1592779783c79a4708dc4bb956_2.jpg",
    "index_id": 12,
    "index_name": "Index #12: Yande.re - 03946f1592779783c79a4708dc4bb956_1.jpg"
  },
  "data": {
    "ext_urls": ["https:\/\/danbooru.donmai.us\/post\/show\/3531864", "https:\/\/yande.re\/post\/show\/544704", "https:\/\/gelbooru.com\/index.php?page=post\u0026s=view\u0026id=4769214"],
    "danbooru_id": 3531864,
    "yandere_id": 544704,
    "gelbooru_id": 4769214,
    "creator": "mitsudoue",
    "material": "go-toubun no hanayome",
    "characters": "nakano miku",
    "source": "https:\/\/i.pximg.net\/img-original\/img\/2019\/06\/09\/18\/53\/51\/75140670_p0.jpg"
  }
}, {
  "header": {
    "similarity": "94.8",
    "thumbnail": "https:\/\/img3.saucenao.com\/booru\/1\/6\/16ff91fb96937737c0fd96dd91cbdeea_0.jpg",
    "index_id": 9,
    "index_name": "Index #9: Danbooru - 16ff91fb96937737c0fd96dd91cbdeea_0.jpg"
  },
  "data": {
    "ext_urls": ["https:\/\/danbooru.donmai.us\/post\/show\/3530820", "https:\/\/gelbooru.com\/index.php?page=post\u0026s=view\u0026id=4767801"],
    "danbooru_id": 3530820,
    "gelbooru_id": 4767801,
    "creator": "mitsudoue",
    "material": "go-toubun no hanayome",
    "characters": "nakano miku",
    "source": "https:\/\/twitter.com\/mitsudoue_\/status\/1137284138619170816"
  }
}, {
  "header": {
    "similarity": "51.48",
    "thumbnail": "https:\/\/img1.saucenao.com\/res\/pixiv\/1662\/16626826_s.jpg?auth=RHtmpRcXYmBC6XIM6QdHSA\u0026exp=1562940106",
    "index_id": 5,
    "index_name": "Index #5: Pixiv Images - 16626826_s.jpg"
  },
  "data": {
    "ext_urls": ["https:\/\/www.pixiv.net\/member_illust.php?mode=medium\u0026illust_id=16626826"],
    "title": "\u4e8c\u3064\u306e\u72ed\u9593\u3067",
    "pixiv_id": 16626826,
    "member_name": "\u8305\u8349",
    "member_id": 173129
  }
}, {
  "header": {
    "similarity": "49.55",
    "thumbnail": "https:\/\/img3.saucenao.com\/dA\/8996\/89968183.jpg",
    "index_id": 34,
    "index_name": "Index #34: deviantArt - 89968183.jpg"
  },
  "data": {
    "ext_urls": ["https:\/\/deviantart.com\/view\/89968183"],
    "title": "Attitude",
    "da_id": 89968183,
    "author_name": "capture-romance",
    "author_url": "http:\/\/capture-romance.deviantart.com"
  }
}, {
  "header": {
    "similarity": "47.37",
    "thumbnail": "https:\/\/img3.saucenao.com\/booru\/9\/3\/93d8de3b1a7f39aae96968ee0dfa0612_2.jpg",
    "index_id": 9,
    "index_name": "Index #9: Danbooru - 93d8de3b1a7f39aae96968ee0dfa0612_0.jpg"
  },
  "data": {
    "ext_urls": ["https:\/\/danbooru.donmai.us\/post\/show\/2100991", "https:\/\/gelbooru.com\/index.php?page=post\u0026s=view\u0026id=2816931", "https:\/\/chan.sankakucomplex.com\/post\/show\/4782921"],
    "danbooru_id": 2100991,
    "gelbooru_id": 2816931,
    "sankaku_id": 4782921,
    "creator": "mishin (mbmnk)",
    "material": "kantai collection",
    "characters": "hayashimo (kantai collection)",
    "source": "http:\/\/i2.pixiv.net\/img-original\/img\/2015\/08\/19\/19\/06\/55\/52069189"
  }
}];

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
      // mask: true,
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
