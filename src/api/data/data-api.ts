import { api } from '@/services';
import { DataCollection } from '@/common/types/data-collection';

const fetchData = () => api<DataCollection>('/dataset/dataset.json');

export { fetchData };
