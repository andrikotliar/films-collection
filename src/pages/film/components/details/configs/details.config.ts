type DetailsConfig = {
  title: string;
  property: 'countries' | 'production' | 'collections';
};

const detailsConfig: DetailsConfig[] = [
  {
    title: 'Country',
    property: 'countries',
  },
  {
    title: 'Production companies',
    property: 'production',
  },
  {
    title: 'Collections',
    property: 'collections',
  },
];

export { detailsConfig };
