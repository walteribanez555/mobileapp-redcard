import { Event } from '../interfaces/event.interface';

export const events: Event[] = [
  {
    id: '1',
    name: 'American Red',
    date: '2024-07-19',
    location: 'America',
    performers: ['John Mulaney', 'Ali Wong', 'Hassan Minhaj'],
    category_id: '3',
    image: 'assets/img/gala.jpg',
    description: 'A night filled with laughter featuring top comedians John Mulaney, Ali Wong, and Hassan Minhaj at The Comedy Club in New York City. Perfect for those looking to enjoy some top-notch stand-up comedy.'
  },
  {
    id: '4',
    name: 'Eurored',
    date: '2024-12-27',
    location: 'Europa',
    headliners: ['Martin Garrix', 'DJ Snake', 'The Chainsmokers'],
    category_id: '1',
    image: 'assets/img/sunburn.jpg',
    description: 'India’s premier electronic music festival, Sunburn Festival in Goa, brings top international DJs like Martin Garrix, DJ Snake, and The Chainsmokers for an electrifying three-day event. A must-attend for EDM fans.'
  },
  {
    id: '2',
    name: 'Ecored',
    date: '2024-11-05',
    location: 'Mundial',
    headliners: ['A.R. Rahman'],
    category_id: '1',
    image: 'assets/img/rahman.jpg',
    description: 'Experience the magical music of A.R. Rahman live in Chennai. A.R. Rahman, the Oscar-winning composer, will perform his greatest hits in an unforgettable concert.'
  },
  {
    id: '3',
    name: 'Red Mundial Vip',
    date: '2024-10-10',
    location: 'Mundial',
    headliners: ['Shahrukh Khan'],
    category_id: '2',
    image: 'assets/img/srk.jpg',
    description: 'Join the King of Bollywood, Shahrukh Khan, in Mumbai for a spectacular live show. Expect a night of glamour, entertainment, and memorable performances from one of India’s biggest stars.'
  },
  {
    id: '5',
    name: 'Senior',
    date: '2024-09-15',
    location: 'Mundial, ( No Canada y  USA)',
    headliners: ['Arijit Singh'],
    category_id: '1',
    image: 'assets/img/arijit.jpg',
    description: 'Catch the soulful voice of Arijit Singh live in concert in Kolkata. The renowned playback singer will perform his most beloved songs, promising an evening of beautiful melodies and heartfelt lyrics.'
  },

  {
    id: '5',
    name: 'Senior Canada - USA',
    date: '2024-09-15',
    location: 'Canada, USA',
    headliners: ['Arijit Singh'],
    category_id: '1',
    image: 'assets/img/arijit.jpg',
    description: 'Catch the soulful voice of Arijit Singh live in concert in Kolkata. The renowned playback singer will perform his most beloved songs, promising an evening of beautiful melodies and heartfelt lyrics.'
  },
];
