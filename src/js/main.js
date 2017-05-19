import initCommon from './init/common.js'
import initIndex from './init/index.js'
import initPhotoGallery from './init/photoGallery.js'
import initVideoPlayer from './init/videoPlayer.js'

const { pathname } = window.location;

const init = () => {
  initCommon();
  switch (pathname.replace('index.html', '')) {
    case '/':
      initIndex();
      break;
    case '/photo_gallery.html':
      initPhotoGallery();
      break;
    case '/video_player.html':
      initVideoPlayer();
      break;
    default:
  }
}
init();
