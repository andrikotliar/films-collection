export const getLogoDecorationConfig = (year: number) => {
  return [
    {
      title: "Author's Birthday",
      image: 'decoration/birthday.png',
      date: {
        from: `${year}-10-09`,
        to: `${year}-10-10`,
      },
    },
    {
      title: 'World Cinema Day',
      image: 'decoration/cinema.png',
      date: {
        from: `${year}-12-28`,
        to: `${year}-12-28`,
      },
    },
    {
      title: 'International Harry Potter Day',
      image: 'decoration/hogwarts.png',
      date: {
        from: `${year}-05-02`,
        to: `${year}-05-02`,
      },
    },
    {
      title: 'Star Wars Day',
      image: 'decoration/darth_vader.png',
      date: {
        from: `${year}-05-04`,
        to: `${year}-05-04`,
      },
    },
    {
      title: 'Christmas Time',
      image: 'decoration/christmas_tree.png',
      date: {
        from: `${year}-12-06`,
        to: `${year + 1}-01-02`,
      },
    },
  ];
};
