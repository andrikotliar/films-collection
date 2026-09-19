import { CreateCollectionInputSchema } from '@hobbies-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const CollectionFormSchema = CreateCollectionInputSchema.extend({ id: FormIdParamSchema });
