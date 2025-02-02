export type LogoDecorationDate = [number, number];

export type LogoDecorationItem = {
  title: string;
  image: string;
  date: {
    from: LogoDecorationDate;
    to: LogoDecorationDate;
  };
  collectionId: string;
};

export const logoDecorationConfig: LogoDecorationItem[] = [
  {
    title: "Author's Birthday",
    image: 'decoration/birthday.png',
    date: {
      from: [10, 9],
      to: [10, 10],
    },
    collectionId: 'f4472bb26f56fcaab829b96a',
  },
  {
    title: 'First Avatar Movie Released',
    image: 'decoration/avatar.png',
    date: {
      from: [12, 18],
      to: [12, 18],
    },
    collectionId: '64b7f5c0e4b0b222334f1d12',
  },
  {
    title: 'World Cinema Day',
    image: 'decoration/cinema.png',
    date: {
      from: [12, 28],
      to: [12, 28],
    },
    collectionId: 'c7261f26600af8cbfa133b12',
  },
  {
    title: 'International Harry Potter Day',
    image: 'decoration/hogwarts.png',
    date: {
      from: [5, 2],
      to: [5, 2],
    },
    collectionId: 'ded2b175d20cde95f88bcac4',
  },
  {
    title: 'Star Wars Day',
    image: 'decoration/darth_vader.png',
    date: {
      from: [5, 4],
      to: [5, 4],
    },
    collectionId: '670cc41243391aa2676f5cc5',
  },
  {
    title: 'Christmas Time',
    image: 'decoration/christmas_tree.png',
    date: {
      from: [12, 6],
      to: [1, 15],
    },
    collectionId: 'e939ace73ff40d198c4800a9',
  },
];
