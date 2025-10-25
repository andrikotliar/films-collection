import { type CSSProperties } from 'react';
import { mainLogoSvg } from '~/assets';
import { Image } from '~/common/components/image/image';

type Props = {
  width?: CSSProperties['width'];
};

export const Logo = ({ width = 30 }: Props) => {
  return (
    <div style={{ width }}>
      <Image src={mainLogoSvg} shouldFitContainer />
    </div>
  );
};
