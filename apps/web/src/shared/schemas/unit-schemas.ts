import { NEW_ITEM_ID } from '@films-collection/shared';
import z from 'zod';

export const IdSchema = z.enum([NEW_ITEM_ID]).or(z.number());
