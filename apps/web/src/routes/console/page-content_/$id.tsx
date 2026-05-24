import type z from 'zod';
import sanitize from 'sanitize-html';
import { createFileRoute } from '@tanstack/react-router';
import {
  Form,
  Panel,
  isNewItem,
  getPageContentByIdQueryOptions,
  type ApiResponse,
  api,
  getEmptyFormValues,
  type Input,
  getMixedId,
  mutateEntity,
  queryKey,
} from '~/shared';

import { ALLOWED_HTML_TAGS } from '@films-collection/shared';
import { PageContentFormSchema } from '~/routes/console/page-content_/-schemas';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

const getDefaultFormValues = (data: ApiResponse<typeof api.pageContent.getById> | null) => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      pageKey: data.pageKey,
    };
  }

  return getEmptyFormValues<Input<typeof api.pageContent.create>>({
    title: '',
    pageKey: '',
    content: '',
  });
};

export const Route = createFileRoute('/console/page-content_/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    if (!isNewItem(params.id)) {
      return await queryClient.ensureQueryData(getPageContentByIdQueryOptions(+params.id));
    }
  },
  component: RouteComponent,
  staticData: {
    title: 'Page Content',
    backPath: '/console/page-content',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? 'New content'} - Films Collection`,
      },
    ],
  }),
});

function RouteComponent() {
  const params = Route.useParams();
  const navigate = Route.useNavigate();

  const mixedId = getMixedId(params.id);

  const { data } = useSuspenseQuery(getPageContentByIdQueryOptions(mixedId));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.pageContent.create, api.pageContent.update),
    onSuccess: () => {
      navigate({
        to: '/console/page-content',
      });
    },
    meta: {
      invalidateQueries:
        !isNewItem(mixedId) && data?.pageKey
          ? {
              queryKey: [queryKey('pageContent.getByPageKey'), data.pageKey],
            }
          : undefined,
    },
  });

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
    <Form
      onSubmit={handleSubmit}
      defaultValues={getDefaultFormValues(data)}
      schema={PageContentFormSchema}
      isLoading={isPending}
      islandActions
    >
      <Panel isFlexContainer>
        <Form.TextInput name="title" label="Title" />
        <Form.TextEditor name="content" label="Content" />
        <Form.TextInput name="pageKey" label="Page Key" />
      </Panel>
    </Form>
  );
}
