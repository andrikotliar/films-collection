import { ExtendedFilmStatus, FilmStatus } from '~/enums';
import { convertEnumValuesToOption, enumValues } from '~/helpers';

export const filmStatusOptions = convertEnumValuesToOption(enumValues(FilmStatus));
export const extendedFilmStatusOptions = convertEnumValuesToOption(enumValues(ExtendedFilmStatus));
