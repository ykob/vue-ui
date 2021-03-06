const buildPhotoGallery = require('../modules/buildPhotoGallery').default;

export default function() {
  const gallery = buildPhotoGallery('#vue-photo-gallery', [
    {
      src: 'https://c2.staticflickr.com/4/3828/12459462745_4ea815af62_b.jpg',
      href: 'https://www.flickr.com/photos/goodmorning_ek/12459462745/in/dateposted-public/',
      title: 'Osaka 01',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
    },
    {
      src: 'https://c2.staticflickr.com/4/3710/12459997844_c7eee9b9f2_b.jpg',
      href: 'https://www.flickr.com/photos/goodmorning_ek/12459997844/in/dateposted-public/',
      title: 'Osaka 02',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
    },
    {
      src: 'https://c1.staticflickr.com/3/2881/12460073274_bf48a7f7d6_b.jpg',
      href: 'https://www.flickr.com/photos/goodmorning_ek/12460073274/in/dateposted-public/',
      title: 'Osaka 03',
      text: 'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
    },
    {
      src: 'https://c2.staticflickr.com/4/3701/12459870643_a68c7bd431_b.jpg',
      href: 'https://www.flickr.com/photos/goodmorning_ek/12459870643/in/dateposted-public/',
      title: 'Osaka 04',
      text: 'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.'
    },
  ]);
};
