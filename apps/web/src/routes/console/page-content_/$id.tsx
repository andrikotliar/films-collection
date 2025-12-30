import type z from 'zod';
import sanitize from 'sanitize-html';
import { createFileRoute } from '@tanstack/react-router';
import {
  Form,
  Panel,
  useMutatePageContent,
  isNewItem,
  getPageContentByIdQueryOptions,
  useSuspensePageContent,
} from '~/shared';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { getDefaultFormValues } from '~/routes/console/page-content_/-helpers';
import { ALLOWED_HTML_TAGS, NEW_ITEM_ID } from '@films-collection/shared';
import { PageContentFormSchema } from '~/routes/console/page-content_/-schemas';

export const Route = createFileRoute('/console/page-content_/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    if (params.id !== NEW_ITEM_ID) {
      await queryClient.ensureQueryData(getPageContentByIdQueryOptions(params.id));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const title = isNewItem(id) ? 'Create page content' : 'Edit page content';

  const { data } = useSuspensePageContent(id);

  const { mutateAsync, isPending } = useMutatePageContent();

  const handleSubmit = async (values: z.infer<typeof PageContentFormSchema>) => {
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
          schema={PageContentFormSchema}
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
