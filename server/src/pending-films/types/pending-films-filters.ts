export type PendingFilmsFilter = Partial<{
  title: {
    $regex: string;
    $options: 'i';
  };
  priority: number;
}>;
