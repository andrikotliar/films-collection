import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import sanitize from 'sanitize-html';
import {
  Form,
  Panel,
  useMutatePageContent,
  type PageContentMutationPayload,
  ALLOWED_HTML_TAGS,
  NEW_ITEM_ID,
  fetchPageContentByIdQuery,
  isNewItem,
} from '~/common';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { getDefaultFormValues } from '~/routes/console/page-content_/-helpers';
import { pageContentFormValidation } from '~/routes/console/page-content_/-validation';

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
  const title = isNewItem(id) ? 'Create page content' : 'Edit page content';

  const { data } = useSuspenseQuery(fetchPageContentByIdQuery(id));

  const { mutateAsync, isPending } = useMutatePageContent();

  const handleSubmit = async (values: PageContentMutationPayload) => {
    const sanitizedContent = sanitize(values.content, {
      allowedTags: ALLOWED_HTML_TAGS,
      allowedAttributes: {},
    });

    await mutateAsync({
      ...values,
      content: sanitizedContent,
    });
  };

  return (
    <ConsoleContentLayout title={title} backPath="/console/page-content">
      <Panel>
        <Form
          onSubmit={handleSubmit}
          defaultValues={getDefaultFormValues(data)}
          schema={pageContentFormValidation}
          isLoading={isPending}
        >
          <Form.TextInput name="title" label="Title" />
          <Form.TextEditor name="content" label="Content" />
          <Form.TextInput name="pageKey" label="Page Key" />
        </Form>
      </Panel>
    </ConsoleContentLayout>
  );
}
