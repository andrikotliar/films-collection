import { DescriptionType, TypeVariants } from '@/common';
import { DataLinkType } from '@/pages/Film/components/DataLinks/components';

const seriesContent = (
  type: TypeVariants[],
  description: DescriptionType[],
  years: number[],
) => {
  if (!type.includes('Series')) {
    return {
      selectOptions: [],
      links: [],
    };
  }

  const episodesOverall = description.reduce((acc, cur) => {
    return acc + (cur?.episodesCount || 0);
  }, 0);

  const links: DataLinkType[] = [
    {
      value: description.length,
      property: 'seasons',
      suffix: 'seasons',
      color: 'extra',
    },
    {
      value: episodesOverall,
      property: 'episodes',
      suffix: 'eps',
      color: 'extra',
    },
  ];

  if (description.length === 1) {
    return {
      selectOptions: [],
      links,
    };
  }

  const selectOptions = description.map((item, index) => ({
    label: `${item.title} (${years[index]})` || '',
    value: index,
  }));

  return {
    selectOptions,
    links,
  };
};

export { seriesContent };
