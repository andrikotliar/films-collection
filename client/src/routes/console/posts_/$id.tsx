import { PostsApi } from '@/api';
import { ALLOWED_HTML_TAGS, NEW_ITEM_ID, fetchPostByIdQuery } from '@/common';
import { PostForm } from './-components';
import { FormValues } from '@/routes/console/posts_/-types';
import { formValidation } from '@/routes/console/posts_/-validation';
import { BackLink, ConsoleContent, ConsoleTitle, Panel } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import sanitize from 'sanitize-html';
import { useToaster } from '@/hooks';
import { getDefaultFormValues } from '@/routes/console/posts_/-helpers';

export const Route = createFileRoute('/console/posts_/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    if (params.id !== NEW_ITEM_ID) {
      await queryClient.ensureQueryData(fetchPostByIdQuery(params.id));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { showErrorMessage } = useToaster();

  const isEdit = id !== NEW_ITEM_ID;
  const title = isEdit ? 'Edit post' : 'Create post';

  const { data } = useSuspenseQuery(fetchPostByIdQuery(id));

  const form = useForm({
    defaultValues: getDefaultFormValues(data),
    resolver: yupResolver(formValidation),
  });

  const { mutate: managePost, isPending } = useMutation({
    mutationFn: (data: FormValues) => {
      if (id !== NEW_ITEM_ID) {
        return PostsApi.updatePost(+id, data);
      }

      return PostsApi.createPost(data);
    },
    onSuccess: () => {
      navigate({
        to: '/console/posts',
      });
    },
    onError: (error) => {
      showErrorMessage(error.message);
    },
  });

  const handleSubmit = (values: FormValues) => {
    const sanitizedContent = sanitize(values.content, {
      allowedTags: ALLOWED_HTML_TAGS,
      allowedAttributes: {},
    });

    managePost({
      ...values,
      content: sanitizedContent,
    });
  };

  return (
    <ConsoleContent>
      <BackLink path="/console/posts">Back to list</BackLink>
      <ConsoleTitle>{title}</ConsoleTitle>
      <Panel>
        <FormProvider {...form}>
          <PostForm
            onSubmit={form.handleSubmit(handleSubmit)}
            isLoading={isPending}
          />
        </FormProvider>
      </Panel>
    </ConsoleContent>
  );
}
