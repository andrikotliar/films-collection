import { Type } from '@sinclair/typebox';

export const BackgroundSchema = Type.Object({
  angle: Type.String(),
  color1: Type.String(),
  color2: Type.String(),
  textColor: Type.Enum({
    white: 'white',
    black: 'black',
  }),
});
