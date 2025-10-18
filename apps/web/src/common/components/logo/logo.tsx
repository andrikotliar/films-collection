import { CSSProperties } from 'react';
import logoImageSrc from '~/assets/images/logos/logo.svg';
import { Image } from '~/common/components/image/image';

type LogoProps = {
  width?: CSSProperties['width'];
};

export const Logo = ({ width = 30 }: LogoProps) => {
  return (
    <div style={{ width }}>
      <Image src={logoImageSrc} shouldFitContainer />
    </div>
  );
};
