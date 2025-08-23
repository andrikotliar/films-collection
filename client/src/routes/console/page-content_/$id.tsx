import { ALLOWED_HTML_TAGS, NEW_ITEM_ID, fetchPageContentByIdQuery, isNewItem } from '@/common';
import { PageContentForm } from './-components';
import { pageContentFormValidation } from './-validation';
import { BackLink, ConsoleContent, ConsoleTitle, Panel } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import sanitize from 'sanitize-html';
import { useMutatePageContent, type PageContentMutationPayload } from '@/hooks';
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
  const title = isNewItem(Number(id)) ? 'Edit page content' : 'Create page content';

  const { data } = useSuspenseQuery(fetchPageContentByIdQuery(id));

  const form = useForm({
    defaultValues: getDefaultFormValues(data),
    resolver: yupResolver(pageContentFormValidation),
  });

  const { mutate: managePageContent, isPending } = useMutatePageContent();

  const handleSubmit = (values: PageContentMutationPayload) => {
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
