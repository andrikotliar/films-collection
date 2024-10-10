import { countryTitles } from './country-titles';
import { genreTitles } from './genre-titles';
import { studioTitles } from './studio-titles';
import { styleTypeTitles } from './style-type-titles';
import { titleTypeTitles } from './title-type-titles';

const combinedTitles = {
  ...genreTitles,
  ...countryTitles,
  ...studioTitles,
  ...styleTypeTitles,
  ...titleTypeTitles,
};

export { combinedTitles };
