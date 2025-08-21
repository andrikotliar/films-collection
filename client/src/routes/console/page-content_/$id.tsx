import { PageContentApi } from '@/api';
import { ALLOWED_HTML_TAGS, NEW_ITEM_ID, fetchPageContentByIdQuery } from '@/common';
import { PageContentForm } from './-components';
import { FormValues } from './-types';
import { formValidation } from './-validation';
import { BackLink, ConsoleContent, ConsoleTitle, Panel } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import sanitize from 'sanitize-html';
import { useToaster } from '@/hooks';
import { getDefaultFormValues } from './-helpers';

export const Route = createFileRoute('/console/page-content_/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    if (params.id !== NEW_ITEM_ID) {
      await queryClient.ensureQueryData(fetchPageContentByIdQuery(params.id));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const toaster = useToaster();

  const isEdit = id !== NEW_ITEM_ID;
  const title = isEdit ? 'Edit page content' : 'Create page content';

  const { data } = useSuspenseQuery(fetchPageContentByIdQuery(id));

  const form = useForm({
    defaultValues: getDefaultFormValues(data),
    resolver: yupResolver(formValidation),
  });

  const { mutate: managePageContent, isPending } = useMutation({
    mutationFn: (data: FormValues) => {
      if (id !== NEW_ITEM_ID) {
        return PageContentApi.updatePageContent(Number(id), data);
      }

      return PageContentApi.createPageContent(data);
    },
    onSuccess: () => {
      navigate({
        to: '/console/page-content',
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    },
  });

  const handleSubmit = (values: FormValues) => {
    const sanitizedContent = sanitize(values.content, {
      allowedTags: ALLOWED_HTML_TAGS,
      allowedAttributes: {},
    });

    managePageContent({
      ...values,
      content: sanitizedContent,
    });
  };

  return (
    <ConsoleContent>
      <BackLink path="/console/page-content">Back to list</BackLink>
      <ConsoleTitle>{title}</ConsoleTitle>
      <Panel>
        <FormProvider {...form}>
          <PageContentForm onSubmit={form.handleSubmit(handleSubmit)} isLoading={isPending} />
        </FormProvider>
      </Panel>
    </ConsoleContent>
  );
}
