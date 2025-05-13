import { PostsApi } from '@/api';
import { ALLOWED_HTML_TAGS, NEW_POST_ID } from '@/constants';
import { fetchPostByIdQuery } from '@/queries';
import { PostForm } from '@/routes/console/posts_/-components/PostForm/PostForm';
import { formDefaultValues } from '@/routes/console/posts_/-configs';
import { FormValues } from '@/routes/console/posts_/-types';
import { formValidation } from '@/routes/console/posts_/-validation';
import { BackLink, ConsoleContent, ConsoleTitle, Island } from '@/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import sanitize from 'sanitize-html';

export const Route = createFileRoute('/console/posts_/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    if (params.id !== NEW_POST_ID) {
      await queryClient.ensureQueryData(fetchPostByIdQuery(params.id));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const isEdit = id !== NEW_POST_ID;
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

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: PostsApi.createPost,
    onSuccess: () => {
      navigate({
        to: '/console/posts',
      });
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

    const payload = {
      ...values,
      content: sanitizedContent,
    };

    if (isEdit) {
      updatePost(payload);
      return;
    }

    createPost(payload);
  };

  return (
    <ConsoleContent>
      <BackLink path="/console/posts">Back to list</BackLink>
      <ConsoleTitle>{title}</ConsoleTitle>
      <Island>
        <FormProvider {...form}>
          <PostForm
            onSubmit={form.handleSubmit(handleSubmit)}
            isLoading={isCreating || isUpdating}
          />
        </FormProvider>
      </Island>
    </ConsoleContent>
  );
}
