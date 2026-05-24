import {
  UpdateUserPasswordInputSchema,
  UpdateUserTranslationPreferencesSchema,
} from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

import {
  api,
  Form,
  getUserDataQueryOptions,
  Panel,
  SectionTitle,
  toaster,
  type Input,
} from '~/shared';

const passwordsDefaultValues = {
  actualPassword: '',
  newPassword: '',
};

const translationPreferencesDefaultValues = {
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

  const { mutateAsync: updatePassword } = useMutation({
    mutationFn: (input: Input<typeof api.users.updatePassword>) => {
      return api.users.updatePassword({
        input,
      });
    },
    onSuccess: () => {
      toaster.success('Password successfully updated');
    },
  });

  const { mutateAsync: updateTranslationPreferences } = useMutation({
    mutationFn: (input: Input<typeof api.users.updateTranslationPreferences>) => {
      return api.users.updateTranslationPreferences({
        input,
      });
    },
    onSuccess: () => {
      toaster.success('Preferences successfully updated');
    },
  });

  const translationPreferences = useMemo(() => {
    if (!data.translationPreferences) {
      return translationPreferencesDefaultValues;
    }
    return {
      ...translationPreferencesDefaultValues,
      ...data.translationPreferences,
    };
  }, [data]);

  return (
    <>
      <div>
        <SectionTitle>Synopsis translation preferences</SectionTitle>
      </div>
      <Panel>
        <Form
          schema={UpdateUserTranslationPreferencesSchema}
          defaultValues={translationPreferences}
          onSubmit={updateTranslationPreferences}
        >
          <Form.TextInput name="from" label="From language" />
          <Form.TextInput name="to" label="To language" />
        </Form>
      </Panel>
      <SectionTitle>Update password</SectionTitle>
      <Panel isFlexContainer>
        <Form
          onSubmit={updatePassword}
          schema={UpdateUserPasswordInputSchema}
          defaultValues={passwordsDefaultValues}
        >
          <Form.PasswordInput name="actualPassword" label="Actual password" />
          <Form.PasswordInput name="newPassword" label="New password" />
        </Form>
      </Panel>
    </>
  );
}
