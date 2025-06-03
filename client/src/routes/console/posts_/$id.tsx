import { PostsApi } from '@/api';
import { ALLOWED_HTML_TAGS, NEW_ITEM_ID } from '@/constants';
import { fetchPostByIdQuery } from '@/queries';
import { PostForm } from './-components';
import { formDefaultValues } from '@/routes/console/posts_/-configs';
import { FormValues } from '@/routes/console/posts_/-types';
import { formValidation } from '@/routes/console/posts_/-validation';
import { BackLink, ConsoleContent, ConsoleTitle, Panel } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import sanitize from 'sanitize-html';
import { useToaster } from '@/hooks';

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
  const toaster = useToaster();

  const isEdit = id !== NEW_ITEM_ID;
  const title = isEdit ? 'Edit post' : 'Create post';

  const { data } = useSuspenseQuery(fetchPostByIdQuery(id));

  const defaultValues = useMemo(() => {
    if (data) {
      return {
        title: data.title,
        content: data.content,
        pageKey: data.pageKey,
      };
    }

    return formDefaultValues;
  }, [data]);

  const form = useForm<FormValues>({
    defaultValues: defaultValues,
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
      toaster.error(error.message);
    },
  });

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: (values: FormValues) => PostsApi.updatePost(Number(id), values),
    onSuccess: () => {
      navigate({
        to: '/console/posts',
      });
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
