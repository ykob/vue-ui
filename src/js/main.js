import initCommon from './init/common.js'
import initIndex from './init/index.js'
import initPhotoGallery from './init/photo_gallery.js'

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
    default:
  }
}
init();
