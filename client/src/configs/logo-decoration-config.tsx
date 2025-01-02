export type LogoDecorationDate = [number, number];

export type LogoDecorationItem = {
  title: string;
  image: string;
  date: {
    from: LogoDecorationDate;
    to: LogoDecorationDate;
  };
};

export const logoDecorationConfig: LogoDecorationItem[] = [
  {
    title: "Author's Birthday",
    image: 'decoration/birthday.png',
    date: {
      from: [10, 9],
      to: [10, 10],
    },
  },
  {
    title: 'World Cinema Day',
    image: 'decoration/cinema.png',
    date: {
      from: [12, 28],
      to: [12, 28],
    },
  },
  {
    title: 'International Harry Potter Day',
    image: 'decoration/hogwarts.png',
    date: {
      from: [5, 2],
      to: [5, 2],
    },
  },
  {
    title: 'Star Wars Day',
    image: 'decoration/darth_vader.png',
    date: {
      from: [5, 4],
      to: [5, 4],
    },
  },
  {
    title: 'Christmas Time',
    image: 'decoration/christmas_tree.png',
    date: {
      from: [12, 6],
      to: [1, 15],
    },
  },
];
