import { NEW_FILM_ID } from '@/constants';
import { fetchInitialDataQuery } from '@/queries';
import { BackLink, ConsoleContent, ConsoleTitle, Island } from '@/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FilmForm } from './-components';
import { filmDefaultFormValues } from './-configs';
import { FormValues } from '@/routes/console/manage_/-types';
// import { FilesApi } from '@/api';
// import { FileUploadDestination } from '@/enums';

const consoleFilmQueriesSchema = object({
  pendingFilmId: string(),
});

export const Route = createFileRoute('/console/manage_/$id')({
  validateSearch: (search) => {
    return consoleFilmQueriesSchema.validateSync(search);
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchInitialDataQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();

  const { data: initialOptions } = useSuspenseQuery(fetchInitialDataQuery());

  const isEdit = id !== NEW_FILM_ID;
  const pageTitle = isEdit ? 'Edit Film' : 'Add New Film';

  const defaultValues = useMemo(() => {
    return {
      ...filmDefaultFormValues,
      isDraft: false,
    };
  }, []);

  const form = useForm({
    defaultValues,
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      let poster = data.poster;

      // if (poster instanceof File) {
      //   const formData = new FormData();

      //   formData.append('title', 'Test Film Title 2: Test Part');
      //   formData.append('destination', FileUploadDestination.POSTERS);
      //   formData.append('file', poster);

      //   await FilesApi.upload(formData);
      // }
    } catch (error: any) {
      console.error('[Film Form Error]:', error?.message);
    }
  };

  return (
    <ConsoleContent>
      <BackLink path="/console/manage">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <Island>
        <FormProvider {...form}>
          <FilmForm
            onSubmit={form.handleSubmit(handleSubmit)}
            initialOptions={initialOptions}
          />
        </FormProvider>
      </Island>
    </ConsoleContent>
  );
}
