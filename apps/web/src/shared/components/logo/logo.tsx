import { type CSSProperties } from 'react';
import { mainLogoSvg } from '~/assets';
import { Image } from '~/shared/components/image/image';

type LogoProps = {
  width?: CSSProperties['width'];
};

export const Logo = ({ width = 30 }: LogoProps) => {
  return (
    <div style={{ width }}>
      <Image src={mainLogoSvg} shouldFitContainer />
    </div>
  );
};
