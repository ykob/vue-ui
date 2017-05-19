import initCommon from './init/common.js'
import initIndex from './init/index.js'
import initPhotoGallery from './init/photoGallery.js'
import initVideoPlayer from './init/videoPlayer.js'

const pageId = document.getElementsByClassName('l-page')[0].getAttribute('data-page-id');

const init = () => {
  initCommon();
  switch (pageId) {
    case 'index':
      initIndex();
      break;
    case 'photoGallery':
      initPhotoGallery();
      break;
    case 'videoPlayer':
      initVideoPlayer();
      break;
    default:
  }
}
init();
