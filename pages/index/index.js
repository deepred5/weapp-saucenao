//index.js
//获取应用实例
const app = getApp();
const apiKey = require('../../constants/apiKey.js');
const { picSearchAPI } = require('../../constants/config.js');

const mock = [
  {
    "header": {
      "similarity": "82.47",
      "thumbnail": "https://img1.saucenao.com/res/nhentai/276619%20%281437652%29%20--%20%28COMIC1%E2%98%8615%29%20%5BSonic%20Boom%20%28hews%29%5D%20Fate%20Lewd%20Order%20%28Fate_Grand%20Order%29/5.jpg?auth=Pkkgo_xXubhZsARp-hPQnw&exp=1562909847",
      "index_id": 18,
      "index_name": "Index #18: H-Misc - 5.jpg"
    },
    "data": {
      "source": "Fate Lewd Order",
      "creator": [
        "hews"
      ],
      "eng_name": "(COMIC1☆15) [Sonic Boom (hews)] Fate Lewd Order (Fate_Grand Order)",
      "jp_name": "(COMIC1☆15) [ソニックブーム (hews)] Fate Lewd Order (Fate/Grand Order)"
    }
  },
  {
    "header": {
      "similarity": "93.57",
      "thumbnail": "https://img3.saucenao.com/booru/6/5/65bf250a12a728222263f05b6ef72834_1.jpg",
      "index_id": 12,
      "index_name": "Index #12: Yande.re - 65bf250a12a728222263f05b6ef72834_1.jpg"
    },
    "data": {
      "ext_urls": [
        "https://danbooru.donmai.us/post/show/3431177",
        "https://yande.re/post/show/522191",
        "https://gelbooru.com/index.php?page=post&s=view&id=4629252"
      ],
      "danbooru_id": 3431177,
      "yandere_id": 522191,
      "gelbooru_id": 4629252,
      "creator": "hews",
      "material": "fate/grand order, fate (series)",
      "characters": "ereshkigal (fate/grand order), fujimaru ritsuka, ishtar (fate/grand order)",
      "source": ""
    }
  },
  {
    "header": {
      "similarity": "92.40",
      "thumbnail": "https://img3.saucenao.com/booru/0/7/07a17b9f4fcede2a73bcac3d0b9a5c7a_0.jpg",
      "index_id": 9,
      "index_name": "Index #9: Danbooru - 07a17b9f4fcede2a73bcac3d0b9a5c7a_0.jpg"
    },
    "data": {
      "ext_urls": [
        "https://danbooru.donmai.us/post/show/3420757",
        "https://gelbooru.com/index.php?page=post&s=view&id=4615461"
      ],
      "danbooru_id": 3420757,
      "gelbooru_id": 4615461,
      "creator": "hews hack",
      "material": "fate/grand order, fate (series)",
      "characters": "ereshkigal (fate/grand order), fujimaru ritsuka (male), ishtar (fate/grand order)",
      "source": "https://twitter.com/hews__/status/1097391265606295552"
    }
  },
  {
    "header": {
      "similarity": "39.64",
      "thumbnail": "https://img1.saucenao.com/res/nhentai/56333%20%28326309%29%20--%20COMIC%20HOTMiLK%202011-02/67.jpg?auth=ER-KhVhRMe6ofAr6s3RM3g&exp=1562909847",
      "index_id": 18,
      "index_name": "Index #18: H-Misc - 67.jpg"
    },
    "data": {
      "source": "COMIC HOTMiLK 2011-02",
      "creator": [
        "shimamura",
        "89",
        "kizuki aruchu",
        "wamusato haru",
        "minato fumi",
        "kurogane ken",
        "rakko",
        "jingrock",
        "a-10",
        "saburou",
        "tsukino jyogi",
        "kisaragi gunma",
        "azuma yuki",
        "ha-ru",
        "inoue kiyoshirou",
        "kurosaki rendou",
        "shinama",
        "amatarou"
      ],
      "eng_name": "COMIC HOTMiLK 2011-02",
      "jp_name": "[雑誌] COMIC HOTMiLK 2011年02月号"
    }
  },
  {
    "header": {
      "similarity": "39.53",
      "thumbnail": "https://img1.saucenao.com/res/nhentai/261609%20%281356829%29%20--%20%28C94%29%20%5BCircle%20Taihei-Tengoku%20%28Horikawa%20Gorou%29%5D%20Kurenai%20no%20Kishidan%20Hokan/38.jpg?auth=AIQ-AVpGMb-bbFVCDBdRxw&exp=1562909847",
      "index_id": 18,
      "index_name": "Index #18: H-Misc - 38.jpg"
    },
    "data": {
      "source": "Kurenai no Kishidan Hokan",
      "creator": [
        "horikawa gorou"
      ],
      "eng_name": "(C94) [Circle Taihei-Tengoku (Horikawa Gorou)] Kurenai no Kishidan Hokan",
      "jp_name": "(C94) [サークル太平天国 (堀川悟郎)] 紅の騎士団 補巻"
    }
  },
  {
    "header": {
      "similarity": "39.1",
      "thumbnail": "https://img1.saucenao.com/res/mangadex/259/259774/M14.jpg?auth=s5ZaScd8U_d-qTrlHsf7ZQ&exp=1562909847",
      "index_id": 37,
      "index_name": "Index #37: MangaDex - M14.jpg"
    },
    "data": {
      "ext_urls": [
        "https://mangadex.org/chapter/259774/",
        "https://www.mangaupdates.com/series.html?id=2800",
        "https://myanimelist.net/manga/1345/"
      ],
      "md_id": 259774,
      "mu_id": 2800,
      "mal_id": 1345,
      "source": "Suzumiya Haruhi no Yuuutsu",
      "part": " - Chapter 12",
      "artist": "Tsugano Gaku",
      "author": "Tanigawa Nagaru"
    }
  }
];

Page({
  data: {
    selectedPath: '',
    results: [],
    highSimilarityResults: mock,
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
      // mask: true,
    });
    const { selectedPath } = this.data;
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
