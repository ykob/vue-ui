const pageId = document.getElementsByClassName('l-page')[0].getAttribute('data-page-id');

const init = () => {
  require('./init/common.js').default();
  switch (pageId) {
    case 'index': require('./init/index').default(); break;
    case 'photoGallery': require('./init/photoGallery').default(); break;
    case 'videoPlayer': require('./init/videoPlayer').default(); break;
    case 'globalNaviSp': require('./init/globalNaviSp').default(); break;
    default:
  }
}
init();
