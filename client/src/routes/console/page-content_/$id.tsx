import { ALLOWED_HTML_TAGS, NEW_ITEM_ID, fetchPageContentByIdQuery, isNewItem } from '@/common';
import { pageContentFormValidation } from './-validation';
import {
  BackLink,
  ConsoleContent,
  ConsoleTitle,
  Form,
  FormTextEditor,
  FormTextInput,
  Panel,
} from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
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
    <ConsoleContent>
      <BackLink path="/console/page-content">Back to list</BackLink>
      <ConsoleTitle>{title}</ConsoleTitle>
      <Panel>
        <Form
          onSubmit={handleSubmit}
          defaultValues={getDefaultFormValues(data)}
          schema={pageContentFormValidation}
          isLoading={isPending}
        >
          <FormTextInput name="title" label="Title" />
          <FormTextEditor name="content" label="Content" />
          <FormTextInput name="pageKey" label="Page Key" />
        </Form>
      </Panel>
    </ConsoleContent>
  );
}
