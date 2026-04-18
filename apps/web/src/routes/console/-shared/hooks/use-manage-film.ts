import { useMutation } from '@tanstack/react-query';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/-shared/schemas';
import {
  api,
  convertImageToWebp,
  getObjectsDiff,
  isNewItem,
  titleToFileName,
  type ApiResponse,
  type InvalidateQueryOption,
} from '~/shared';

type ManageFilmParams = {
  tempDraftId?: number;
  values: z.infer<typeof FilmFormSchema>;
  onSuccess?: (data?: ApiResponse<typeof api.films.create.exec>) => void;
  invalidateQueries?: InvalidateQueryOption | InvalidateQueryOption[];
};

export const useManageFilm = ({
  values,
  tempDraftId,
  onSuccess,
  invalidateQueries,
}: ManageFilmParams) => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof FilmFormSchema>) => {
      let poster = data.poster;

      if (poster instanceof File) {
        const transformedPoster = await convertImageToWebp(poster);

        const key = `posters/${titleToFileName(data.title)}`;
        const uploadParams = await api.files.getUploadUrl.exec({
          input: {
            key,
            fileType: 'webp',
          },
        });

        await fetch(uploadParams.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'webp',
          },
          body: transformedPoster,
        });

        poster = key;
      }

      const input = {
        ...data,
        poster,
      };

      if (!isNewItem(values.id)) {
        const diff = getObjectsDiff(values, input);

        if (!diff) {
          return;
        }

        return await api.films.update.exec({
          params: { id: values.id },
          input: diff,
        });
      }

      return await api.films.create.exec({
        input: {
          ...input,
          tempDraftId,
        },
      });
    },
    onSuccess,
    meta: {
      invalidateQueries,
    },
  });
};
