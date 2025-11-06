import { idSchema, titleSchema } from '~/lib';
import { object, string } from 'yup';

const pageKeyRegex = /^[a-z-]*$/;

export const pageContentFormValidation = object().shape({
  id: idSchema,
  title: titleSchema,
  content: string().required().label('Content'),
  pageKey: string()
    .required()
    .label('Page Key')
    .test({
      name: 'page-key',
      message: 'Page key can contain only letters in lowercase and hyphens.',
      test: (value) => {
        if (!value) {
          return true;
        }

        return pageKeyRegex.test(value);
      },
    }),
});
