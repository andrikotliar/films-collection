import { object, string } from 'yup';

const pageKeyRegex = /^[a-z-]*$/;

export const formValidation = object().shape({
  title: string().required().label('Title'),
  content: string().required().label('Content'),
  pageKey: string()
    .nullable()
    .defined()
    .label('Page Key')
    .test({
      name: 'page-key',
      message:
        'Page key should start with slash and contain only letters in lowercase, hyphens and slashes.',
      test: (value) => {
        if (!value) {
          return true;
        }

        return pageKeyRegex.test(value);
      },
    }),
});
