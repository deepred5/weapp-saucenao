const token = require('./apiKey.js').traceMoe;

const PIC_SEARCH_API = 'https://www.whitealbum.cc/search.php';
const VIDEO_SEARCH_API = `https://www.whitealbum.cc/traceMoe/search?token=${token}`;

module.exports = {
  picSearchAPI: PIC_SEARCH_API,
  videoSearchAPI: VIDEO_SEARCH_API,
}