import { useQueryClient } from '@tanstack/react-query';

type QueryKeys = string | (string | string[])[];

export const useQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = async (keys: QueryKeys): Promise<void> => {
    if (Array.isArray(keys)) {
      for await (const key of keys) {
        await queryClient.invalidateQueries({
          queryKey: [key],
        });
      }
    }

    await queryClient.invalidateQueries({
      queryKey: [keys],
    });
  };

  return invalidateQueries;
};
