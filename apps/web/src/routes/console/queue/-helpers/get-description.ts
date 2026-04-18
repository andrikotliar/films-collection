import sanitize from 'sanitize-html';
import { getPluralWord, type api, type ApiResponse } from '~/shared';

export const getDescription = (
  data: ApiResponse<typeof api.films.getAdminIncompleteFilmsList.exec>['list'][number],
) => {
  const description: string[] = [];

  if (data.seriesExtension) {
    if (data.seriesExtension.seasonsTotal) {
      description.push(
        `${data.seriesExtension.seasonsTotal} ${getPluralWord(
          'season',
          data.seriesExtension.seasonsTotal,
        )}`,
      );
    }

    if (data.seriesExtension.episodesTotal) {
      description.push(
        `${data.seriesExtension.episodesTotal} ${getPluralWord(
          'episode',
          data.seriesExtension.episodesTotal,
        )}`,
      );
    }
  }

  if (data.overview?.length) {
    const sanitizedText = sanitize(data.overview, { allowedTags: [] });
    description.push(sanitizedText);
  }

  if (!description.length) {
    return null;
  }

  return description.join('.');
};
