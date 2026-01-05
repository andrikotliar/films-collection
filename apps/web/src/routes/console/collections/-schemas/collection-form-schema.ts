import { CreateCollectionInputSchema } from '@films-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const CollectionFormSchema = CreateCollectionInputSchema.extend({ id: FormIdParamSchema });
