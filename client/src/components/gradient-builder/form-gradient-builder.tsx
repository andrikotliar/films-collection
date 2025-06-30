import { GradientBuilder, GradientBuilderProps } from './gradient-builder';

type FormGradientBuilderProps = {
  name: string;
} & GradientBuilderProps;

export const FormGradientBuilder = ({
  name,
  ...props
}: FormGradientBuilderProps) => {
  return <GradientBuilder {...props} />;
};
