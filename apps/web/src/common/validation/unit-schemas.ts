import type { MixedId } from '@/common/types';
import * as yup from 'yup';

export const idSchema = yup.mixed<MixedId>().defined().required().label('ID');

export const titleSchema = yup.string().required().label('Title');
