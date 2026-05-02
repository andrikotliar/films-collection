import { FilmStatus } from '~/enums';
import { convertEnumValuesToOption, enumValues } from '~/helpers';

export const filmStatusOptions = convertEnumValuesToOption(enumValues(FilmStatus));
