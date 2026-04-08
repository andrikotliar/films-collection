import { UpdateUserPasswordInputSchema } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { api, Form, getAuthStateQueryOptions, Panel, toaster, type Input } from '~/shared';

const passwordsDefaultValues = {
  actualPassword: '',
  newPassword: '',
};

export const Route = createFileRoute('/console/password')({
  component: RouteComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAuthStateQueryOptions());
  },
});

function RouteComponent() {
  const { mutateAsync } = useMutation({
    mutationFn: (input: Input<typeof api.users.updatePassword.exec>) => {
      return api.users.updatePassword.exec({
        input,
      });
    },
    onSuccess: () => {
      toaster.success('Password successfully updated');
    },
  });

  return (
    <ConsoleContentLayout title="Change Password" backPath="/console">
      <Panel isFlexContainer>
        <Form
          onSubmit={async (data, reset) => {
            await mutateAsync(data);
            reset(passwordsDefaultValues);
          }}
          schema={UpdateUserPasswordInputSchema}
          defaultValues={passwordsDefaultValues}
        >
          <Form.PasswordInput name="actualPassword" label="Actual password" />
          <Form.PasswordInput name="newPassword" label="New password" />
        </Form>
      </Panel>
    </ConsoleContentLayout>
  );
}
