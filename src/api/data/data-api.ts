import { api } from '@/services';
import { DataCollection } from '@/common/types/data-collection';

const fetchData = () =>
  api<DataCollection>({
    url: '/dataset/dataset.json',
  });

export { fetchData };
