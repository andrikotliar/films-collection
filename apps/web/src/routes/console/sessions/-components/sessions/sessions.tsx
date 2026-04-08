import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import styles from './sessions.module.css';
import {
  Button,
  ConfirmModal,
  getLastActivity,
  getUserSessionsQueryOptions,
  Panel,
  api,
  type ApiResponse,
} from '~/shared';
import { useState } from 'react';

export const Sessions = () => {
  const { data } = useSuspenseQuery(getUserSessionsQueryOptions());

  const [selectedSession, setSelectedSession] = useState<
    ApiResponse<typeof api.users.getSessions.exec>[number] | null
  >(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: number) => {
      await api.users.terminateSession.exec({ params: { id } });
    },
    meta: {
      invalidateQueries: {
        queryKey: api.users.getSessions.staticKey,
      },
    },
  });

  return (
    <>
      <Panel isFlexContainer>
        {data.map((session) => (
          <div className={styles.session} key={session.id}>
            <div>
              <div className={styles.title}>
                OS: {session.deviceInfo?.os ?? 'Unknown'} – Browser:{' '}
                {session.deviceInfo?.browser ?? 'Unknown'}
              </div>
              <div className={styles.time}>
                Last activity: {getLastActivity(session.lastActivityAt)}
              </div>
            </div>
            <Button size="small" onClick={() => setSelectedSession(session)}>
              Terminate session
            </Button>
          </div>
        ))}
      </Panel>
      <ConfirmModal
        title="Terminate session?"
        data={selectedSession}
        onClose={() => setSelectedSession(null)}
        onConfirm={async (session) => {
          await mutateAsync(session.id);
          setSelectedSession(null);
        }}
        isPending={isPending}
      />
    </>
  );
};
