import type { Enum, FilmStatus } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/-shared/schemas';
import { api, convertImageToWebp, getObjectsDiff, isNewItem, titleToFileName } from '~/shared';

type ManageFilmParams = {
  tempDraftId?: number;
  values: z.infer<typeof FilmFormSchema>;
  status?: Enum<typeof FilmStatus>;
  onSuccess?: (data: z.infer<typeof FilmFormSchema>) => void;
};

export const useManageFilm = ({ values, tempDraftId, status }: ManageFilmParams) => {
  const navigate = useNavigate();

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
        status,
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
    onSuccess: () => {
      navigate({ to: '/console/films' });
    },
    meta: {
      invalidateQueries: [
        {
          queryKey: [api.films.getAdminList.staticKey],
        },
        ...(!isNewItem(values.id)
          ? [
              {
                queryKey: [api.films.getById.staticKey, values.id],
              },
            ]
          : []),
      ],
    },
  });
};
