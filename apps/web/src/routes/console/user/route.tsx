import {
  UpdateUserPasswordInputSchema,
  UpdateUserTranslationPreferencesSchema,
} from '@hobbies-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import z from 'zod';
import {
  Form,
  getUserDataQueryOptions,
  Panel,
  queryKey,
  SectionTitle,
  toaster,
  api,
  type Input,
} from '~/shared';

const UserFormSchema = z
  .object({
    actualPassword: z.string(),
    newPassword: z.string(),
    from: z.string(),
    to: z.string(),
    fromValidation: z.string(),
    toValidation: z.string(),
  })
  .partial()
  .superRefine((data, ctx) => {
    if (data.actualPassword || data.newPassword) {
      const result = UpdateUserPasswordInputSchema.safeParse(data);

      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue(issue as any);
        }
      }
    }

    if (data.from || data.to) {
      const result = UpdateUserTranslationPreferencesSchema.safeParse(data);

      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue(issue as any);
        }
      }
    }
  });

type UserFormValues = z.infer<typeof UserFormSchema>;

const defaultValues: UserFormValues = {
  from: 'English',
  to: 'English',
};

export const Route = createFileRoute('/console/user')({
  component: RouteComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getUserDataQueryOptions());
  },
  staticData: {
    title: 'User Preferences',
    backPath: '/console',
  },
  head: () => ({
    meta: [
      {
        title: 'User Preferences - Films Collection',
      },
    ],
  }),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(getUserDataQueryOptions());

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: UserFormValues) => {
      const input: Input<typeof api.users.update> = {};

      const { actualPassword, newPassword, from, to, ...translationPref } = values;

      if (actualPassword && newPassword) {
        input.password = {
          actualPassword,
          newPassword,
        };
      }

      if (from && to) {
        input.translation = {
          ...translationPref,
          from,
          to,
        };
      }

      return api.users.update({
        input,
      });
    },
    onSuccess: () => {
      toaster.success('Password successfully updated');
    },
    meta: {
      invalidateQueries: {
        queryKey: queryKey('users.getUser'),
      },
    },
  });

  const loadedDefaultValues = useMemo(() => {
    const values: UserFormValues = {
      ...defaultValues,
      ...data.translationPreferences,
    };

    return values;
  }, [data]);

  return (
    <Panel>
      <Form
        schema={UserFormSchema}
        defaultValues={loadedDefaultValues}
        onSubmit={mutateAsync}
        isLoading={isPending}
      >
        <SectionTitle>Translation</SectionTitle>
        <Form.TextInput name="from" label="From language" />
        <Form.TextInput name="fromValidation" label="Validation pattern" />
        <Form.TextInput name="to" label="To language" />
        <Form.TextInput name="toValidation" label="Validation pattern" />
        <SectionTitle>Password</SectionTitle>
        <Form.PasswordInput label="Actual password" name="actualPassword" />
        <Form.PasswordInput label="New password" name="newPassword" />
      </Form>
    </Panel>
  );
}
