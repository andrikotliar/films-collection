export const buildFilmNavigation = (filmData) => ([
  {
    title: 'Creators',
    id: '#creators',
    visible: true
  },
  {
    title: 'Trailer',
    id: '#trailer',
    visible: !filmData.type.includes('Series')
  },
  {
    title: 'Season Trailers',
    id: '#trailers',
    visible: filmData.type.includes('Series')
  },
  {
    title: 'Episodes Lists',
    id: "#episodes",
    visible: filmData.type.includes('Series')
  },
  {
    title: 'Awards',
    id: "#awards",
    visible: filmData.awards !== undefined
  },
  {
    title: 'Cast and Characters',
    id: "#cast",
    visible: true
  },
  {
    title: 'Tech and General Details',
    id: "#tech-details",
    visible: true
  },
  {
    title: 'Parts',
    id: "#parts",
    visible: filmData.parts !== undefined
  }
]);